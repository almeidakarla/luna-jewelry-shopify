import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{title: 'Our Story | Luna Jewelry'}];
};

export default function About() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&q=80"
          alt="Jewelry craftsmanship"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <h1 className="relative z-20 font-heading text-5xl md:text-6xl tracking-widest text-cream">
          Our Story
        </h1>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg text-warm-gray">
            <p className="text-xl leading-relaxed mb-8 animate-fade-up">
              Luna Jewelry was born from a simple belief: that fine jewelry should be
              both timeless and accessible. We create pieces that celebrate life's
              precious moments without compromising on quality or ethics.
            </p>

            <h2 className="font-heading text-3xl text-charcoal tracking-wider mt-16 mb-6">
              Our Philosophy
            </h2>
            <p className="leading-relaxed mb-6">
              Every piece in our collection is designed to transcend trends. We believe
              that true elegance lies in simplicity—in the perfect curve of a gold
              band, the gentle sparkle of a carefully set stone, the weight of a
              well-crafted pendant.
            </p>

            <h2 className="font-heading text-3xl text-charcoal tracking-wider mt-16 mb-6">
              Craftsmanship
            </h2>
            <p className="leading-relaxed mb-6">
              Working with skilled artisans who share our passion for perfection,
              each Luna piece is meticulously handcrafted. From the initial design
              to the final polish, we ensure that every detail meets our exacting
              standards.
            </p>

            <h2 className="font-heading text-3xl text-charcoal tracking-wider mt-16 mb-6">
              Sustainability
            </h2>
            <p className="leading-relaxed mb-6">
              We're committed to responsible sourcing and sustainable practices.
              Our metals are recycled, our gemstones are ethically sourced, and
              our packaging is eco-friendly. Beauty and responsibility go hand
              in hand.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream border-t border-charcoal/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="animate-fade-up">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gold rounded-full">
                <HeartIcon />
              </div>
              <h3 className="font-heading text-xl text-charcoal mb-3">Made with Love</h3>
              <p className="text-warm-gray text-sm">
                Every piece is crafted with passion and attention to detail
              </p>
            </div>
            <div className="animate-fade-up" style={{animationDelay: '100ms'}}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gold rounded-full">
                <LeafIcon />
              </div>
              <h3 className="font-heading text-xl text-charcoal mb-3">Ethically Sourced</h3>
              <p className="text-warm-gray text-sm">
                Committed to responsible materials and sustainable practices
              </p>
            </div>
            <div className="animate-fade-up" style={{animationDelay: '200ms'}}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gold rounded-full">
                <StarIcon />
              </div>
              <h3 className="font-heading text-xl text-charcoal mb-3">Timeless Design</h3>
              <p className="text-warm-gray text-sm">
                Pieces that transcend trends and last generations
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
