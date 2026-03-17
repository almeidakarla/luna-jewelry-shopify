import {Link, useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {
  shopifyFetch,
  PRODUCTS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  formatPrice,
  type ProductsResponse,
  type CollectionResponse,
  type ShopifyProduct,
} from '~/lib/shopify';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `${data?.collectionTitle || 'Collection'} | Luna Jewelry`}];
};

export async function loader({params}: LoaderFunctionArgs) {
  const handle = params.handle || 'all';

  try {
    if (handle === 'all') {
      const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {first: 50});
      const products = data.products.edges.map(edge => edge.node);
      return { collectionTitle: 'All Jewelry', products, error: null };
    } else {
      const data = await shopifyFetch<CollectionResponse>(COLLECTION_BY_HANDLE_QUERY, { handle, first: 50 });

      if (data.collectionByHandle) {
        const products = data.collectionByHandle.products.edges.map(edge => edge.node);
        return { collectionTitle: data.collectionByHandle.title, products, error: null };
      }

      const allData = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {first: 50});
      const filteredProducts = allData.products.edges
        .map(edge => edge.node)
        .filter(p => p.productType.toLowerCase() === handle.toLowerCase());

      const titleMap: Record<string, string> = {
        necklaces: 'Necklaces',
        earrings: 'Earrings',
        rings: 'Rings',
        bracelets: 'Bracelets',
      };

      return {
        collectionTitle: titleMap[handle] || handle.charAt(0).toUpperCase() + handle.slice(1),
        products: filteredProducts,
        error: null,
      };
    }
  } catch (error) {
    console.error('Failed to fetch collection:', error);
    return { collectionTitle: 'Collection', products: [], error: 'Failed to load products' };
  }
}

export default function Collection() {
  const {collectionTitle, products} = useLoaderData<typeof loader>();

  return (
    <div className="page-wrapper">
      <div className="container-page py-16">
        <header className="page-header">
          <h1 className="heading-1 mb-4">{collectionTitle}</h1>
          <p className="text-subtitle">Timeless gold pieces crafted with intention</p>
        </header>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product: ShopifyProduct, index: number) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-warm-gray py-16">No products found in this collection.</p>
        )}
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
      <div className="product-image mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray">No image</div>
        )}
      </div>
      <p className="text-label mb-1">{product.productType || 'Jewelry'}</p>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">{price}</p>
    </Link>
  );
}
