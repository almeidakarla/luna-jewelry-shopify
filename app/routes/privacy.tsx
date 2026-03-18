import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{title: 'Privacy Policy | Luna Jewelry'}];
};

export default function PrivacyPolicy() {
  return (
    <div className="page-wrapper">
      <div className="container-page py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-8">Privacy Policy</h1>
          <p className="text-warm-gray mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-charcoal space-y-8">
            <section>
              <h2 className="heading-3 mb-4">Introduction</h2>
              <p className="text-warm-gray leading-relaxed">
                Luna Jewelry ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Information We Collect</h2>
              <p className="text-warm-gray leading-relaxed mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc list-inside text-warm-gray space-y-2 ml-4">
                <li>Name, email address, and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Communications you send to us</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">How We Use Your Information</h2>
              <p className="text-warm-gray leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-warm-gray space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Your Privacy Choices</h2>
              <p className="text-warm-gray leading-relaxed mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside text-warm-gray space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Do Not Sell:</strong> We do not sell your personal information to third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Cookies and Tracking</h2>
              <p className="text-warm-gray leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings. Essential cookies required for the website to function cannot be disabled.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Data Security</h2>
              <p className="text-warm-gray leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Third-Party Services</h2>
              <p className="text-warm-gray leading-relaxed">
                We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders. These providers are contractually obligated to protect your data and use it only for the purposes we specify.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Children's Privacy</h2>
              <p className="text-warm-gray leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Changes to This Policy</h2>
              <p className="text-warm-gray leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Contact Us</h2>
              <p className="text-warm-gray leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 text-warm-gray">
                <p>Email: hello@lunajewelry.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
