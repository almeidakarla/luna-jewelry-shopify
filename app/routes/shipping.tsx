import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{title: 'Shipping & Returns | Luna Jewelry'}];
};

export default function Shipping() {
  return (
    <div className="page-wrapper">
      <div className="container-page py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-8">Shipping & Returns</h1>

          <div className="space-y-12">
            <section>
              <h2 className="heading-3 mb-4">Shipping</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl mb-2">Domestic Shipping (United States)</h3>
                  <ul className="space-y-2 text-warm-gray">
                    <li className="flex justify-between border-b border-charcoal/10 py-2">
                      <span>Standard Shipping (5-7 business days)</span>
                      <span>$5.95</span>
                    </li>
                    <li className="flex justify-between border-b border-charcoal/10 py-2">
                      <span>Express Shipping (2-3 business days)</span>
                      <span>$14.95</span>
                    </li>
                    <li className="flex justify-between border-b border-charcoal/10 py-2">
                      <span>Overnight Shipping (1 business day)</span>
                      <span>$24.95</span>
                    </li>
                    <li className="flex justify-between py-2 font-medium">
                      <span>Free Standard Shipping on orders over $150</span>
                      <span>FREE</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-xl mb-2">International Shipping</h3>
                  <p className="text-warm-gray mb-4">
                    We ship to most countries worldwide. International shipping rates are calculated at checkout based on destination and package weight.
                  </p>
                  <ul className="space-y-2 text-warm-gray">
                    <li className="flex justify-between border-b border-charcoal/10 py-2">
                      <span>Canada & Mexico (7-14 business days)</span>
                      <span>From $19.95</span>
                    </li>
                    <li className="flex justify-between border-b border-charcoal/10 py-2">
                      <span>Europe (10-21 business days)</span>
                      <span>From $29.95</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span>Rest of World (14-28 business days)</span>
                      <span>From $39.95</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Order Processing</h2>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Orders are processed within 1-2 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>You will receive a shipping confirmation email with tracking information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Orders placed after 2 PM EST will be processed the next business day</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>All packages are fully insured and require a signature upon delivery</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Returns & Exchanges</h2>
              <p className="text-warm-gray mb-4">
                We want you to love your Luna jewelry. If you're not completely satisfied, we offer hassle-free returns within 30 days of delivery.
              </p>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Items must be unworn and in original packaging</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Custom or personalized pieces are final sale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Return shipping is free for domestic orders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Refunds are processed within 5-7 business days of receiving your return</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">How to Return</h2>
              <ol className="space-y-3 text-warm-gray list-decimal list-inside">
                <li>Contact us at hello@lunajewelry.com to initiate your return</li>
                <li>Receive a prepaid shipping label via email</li>
                <li>Pack your item securely in its original packaging</li>
                <li>Drop off at any authorized shipping location</li>
                <li>Receive your refund once we process your return</li>
              </ol>
            </section>

            <section className="bg-cream-dark p-8">
              <h2 className="heading-3 mb-4">Questions?</h2>
              <p className="text-warm-gray mb-4">
                Our customer service team is here to help with any shipping or return inquiries.
              </p>
              <a href="/contact" className="btn-secondary inline-block">
                CONTACT US
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
