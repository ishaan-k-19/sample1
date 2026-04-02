'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useTransition,
  type ReactNode,
} from 'react'
import {
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeFromCart,
  isShopifyConfigured,
  type ShopifyCart,
  type ShopifyCartLine,
  getCartLines,
} from '@/lib/shopify'
import { mockProducts } from '@/lib/mockProducts'

// ─── Mock cart helpers ────────────────────────────────────────────────────────

function buildMockCart(lines: ShopifyCartLine[]): ShopifyCart {
  const subtotal = lines.reduce(
    (sum, l) => sum + parseFloat(l.cost.totalAmount.amount),
    0,
  )
  return {
    id: 'mock-cart',
    checkoutUrl: '#',
    totalQuantity: lines.reduce((s, l) => s + l.quantity, 0),
    lines: { edges: lines.map((node) => ({ node })) },
    cost: {
      subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
      totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
      totalTaxAmount: null,
    },
  }
}

let mockLines: ShopifyCartLine[] = []

function findMockVariant(merchandiseId: string) {
  for (const product of mockProducts) {
    for (const edge of product.variants.edges) {
      if (edge.node.id === merchandiseId) {
        return { variant: edge.node, product }
      }
    }
  }
  return null
}

function mockAddToCart(merchandiseId: string, quantity: number): ShopifyCart {
  const existing = mockLines.find((l) => l.merchandise.id === merchandiseId)
  if (existing) {
    mockLines = mockLines.map((l) =>
      l.merchandise.id === merchandiseId
        ? {
            ...l,
            quantity: l.quantity + quantity,
            cost: {
              totalAmount: {
                amount: (parseFloat(l.merchandise.price.amount) * (l.quantity + quantity)).toFixed(2),
                currencyCode: 'USD',
              },
            },
          }
        : l,
    )
  } else {
    const found = findMockVariant(merchandiseId)
    if (found) {
      const { variant, product } = found
      const line: ShopifyCartLine = {
        id: `mock-line-${Date.now()}`,
        quantity,
        merchandise: {
          id: variant.id,
          title: variant.title,
          price: variant.price,
          product: {
            title: product.title,
            handle: product.handle,
            featuredImage: product.featuredImage,
          },
          selectedOptions: variant.selectedOptions,
          image: product.featuredImage,
        },
        cost: {
          totalAmount: {
            amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
            currencyCode: 'USD',
          },
        },
      }
      mockLines = [...mockLines, line]
    }
  }
  return buildMockCart(mockLines)
}

function mockRemoveFromCart(lineId: string): ShopifyCart {
  mockLines = mockLines.filter((l) => l.id !== lineId)
  return buildMockCart(mockLines)
}

function mockUpdateCartLine(lineId: string, quantity: number): ShopifyCart {
  mockLines = mockLines.map((l) =>
    l.id === lineId
      ? {
          ...l,
          quantity,
          cost: {
            totalAmount: {
              amount: (parseFloat(l.merchandise.price.amount) * quantity).toFixed(2),
              currencyCode: 'USD',
            },
          },
        }
      : l,
  )
  return buildMockCart(mockLines)
}

// ─── State ────────────────────────────────────────────────────────────────────

type CartState = {
  cart: ShopifyCart | null
  isOpen: boolean
  isLoading: boolean
  error: string | null
}

type CartAction =
  | { type: 'SET_CART'; cart: ShopifyCart }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.cart, error: null }
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading }
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

type CartContextValue = {
  cart: ShopifyCart | null
  cartLines: ShopifyCartLine[]
  isOpen: boolean
  isLoading: boolean
  error: string | null
  totalQuantity: number
  openCart: () => void
  closeCart: () => void
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

const CART_ID_KEY = 'kliq-cart-id'

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    isOpen: false,
    isLoading: false,
    error: null,
  })
  const [, startTransition] = useTransition()

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const initCart = async () => {
      // Mock mode — no Shopify, use in-memory cart
      if (!isShopifyConfigured()) {
        dispatch({ type: 'SET_CART', cart: buildMockCart([]) })
        return
      }
      dispatch({ type: 'SET_LOADING', loading: true })
      try {
        const savedCartId = localStorage.getItem(CART_ID_KEY)
        if (savedCartId) {
          const cart = await getCart(savedCartId)
          if (cart) {
            dispatch({ type: 'SET_CART', cart })
          } else {
            // Cart expired, create a new one
            localStorage.removeItem(CART_ID_KEY)
            const newCart = await createCart()
            localStorage.setItem(CART_ID_KEY, newCart.id)
            dispatch({ type: 'SET_CART', cart: newCart })
          }
        } else {
          const newCart = await createCart()
          localStorage.setItem(CART_ID_KEY, newCart.id)
          dispatch({ type: 'SET_CART', cart: newCart })
        }
      } catch (err) {
        dispatch({ type: 'SET_ERROR', error: 'Failed to initialize cart' })
        console.error(err)
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    }
    initCart()
  }, [])

  const ensureCart = useCallback(async (): Promise<string> => {
    if (state.cart) return state.cart.id
    const newCart = await createCart()
    localStorage.setItem(CART_ID_KEY, newCart.id)
    dispatch({ type: 'SET_CART', cart: newCart })
    return newCart.id
  }, [state.cart])

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      dispatch({ type: 'SET_LOADING', loading: true })
      try {
        let cart
        if (!isShopifyConfigured()) {
          cart = mockAddToCart(merchandiseId, quantity)
        } else {
          const cartId = await ensureCart()
          cart = await addToCart(cartId, [{ merchandiseId, quantity }])
        }
        dispatch({ type: 'SET_CART', cart })
        startTransition(() => {
          dispatch({ type: 'OPEN_CART' })
        })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', error: 'Failed to add item to cart' })
        console.error(err)
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    },
    [ensureCart]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!state.cart) return
      dispatch({ type: 'SET_LOADING', loading: true })
      try {
        let cart
        if (!isShopifyConfigured()) {
          cart = mockRemoveFromCart(lineId)
        } else {
          cart = await removeFromCart(state.cart.id, [lineId])
        }
        dispatch({ type: 'SET_CART', cart })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', error: 'Failed to remove item' })
        console.error(err)
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    },
    [state.cart]
  )

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!state.cart) return
      dispatch({ type: 'SET_LOADING', loading: true })
      try {
        let cart
        if (!isShopifyConfigured()) {
          cart = quantity <= 0
            ? mockRemoveFromCart(lineId)
            : mockUpdateCartLine(lineId, quantity)
        } else if (quantity <= 0) {
          cart = await removeFromCart(state.cart.id, [lineId])
        } else {
          cart = await updateCartLine(state.cart.id, lineId, quantity)
        }
        dispatch({ type: 'SET_CART', cart })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', error: 'Failed to update quantity' })
        console.error(err)
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    },
    [state.cart]
  )

  const cartLines = state.cart ? getCartLines(state.cart) : []

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        cartLines,
        isOpen: state.isOpen,
        isLoading: state.isLoading,
        error: state.error,
        totalQuantity: state.cart?.totalQuantity ?? 0,
        openCart: () => dispatch({ type: 'OPEN_CART' }),
        closeCart: () => dispatch({ type: 'CLOSE_CART' }),
        addItem,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
