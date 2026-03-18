import {Link, useLoaderData} from '@remix-run/react';
import type {MetaFunction} from '@remix-run/node';
import {useState, useEffect} from 'react';
import {shopifyFetch, PRODUCTS_QUERY, COLLECTION_BY_HANDLE_QUERY, formatPrice, type ProductsResponse, type CollectionResponse, type ShopifyProduct} from '~/lib/shopify';

export const meta: MetaFunction = () => {
  return [{title: 'Luna Jewelry | Timeless Elegance'}];
};

export async function loader() {
  try {
    // Fetch all products for featured section and hero
    const productsData = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {first: 12});
    const products = productsData.products.edges.map(edge => edge.node);

    // Fetch best sellers collection
    let bestSellers: ShopifyProduct[] = [];
    try {
      const bestSellersData = await shopifyFetch<CollectionResponse>(COLLECTION_BY_HANDLE_QUERY, {
        handle: 'best-sellers',
        first: 4,
      });
      if (bestSellersData.collectionByHandle) {
        bestSellers = bestSellersData.collectionByHandle.products.edges.map(edge => edge.node);
      }
    } catch (e) {
      console.error('Best sellers collection not found');
    }

    return {products, bestSellers, error: null};
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return {products: [], bestSellers: [], error: 'Failed to load products'};
  }
}

export default function Homepage() {
  const {products, bestSellers} = useLoaderData<typeof loader>();

  return (
    <>
      <Hero products={products} />
      <FeaturedProducts products={products} />
      <BestSellers products={bestSellers} />
      <AboutSection />
      <Newsletter />
    </>
  );
}

function Hero({products}: {products: ShopifyProduct[]}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get product images for carousel
  const heroImages = products
    .filter(p => p.images.edges[0]?.node?.url)
    .slice(0, 5)
    .map(p => ({
      url: p.images.edges[0].node.url,
      alt: p.title,
      handle: p.handle,
    }));

  // Auto-advance carousel
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Fallback image if no products
  const fallbackImage = 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&q=80';

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 to-cream z-10" />

      {/* Carousel Images */}
      {heroImages.length > 0 ? (
        heroImages.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))
      ) : (
        <img
          src={fallbackImage}
          alt="Elegant gold jewelry"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Content */}
      <div className="relative z-20 text-center px-6 animate-fade-up">
        <h1 className="font-heading text-5xl md:text-7xl tracking-widest text-charcoal mb-6">
          Timeless Elegance
        </h1>
        <p className="font-body text-charcoal/70 text-lg md:text-xl max-w-lg mx-auto mb-10 font-light">
          Discover handcrafted gold jewelry that celebrates your unique story
        </p>
        <Link to="/collections/all" className="btn-secondary">
          EXPLORE COLLECTION
        </Link>
      </div>

      {/* Carousel Controls */}
      {heroImages.length > 1 && (
        <>
          {/* Arrow Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-cream/80 hover:bg-cream text-charcoal transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-cream/80 hover:bg-cream text-charcoal transition-all"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-gold w-6' : 'bg-charcoal/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function FeaturedProducts({products}: {products: ShopifyProduct[]}) {
  if (products.length === 0) {
    return (
      <section className="section">
        <div className="container-page text-center">
          <h2 className="heading-2 mb-4">Featured Pieces</h2>
          <p className="text-subtitle">Coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container-page">
        <div className="page-header">
          <h2 className="heading-2 mb-4">Featured Pieces</h2>
          <p className="text-subtitle">Curated selections for the discerning collector</p>
        </div>

        <div className="product-grid-featured">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/collections/all" className="link-underline text-sm tracking-wider text-charcoal">
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
      className="product-card group animate-fade-up"
      style={{animationDelay: `${index * 100}ms`}}
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

function BestSellers({products}: {products: ShopifyProduct[]}) {
  if (products.length === 0) {
    return null; // Don't show section if no best sellers collection exists
  }

  return (
    <section className="section bg-charcoal">
      <div className="container-page">
        <div className="page-header">
          <h2 className="heading-2 text-cream mb-4">Best Sellers</h2>
          <p className="text-cream/60 font-light">Our most loved pieces</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <BestSellerCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/collections/best-sellers" className="link-underline text-sm tracking-wider text-cream">
            View All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
}

function BestSellerCard({product, index}: {product: ShopifyProduct; index: number}) {
  const image = product.images.edges[0]?.node;
  const price = formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode);

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group animate-fade-up"
      style={{animationDelay: `${index * 100}ms`}}
    >
      <div className="aspect-square overflow-hidden bg-cream/10 mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cream/50">No image</div>
        )}
      </div>
      <p className="text-xs text-cream/50 tracking-wider mb-1">{product.productType || 'Jewelry'}</p>
      <h3 className="font-heading text-lg text-cream mb-1">{product.title}</h3>
      <p className="text-sm text-gold">{price}</p>
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
          <h2 className="heading-2 text-cream mb-6">Our Craft</h2>
          <p className="text-cream/70 leading-relaxed mb-6">
            Each Luna piece is thoughtfully designed and meticulously crafted by skilled artisans.
            We believe in creating jewelry that transcends trends—pieces that become
            cherished heirlooms passed down through generations.
          </p>
          <p className="text-cream/70 leading-relaxed mb-8">
            Using only ethically sourced 14k and 18k gold, we ensure
            that every creation honors both beauty and responsibility.
          </p>
          <Link to="/about" className="btn-outline-light">
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="section bg-cream">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="heading-2 mb-4">Join Our World</h2>
        <p className="text-subtitle mb-8">
          Be the first to discover new collections and exclusive offers
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input flex-1"
          />
          <button type="submit" className="btn-primary">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
