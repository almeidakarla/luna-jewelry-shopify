import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{title: 'Contact Us | Luna Jewelry'}];
};

export default function Contact() {
  return (
    <div className="page-wrapper">
      <div className="container-page py-16">
        <header className="page-header">
          <h1 className="heading-1 mb-4">Contact Us</h1>
          <p className="text-subtitle">We'd love to hear from you</p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 max-w-3xl mx-auto">
          <div>
            <h2 className="heading-3 mb-6">Get in Touch</h2>
            <div className="space-y-6 text-warm-gray">
              <div>
                <h3 className="heading-4 mb-2">Email</h3>
                <a href="mailto:hello@lunajewelry.com" className="footer-link">
                  hello@lunajewelry.com
                </a>
              </div>
              <div>
                <h3 className="heading-4 mb-2">Hours</h3>
                <p>Monday - Friday: 9am - 6pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
              <div>
                <h3 className="heading-4 mb-2">Response Time</h3>
                <p>We typically respond within 24 hours</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="input-label">Name</label>
              <input type="text" id="name" name="name" required className="input" />
            </div>
            <div>
              <label htmlFor="email" className="input-label">Email</label>
              <input type="email" id="email" name="email" required className="input" />
            </div>
            <div>
              <label htmlFor="subject" className="input-label">Subject</label>
              <input type="text" id="subject" name="subject" className="input" />
            </div>
            <div>
              <label htmlFor="message" className="input-label">Message</label>
              <textarea id="message" name="message" rows={5} required className="input resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
}
