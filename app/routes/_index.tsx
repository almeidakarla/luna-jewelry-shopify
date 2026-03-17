import {Link, useLoaderData} from '@remix-run/react';
import type {MetaFunction} from '@remix-run/node';
import {shopifyFetch, PRODUCTS_QUERY, formatPrice, type ProductsResponse, type ShopifyProduct} from '~/lib/shopify';

export const meta: MetaFunction = () => {
  return [{title: 'Luna Jewelry | Timeless Elegance'}];
};

export async function loader() {
  try {
    const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {first: 8});
    const products = data.products.edges.map(edge => edge.node);
    return {products, error: null};
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return {products: [], error: 'Failed to load products'};
  }
}

export default function Homepage() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <AboutSection />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 to-cream z-10" />
      <img
        src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&q=80"
        alt="Elegant gold jewelry"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 text-center px-6 animate-fade-up">
        <h1 className="font-heading text-5xl md:text-7xl tracking-widest text-charcoal mb-6">
          Timeless Elegance
        </h1>
        <p className="font-body text-warm-gray text-lg md:text-xl max-w-lg mx-auto mb-10 font-light">
          Discover handcrafted gold jewelry that celebrates your unique story
        </p>
        <Link
          to="/collections/all"
          className="inline-block border border-charcoal px-10 py-4 text-sm tracking-widest hover:bg-charcoal hover:text-cream transition-all duration-300"
        >
          EXPLORE COLLECTION
        </Link>
      </div>
    </section>
  );
}

function FeaturedProducts({products}: {products: ShopifyProduct[]}) {
  if (products.length === 0) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-4xl tracking-wider text-charcoal mb-4">
            Featured Pieces
          </h2>
          <p className="text-warm-gray font-light">Coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl tracking-wider text-charcoal mb-4">
            Featured Pieces
          </h2>
          <p className="text-warm-gray font-light">Curated selections for the discerning collector</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/collections/all"
            className="link-underline text-sm tracking-wider text-charcoal"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({product, index}: {product: ShopifyProduct; index: number}) {
  const image = product.images.edges[0]?.node;
  const price = formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode);

  return (
    <Link
      to={`/products/${product.handle}`}
      className="product-card group"
      style={{animationDelay: `${index * 100}ms`}}
    >
      <div className="aspect-square overflow-hidden bg-cream mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-700"
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

function AboutSection() {
  return (
    <section className="py-24 bg-charcoal text-cream">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80"
            alt="Gold jewelry craftsmanship"
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
        <div>
          <h2 className="font-heading text-4xl tracking-wider mb-6">Our Craft</h2>
          <p className="text-cream/70 leading-relaxed mb-6">
            Each Luna piece is thoughtfully designed and meticulously crafted by skilled artisans.
            We believe in creating jewelry that transcends trends—pieces that become
            cherished heirlooms passed down through generations.
          </p>
          <p className="text-cream/70 leading-relaxed mb-8">
            Using only ethically sourced 14k and 18k gold, we ensure
            that every creation honors both beauty and responsibility.
          </p>
          <Link
            to="/about"
            className="inline-block border border-cream/50 px-8 py-3 text-sm tracking-widest hover:bg-cream hover:text-charcoal transition-all duration-300"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-heading text-3xl tracking-wider text-charcoal mb-4">
          Join Our World
        </h2>
        <p className="text-warm-gray font-light mb-8">
          Be the first to discover new collections and exclusive offers
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-transparent border border-charcoal/20 text-charcoal placeholder:text-warm-gray focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-charcoal text-cream text-sm tracking-widest hover:bg-gold transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}
