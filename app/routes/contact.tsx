import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{title: 'Contact Us | Luna Jewelry'}];
};

export default function Contact() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl tracking-wider text-charcoal mb-4">
            Contact Us
          </h1>
          <p className="text-warm-gray font-light">
            We'd love to hear from you
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-2xl text-charcoal mb-6">Get in Touch</h2>
            <div className="space-y-6 text-warm-gray">
              <div>
                <h3 className="text-charcoal text-sm tracking-wider mb-2">Email</h3>
                <a href="mailto:hello@lunajewelry.com" className="hover:text-gold transition-colors">
                  hello@lunajewelry.com
                </a>
              </div>
              <div>
                <h3 className="text-charcoal text-sm tracking-wider mb-2">Hours</h3>
                <p>Monday - Friday: 9am - 6pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
              <div>
                <h3 className="text-charcoal text-sm tracking-wider mb-2">Response Time</h3>
                <p>We typically respond within 24 hours</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm tracking-wider text-charcoal mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-transparent border border-charcoal/20 text-charcoal placeholder:text-warm-gray focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm tracking-wider text-charcoal mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-transparent border border-charcoal/20 text-charcoal placeholder:text-warm-gray focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm tracking-wider text-charcoal mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 bg-transparent border border-charcoal/20 text-charcoal placeholder:text-warm-gray focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm tracking-wider text-charcoal mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-transparent border border-charcoal/20 text-charcoal placeholder:text-warm-gray focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-charcoal text-cream text-sm tracking-widest hover:bg-gold transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
