import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{title: 'Jewelry Care | Luna Jewelry'}];
};

export default function JewelryCare() {
  return (
    <div className="page-wrapper">
      <div className="container-page py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-8">Jewelry Care</h1>
          <p className="text-warm-gray mb-12 text-lg">
            Your Luna jewelry is crafted to last a lifetime. With proper care, your pieces will maintain their beauty for generations.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="heading-3 mb-4">Daily Care</h2>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Remove jewelry before showering, swimming, or exercising</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Apply perfume, lotion, and hairspray before putting on your jewelry</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Avoid contact with harsh chemicals and cleaning products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Put your jewelry on last when getting dressed</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Cleaning Your Gold Jewelry</h2>
              <p className="text-warm-gray mb-4">
                To clean your gold jewelry at home:
              </p>
              <ol className="space-y-3 text-warm-gray list-decimal list-inside">
                <li>Mix a few drops of mild dish soap with warm water</li>
                <li>Soak your jewelry for 10-15 minutes</li>
                <li>Gently brush with a soft-bristled toothbrush</li>
                <li>Rinse thoroughly with clean water</li>
                <li>Pat dry with a soft, lint-free cloth</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Storage</h2>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Store each piece separately to prevent scratching</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use a soft pouch or lined jewelry box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Keep jewelry in a cool, dry place away from direct sunlight</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span>Consider using anti-tarnish strips in your jewelry box</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Professional Care</h2>
              <p className="text-warm-gray">
                We recommend having your jewelry professionally cleaned and inspected once a year. This ensures settings remain secure and your pieces maintain their brilliance. Contact us for professional cleaning services.
              </p>
            </section>

            <section className="bg-cream-dark p-8">
              <h2 className="heading-3 mb-4">Need Help?</h2>
              <p className="text-warm-gray mb-4">
                If you have questions about caring for your Luna jewelry, we're here to help.
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
