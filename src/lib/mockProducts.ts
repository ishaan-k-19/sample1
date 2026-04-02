import type { ShopifyProduct } from './shopify'

// Mock product data matching brand guidelines (4 confirmed + 1 upcoming flavor)
// Used when Shopify is not connected so the client can test all UI functionality.

const makeVariant = (id: string, title: string, amount: string) => ({
  id: `gid://shopify/ProductVariant/${id}`,
  title,
  price: { amount, currencyCode: 'USD' },
  compareAtPrice: null,
  availableForSale: true,
  quantityAvailable: 50,
  selectedOptions: [{ name: 'Size', value: title }],
  image: null,
})

const makeProduct = (
  id: string,
  title: string,
  handle: string,
  flavor: string,
  description: string,
  image: string,
  tags: string[],
  price = '3.99',
): ShopifyProduct => ({
  id: `gid://shopify/Product/${id}`,
  title,
  handle,
  description,
  descriptionHtml: `<p>${description}</p>`,
  priceRange: {
    minVariantPrice: { amount: price, currencyCode: 'USD' },
    maxVariantPrice: { amount: price, currencyCode: 'USD' },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: price, currencyCode: 'USD' },
  },
  featuredImage: { url: image, altText: title, width: 800, height: 1200 },
  images: {
    edges: [
      { node: { url: image, altText: title, width: 800, height: 1200 } },
    ],
  },
  variants: {
    edges: [
      { node: makeVariant(`${id}01`, 'Single Can (355ml)', price) },
      { node: makeVariant(`${id}02`, '6 Pack', (parseFloat(price) * 6 * 0.9).toFixed(2)) },
      { node: makeVariant(`${id}03`, '12 Pack', (parseFloat(price) * 12 * 0.82).toFixed(2)) },
    ],
  },
  tags: [
    flavor,
    'protein-20',
    'sugar-0',
    'carbs-0',
    'fats-0',
    'caffeine-None',
    'calories-100',
    'size-355',
    ...tags,
  ],
  seo: {
    title: `${title} — KLIQ Protein Energy Drink`,
    description: description,
  },
  flavorColorRgb: null,
})

export const mockProducts: ShopifyProduct[] = [
  makeProduct(
    '1001',
    'KLIQ Mixed Berry',
    'kliq-mixed-berry',
    'berry',
    'Bold mixed berry meets 20g whey protein isolate. Refreshing, clean, and packed with power — zero sugar, zero carbs, zero compromise.',
    '/mixed-berry.png',
    ['bestseller'],
    '3.99',
  ),
  makeProduct(
    '1002',
    'KLIQ Cola',
    'kliq-cola',
    'cola',
    'Classic cola taste reimagined with 20g protein. Zero sugar, zero carbs. The performance drink that drinks like a classic.',
    '/cola.png',
    [],
    '3.99',
  ),
  makeProduct(
    '1003',
    'KLIQ Memo Nade',
    'kliq-memo-nade',
    'memo',
    'Zesty lemon-lime with a protein punch. Light, crisp, and guilt-free — 20g protein, zero sugar, no added caffeine.',
    '/memo-nade.png',
    [],
    '3.99',
  ),
  makeProduct(
    '1004',
    'KLIQ Mango Pineapple',
    'kliq-mango-pineapple',
    'mango',
    'Tropical mango and pineapple fused with 20g protein. Pure sunshine in a can — zero sugar, zero fats, all flavor.',
    '/mango-pineapple.png',
    [],
    '3.99',
  ),
  makeProduct(
    '1005',
    'KLIQ Variety Pack',
    'kliq-variety-pack',
    'berry',
    'Can\'t pick just one? Get all 4 KLIQ flavors in one pack. 20g protein, zero sugar, zero carbs — every can, every flavor.',
    '/mixed-berry.png',
    ['bundle'],
    '14.99',
  ),
]

export function getMockProduct(handle: string): ShopifyProduct | null {
  return mockProducts.find((p) => p.handle === handle) ?? null
}

export const mockProductHandles = mockProducts.map((p) => p.handle)
