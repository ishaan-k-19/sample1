'use client'

import { Suspense, useRef, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

// Suppress THREE.Clock deprecation warning from @react-three/fiber internals
// R3F hasn't migrated to THREE.Timer yet — harmless, can't fix from our side
const _origWarn = console.warn
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return
  _origWarn.apply(console, args)
}

gsap.registerPlugin(ScrollTrigger)

const CAN_MODEL_PATH = '/realistic_3d_beverage_can.glb'
const LABEL_IMAGE = '/Screenshot 2026-03-31 at 2.34.37\u202fAM.png'

const CAN_SCALE_Y  = 0.92
const CAN_SCALE_XZ = 0.95

const LABEL_W = 1371
const LABEL_H = 781

function createKliqTopMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xd0d0d0),
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 0.6,
    clearcoatRoughness: 0.08,
    envMapIntensity: 0.5,
  })
}

function createKliqRimMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xb8b8b8),
    metalness: 0.85,
    roughness: 0.18,
    envMapIntensity: 0.4,
  })
}

function applyCylindricalUVs(mesh: THREE.Mesh) {
  const geometry = mesh.geometry
  if (!geometry) return

  geometry.computeBoundingBox()
  const bbox = geometry.boundingBox!
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  bbox.getSize(size)
  bbox.getCenter(center)

  const dims = [
    { axis: 'x', size: size.x },
    { axis: 'y', size: size.y },
    { axis: 'z', size: size.z },
  ].sort((a, b) => b.size - a.size)

  const vertAxis = dims[0].axis
  const bodyHeight = dims[0].size
  const radius = Math.max(dims[1].size, dims[2].size) / 2
  const circumference = 2 * Math.PI * radius

  const textureAspect = LABEL_W / LABEL_H
  const surfaceAspect = circumference / (bodyHeight * CAN_SCALE_Y)
  const textureScale = surfaceAspect / textureAspect
  const silverRim = 0.025
  const vScale = textureScale * (1 - 2 * silverRim)
  const vOffset = (1 - vScale) / 2

  const positions = geometry.attributes.position

  function getUV(i: number): [number, number] {
    const x = positions.getX(i) - center.x
    const y = positions.getY(i) - center.y
    const z = positions.getZ(i) - center.z

    let angle: number
    let height: number

    if (vertAxis === 'y') {
      angle = Math.atan2(x, z)
      height = (positions.getY(i) - bbox.min.y) / size.y
    } else if (vertAxis === 'z') {
      angle = Math.atan2(x, y)
      height = (positions.getZ(i) - bbox.min.z) / size.z
    } else {
      angle = Math.atan2(y, z)
      height = (positions.getX(i) - bbox.min.x) / size.x
    }

    const u = 1.0 - ((angle / (Math.PI * 2)) + 0.5)
    const v = (height - vOffset) / vScale
    return [u, v]
  }

  const index = geometry.index
  const triCount = index ? index.count / 3 : positions.count / 3

  const hasNormals = !!geometry.attributes.normal
  const newPositions: number[] = []
  const newNormals: number[] = []
  const newUVs: number[] = []

  for (let t = 0; t < triCount; t++) {
    const i0 = index ? index.getX(t * 3 + 0) : t * 3 + 0
    const i1 = index ? index.getX(t * 3 + 1) : t * 3 + 1
    const i2 = index ? index.getX(t * 3 + 2) : t * 3 + 2

    const [u0, v0] = getUV(i0)
    const [u1, v1] = getUV(i1)
    const [u2, v2] = getUV(i2)

    const uMin = Math.min(u0, u1, u2)
    const uMax = Math.max(u0, u1, u2)
    const seamCross = (uMax - uMin) > 0.5

    let fu0 = u0, fu1 = u1, fu2 = u2
    if (seamCross) {
      const mid = (uMin + uMax) / 2
      if (fu0 < mid) fu0 += 1.0
      if (fu1 < mid) fu1 += 1.0
      if (fu2 < mid) fu2 += 1.0
    }

    for (const [idx, fu, fv] of [[i0, fu0, v0], [i1, fu1, v1], [i2, fu2, v2]] as [number, number, number][]) {
      newPositions.push(positions.getX(idx), positions.getY(idx), positions.getZ(idx))
      if (hasNormals) {
        const normals = geometry.attributes.normal
        newNormals.push(normals.getX(idx), normals.getY(idx), normals.getZ(idx))
      }
      newUVs.push(fu, fv)
    }
  }

  const newGeo = new THREE.BufferGeometry()
  newGeo.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3))
  if (hasNormals) {
    newGeo.setAttribute('normal', new THREE.Float32BufferAttribute(newNormals, 3))
  } else {
    newGeo.computeVertexNormals()
  }
  newGeo.setAttribute('uv', new THREE.Float32BufferAttribute(newUVs, 2))
  newGeo.computeBoundingBox()
  newGeo.computeBoundingSphere()

  mesh.geometry = newGeo
}

