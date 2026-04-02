const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = '2024-10'
const endpoint = domain ? `https://${domain}/api/${apiVersion}/graphql.json` : ''

/** Returns true when Shopify env vars are configured */
export function isShopifyConfigured(): boolean {
  return Boolean(domain && accessToken)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShopifyImage = {
  url: string
  altText: string | null
  width?: number
  height?: number
}

export type MoneyV2 = {
  amount: string
  currencyCode: string
}

export type ShopifyVariant = {
  id: string
  title: string
  price: MoneyV2
  compareAtPrice: MoneyV2 | null
  availableForSale: boolean
  quantityAvailable: number
  selectedOptions: { name: string; value: string }[]
  image: ShopifyImage | null
}

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  priceRange: { minVariantPrice: MoneyV2; maxVariantPrice: MoneyV2 }
  compareAtPriceRange: { minVariantPrice: MoneyV2 }
  featuredImage: ShopifyImage | null
  images: { edges: { node: ShopifyImage }[] }
  variants: { edges: { node: ShopifyVariant }[] }
  tags: string[]
  seo: { title: string | null; description: string | null }
  /** Shopify metafield: kliq.flavor_color_rgb — e.g. "249, 168, 37" */
  flavorColorRgb: { value: string } | null
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: MoneyV2
    product: { title: string; handle: string; featuredImage: ShopifyImage | null }
    selectedOptions: { name: string; value: string }[]
    image: ShopifyImage | null
  }
  cost: { totalAmount: MoneyV2 }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: { edges: { node: ShopifyCartLine }[] }
  cost: {
    totalAmount: MoneyV2
    subtotalAmount: MoneyV2
    totalTaxAmount: MoneyV2 | null
  }
}

// ─── Fragments ────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              handle
              featuredImage { url altText width height }
            }
            selectedOptions { name value }
            image { url altText width height }
          }
        }
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
`

const PRODUCT_FRAGMENT = `
  id
  title
  handle
  description
  descriptionHtml
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  compareAtPriceRange {
    minVariantPrice { amount currencyCode }
  }
  featuredImage { url altText width height }
  images(first: 10) {
    edges { node { url altText width height } }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        quantityAvailable
        selectedOptions { name value }
        image { url altText width height }
      }
    }
  }
  tags
  seo { title description }
  flavorColorRgb: metafield(namespace: "kliq", key: "flavor_color_rgb") { value }
`

// ─── Client ───────────────────────────────────────────────────────────────────

async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}): Promise<T> {
  if (!domain || !accessToken) {
    throw new Error(
      'Shopify is not configured. Copy .env.local.example → .env.local and add your store domain and Storefront API token.'
    )
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  if (json.errors?.length) {
    throw new Error(json.errors[0].message)
  }
  return json.data as T
}

// ─── Products ─────────────────────────────────────────────────────────────────

// Lightweight query — only fetches handles for generateStaticParams
export async function getAllProductHandles(): Promise<string[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: { handle: string } }[] }
  }>({
    query: `query getAllHandles {
      products(first: 250) { edges { node { handle } } }
    }`,
    tags: ['products'],
  })
  return data.products.edges.map((e) => e.node.handle)
}

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] }
  }>({
    query: `query getProducts($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges { node { ${PRODUCT_FRAGMENT} } }
      }
    }`,
    variables: { first },
    tags: ['products'],
  })
  return data.products.edges.map((e) => e.node)
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null
  }>({
    query: `query getProduct($handle: String!) {
      productByHandle(handle: $handle) { ${PRODUCT_FRAGMENT} }
    }`,
    variables: { handle },
    tags: [`product-${handle}`],
  })
  return data.productByHandle
}

export async function getProductRecommendations(productId: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    productRecommendations: ShopifyProduct[]
  }>({
    query: `query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) { ${PRODUCT_FRAGMENT} }
    }`,
    variables: { productId },
    tags: ['products'],
  })
  return data.productRecommendations
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: `mutation cartCreate {
      cartCreate { cart { ${CART_FRAGMENT} } userErrors { field message } }
    }`,
    cache: 'no-store',
  })
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }
  return data.cartCreate.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `query getCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FRAGMENT} }
    }`,
    variables: { cartId },
    cache: 'no-store',
  })
  return data.cart
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
        userErrors { field message }
      }
    }`,
    variables: { cartId, lines },
    cache: 'no-store',
  })
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }
  return data.cartLinesAdd.cart
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
        userErrors { field message }
      }
    }`,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: 'no-store',
  })
  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message)
  }
  return data.cartLinesUpdate.cart
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
        userErrors { field message }
      }
    }`,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })
  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message)
  }
  return data.cartLinesRemove.cart
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatMoney(money: MoneyV2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(parseFloat(money.amount))
}

export function getProductVariants(product: ShopifyProduct): ShopifyVariant[] {
  return product.variants.edges.map((e) => e.node)
}

export function getProductImages(product: ShopifyProduct): ShopifyImage[] {
  return product.images.edges.map((e) => e.node)
}

export function getCartLines(cart: ShopifyCart): ShopifyCartLine[] {
  return cart.lines.edges.map((e) => e.node)
}
