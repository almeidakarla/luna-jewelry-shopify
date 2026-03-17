// Shopify Storefront API client
const SHOPIFY_STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN || '';

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{message: string}>;
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({query, variables}),
    }
  );

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    console.error('Shopify API errors:', json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

// GraphQL Queries
export const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          productType
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      productType
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

export const COLLECTION_QUERY = `
  query Collection($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            productType
          }
        }
      }
    }
  }
`;
