import {Link} from '@remix-run/react';
import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{title: 'Luna Jewelry | Timeless Elegance'}];
};

export default function Homepage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
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

function FeaturedProducts() {
  const products = [
    {
      id: 'snake-chain-necklace',
      name: 'Snake Chain Necklace',
      price: '$185',
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
      category: 'Necklaces',
    },
    {
      id: 'stackable-rings',
      name: 'Minimalist Ring Set',
      price: '$145',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
      category: 'Rings',
    },
    {
      id: 'gold-hoops',
      name: 'Classic Gold Hoops',
      price: '$125',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
      category: 'Earrings',
    },
    {
      id: 'chain-bracelet',
      name: 'Delicate Chain Bracelet',
      price: '$95',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      category: 'Bracelets',
    },
  ];

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
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card group"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="aspect-square overflow-hidden bg-cream mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </div>
              <p className="text-xs text-warm-gray tracking-wider mb-1">{product.category}</p>
              <h3 className="font-heading text-lg text-charcoal mb-1">{product.name}</h3>
              <p className="text-sm text-charcoal">{product.price}</p>
            </Link>
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

function AboutSection() {
  return (
    <section className="py-24 bg-charcoal text-cream">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80"
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
