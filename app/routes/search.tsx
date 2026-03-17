import {Link, useLoaderData, useSearchParams} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {shopifyFetch, formatPrice, type ShopifyProduct} from '~/lib/shopify';

export const meta: MetaFunction = () => {
  return [{title: 'Search | Luna Jewelry'}];
};

interface SearchResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

const SEARCH_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          productType
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
        }
      }
    }
  }
`;

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  if (!query) {
    return {products: [], query: ''};
  }

  try {
    const data = await shopifyFetch<SearchResponse>(SEARCH_QUERY, {
      query,
      first: 20,
    });
    const products = data.products.edges.map(edge => edge.node);
    return {products, query};
  } catch (error) {
    console.error('Search error:', error);
    return {products: [], query};
  }
}

export default function Search() {
  const {products, query} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="text-center mb-12">
          <h1 className="font-heading text-4xl tracking-wider text-charcoal mb-8">
            Search
          </h1>
          <form method="get" className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search for jewelry..."
                className="w-full px-6 py-4 pr-12 bg-transparent border border-charcoal/20 text-charcoal placeholder:text-warm-gray focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </div>
          </form>
        </header>

        {query && (
          <p className="text-center text-warm-gray mb-12">
            {products.length} result{products.length !== 1 ? 's' : ''} for "{query}"
          </p>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <p className="text-warm-gray mb-4">No products found for "{query}"</p>
            <Link
              to="/collections/all"
              className="inline-block border border-charcoal px-8 py-3 text-sm tracking-widest hover:bg-charcoal hover:text-cream transition-all"
            >
              BROWSE ALL JEWELRY
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProductCard({product, index}: {product: ShopifyProduct; index: number}) {
  const image = product.images.edges[0]?.node;
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  return (
    <Link
      to={`/products/${product.handle}`}
      className="product-card group animate-fade-up"
      style={{animationDelay: `${index * 50}ms`}}
    >
      <div className="aspect-square overflow-hidden bg-cream mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray">
            No image
          </div>
        )}
      </div>
      <p className="text-xs text-warm-gray tracking-wider mb-1">{product.productType || 'Jewelry'}</p>
      <h3 className="font-heading text-lg text-charcoal mb-1">{product.title}</h3>
      <p className="text-sm text-charcoal">{price}</p>
    </Link>
  );
}