function getAutoScale(scene: THREE.Object3D, targetHeight = 4): number {
  const box = new THREE.Box3().setFromObject(scene)
  const size = new THREE.Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z)
  if (maxDim === 0) return 1
  return targetHeight / maxDim
}

export const canSpinState = { spinY: 0 }
export const canAnimState = { levitate: 1, zoom: 1, offsetY: 0 }

const CanModel = () => {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(CAN_MODEL_PATH, 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
  const labelTexture = useLoader(THREE.TextureLoader, LABEL_IMAGE)

  const { clonedScene, autoScale } = useMemo(() => {
    const clone = scene.clone(true)

    const tex = labelTexture.clone()
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.colorSpace = THREE.SRGBColorSpace
    tex.flipY = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = true
    tex.anisotropy = 4
    tex.needsUpdate = true

    const bodyMat = new THREE.MeshPhysicalMaterial({
      map: tex,
      metalness: 0.08,
      roughness: 0.7,
      clearcoat: 0.1,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.15,
      toneMapped: false,
      side: THREE.DoubleSide,
    })

    const topMat = createKliqTopMaterial()
    const rimMat = createKliqRimMaterial()

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase()

        if (name.includes('lid') || name.includes('cap') || name.includes('top_') || name.includes('bottom_') || name.includes('alluminium') || name.includes('aluminum')) {
          child.material = topMat
        } else if (name.includes('tab') || name.includes('pull') || name.includes('ring')) {
          child.material = rimMat
        } else {
          applyCylindricalUVs(child)
          child.material = bodyMat
        }
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    const scale = getAutoScale(clone, 4)
    return { clonedScene: clone, autoScale: scale }
  }, [scene, labelTexture])

  const scaleGroupRef = useRef<THREE.Group>(null)

  const prevZoom = useRef(canAnimState.zoom)

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      const lev = canAnimState.levitate
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.06 * lev + canAnimState.offsetY
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08 * lev + canSpinState.spinY
    }
    // Only update scale when zoom actually changes
    const zoom = canAnimState.zoom
    if (scaleGroupRef.current && zoom !== prevZoom.current) {
      const s = autoScale * zoom
      scaleGroupRef.current.scale.set(s * CAN_SCALE_XZ, s * CAN_SCALE_Y, s * CAN_SCALE_XZ)
      prevZoom.current = zoom
    }
  })

  return (
    <Center>
      <group ref={groupRef}>
        <group ref={scaleGroupRef} scale={autoScale} rotation={[0, -(270 * Math.PI / 180), 0]}>
          <primitive object={clonedScene} />
        </group>
      </group>
    </Center>
  )
}

