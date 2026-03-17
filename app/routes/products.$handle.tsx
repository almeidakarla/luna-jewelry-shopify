import {Link, useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {useState} from 'react';
import {
  shopifyFetch,
  PRODUCT_BY_HANDLE_QUERY,
  formatPrice,
  type ProductResponse,
} from '~/lib/shopify';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `${data?.product?.title || 'Product'} | Luna Jewelry`}];
};

export async function loader({params}: LoaderFunctionArgs) {
  const handle = params.handle || '';

  try {
    const data = await shopifyFetch<ProductResponse>(PRODUCT_BY_HANDLE_QUERY, {handle});

    if (!data.productByHandle) {
      throw new Response('Product not found', {status: 404});
    }

    return {product: data.productByHandle, error: null};
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Response('Product not found', {status: 404});
  }
}

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.images.edges.map(edge => edge.node);
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );
  const numericPrice = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-warm-gray mb-8">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collections/all" className="hover:text-charcoal transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-cream">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage].url}
                  alt={images[selectedImage].altText || product.title}
                  className="w-full h-full object-cover animate-fade-up"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-warm-gray">
                  No image
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={image.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="animate-fade-up" style={{animationDelay: '100ms'}}>
            <p className="text-sm text-warm-gray tracking-wider mb-2">{product.productType || 'Jewelry'}</p>
            <h1 className="font-heading text-4xl text-charcoal mb-4">{product.title}</h1>
            <p className="text-2xl text-charcoal mb-6">{price}</p>

            {product.description && (
              <p className="text-warm-gray leading-relaxed mb-8">{product.description}</p>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm tracking-wider text-charcoal block mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:border-charcoal transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:border-charcoal transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full py-4 bg-charcoal text-cream text-sm tracking-widest hover:bg-gold transition-colors mb-4">
              ADD TO CART — {formatPrice((numericPrice * quantity).toString(), product.priceRange.minVariantPrice.currencyCode)}
            </button>

            <Link
              to="/cart"
              className="block w-full py-4 border border-charcoal text-center text-sm tracking-widest hover:bg-charcoal hover:text-cream transition-all"
            >
              BUY NOW
            </Link>

            {/* Details */}
            <div className="mt-12 pt-8 border-t border-charcoal/10">
              <h3 className="text-sm tracking-wider text-charcoal mb-4">Details</h3>
              <ul className="space-y-2">
                <li className="text-warm-gray text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  High-quality gold finish
                </li>
                <li className="text-warm-gray text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Tarnish resistant
                </li>
                <li className="text-warm-gray text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Hypoallergenic
                </li>
                <li className="text-warm-gray text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Handcrafted with care
                </li>
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 pt-8 border-t border-charcoal/10">
              <div className="flex items-center gap-3 text-sm text-warm-gray">
                <ShippingIcon />
                <span>Free shipping on orders over $150</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16,8 20,8 23,11 23,16 16,16" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