useGLTF.preload(CAN_MODEL_PATH, 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/')

const PersistentCan = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canTransformRef = useRef<HTMLDivElement>(null)
  const slideOffsetRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    const canTransform = canTransformRef.current
    const glow = glowRef.current
    if (!container || !canTransform) return

    const hero = document.getElementById('hero')
    const showcase = document.getElementById('scroll-showcase')
    if (!hero || !showcase) return

    const mobile = window.innerWidth < 768

    const heroH = hero.offsetHeight
    const numSlides = 3
    const showcasePinDuration = window.innerHeight * (numSlides - 1)
    const scrollAwayDist = window.innerHeight * 0.3
    const totalScroll = heroH + showcasePinDuration + scrollAwayDist

    gsap.fromTo(container,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3, overwrite: 'auto' }
    )

    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      snap: {
        snapTo(progress: number, self?: ScrollTrigger) {
          const dir = self?.direction ?? 1
          if (dir > 0) return progress > 0.5 ? 1 : 0
          return progress < 0.25 ? 0 : 1
        },
        duration: { min: 0.3, max: 0.6 },
        delay: 0.05,
        ease: 'power2.inOut',
      },
      onLeave: () => {
        gsap.to(canAnimState, { levitate: 0, zoom: 1.65, offsetY: mobile ? -0.5 : 0, duration: 0.5, ease: 'power2.out' })
      },
      onEnterBack: () => {
        gsap.to(canAnimState, { levitate: 1, zoom: 1, offsetY: 0, duration: 0.4, ease: 'power2.out' })
      },
    })

    if (showcase) {
      gsap.timeline({
        scrollTrigger: {
          trigger: showcase,
          start: 'top top',
          end: `+=${window.innerHeight}`,
          scrub: 1.4,
        },
      }).to(slideOffsetRef.current, { y: 0, duration: 0.5, ease: 'power2.inOut' })
    }

    const about = document.getElementById('about')
    if (about) {
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: about,
          start: 'top top',
          end: `+=${about.offsetHeight}`,
          scrub: true,
          snap: {
            snapTo: 1,
            duration: { min: 0.3, max: 0.6 },
            delay: 0.1,
            ease: 'power2.inOut',
          },
        },
      })
      aboutTl.to(about, { opacity: 1, duration: 1 })
    }

    const startX = mobile ? 0 : 200
    const holdX = mobile ? 0 : -500
    gsap.set(canTransform, { x: startX, y: 0, xPercent: -50, yPercent: -50 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: 0.8,
      },
    })

    const heroPct = heroH / totalScroll
    const TL = 10
    const heroEnd = heroPct * TL

    tl.to(canTransform, { x: holdX, y: 0, duration: heroEnd, ease: 'none' }, 0)

    const slide1Offset = -(260 * Math.PI / 180)
    gsap.set(canSpinState, { spinY: slide1Offset - (2 * Math.PI) })
    gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    }).to(canSpinState, { spinY: slide1Offset, ease: 'power1.out' })

    const showcasePct = showcasePinDuration / totalScroll
    const showcaseEnd = (heroPct + showcasePct) * TL
    const scrollAwayEnd = TL

    tl.to(canTransform, { x: holdX, y: 0, duration: showcaseEnd - heroEnd, ease: 'none' }, heroEnd)

    tl.to(canTransform, { x: -window.innerWidth, duration: scrollAwayEnd - showcaseEnd, ease: 'power3.in' }, showcaseEnd)
    tl.to(container, { opacity: 0, duration: scrollAwayEnd - showcaseEnd, ease: 'power3.in' }, showcaseEnd)

    if (glow) {
      gsap.set(glow, { opacity: 0.2 })
      tl.to(glow, { opacity: 0.35, duration: heroEnd, ease: 'power1.out' }, 0)
      tl.to(glow, { opacity: 0.5, duration: 0.3, ease: 'power2.out' }, heroEnd)
      tl.to(glow, { opacity: 0.35, duration: showcaseEnd - heroEnd - 0.3, ease: 'none' }, heroEnd + 0.3)
      tl.to(glow, { opacity: 0, duration: scrollAwayEnd - showcaseEnd, ease: 'power2.in' }, showcaseEnd)
    }
  })

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 bottom-0 pointer-events-none overflow-hidden z-40 md:z-[60] top-[90px] md:top-0"
      style={{ opacity: 0, visibility: 'visible' }}
      aria-hidden="true"
    >
      <div
        ref={canTransformRef}
        className="absolute top-[26%] md:top-1/2 left-1/2 md:left-[63%] will-change-transform"
      >
        <div ref={slideOffsetRef}>
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] md:w-[400px] md:h-[400px] rounded-full blur-[32px] md:blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(100,100,100,0.15) 50%, transparent 70%)',
              opacity: 0,
            }}
          />

          <div className="relative z-10 w-[85vw] h-[90vw] md:w-[450px] md:h-[650px]">
            <div className="w-full h-full">
              <Canvas
                camera={{ position: [1, 0, 7], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{
                  alpha: true,
                  antialias: false,
                  powerPreference: 'high-performance',
                  stencil: false,
                  depth: true,
                  toneMapping: THREE.NoToneMapping,
                }}
                frameloop="always"
                performance={{ min: 0.5 }}
                style={{ background: 'transparent' }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={1.6} />
                  <directionalLight position={[5, 4, 2]} intensity={0.8} color="#fff5e6" />
                  <directionalLight position={[-7, 1, -1]} intensity={1.0} color="#ffffff" />
                  <directionalLight position={[0, -3, 2]} intensity={0.3} color="#e0e8ff" />
                  <CanModel />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersistentCan
