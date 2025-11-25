import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-heading mb-4 sm:mb-6">
              <span className="gradient-underline">Help Center</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0">
              Find answers to common questions about ProFitness Gym, our classes, memberships, and more.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {/* FAQ Item */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase">How do I sign up for a trial class?</h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  You can sign up for a free trial class by visiting our gym during opening hours or contacting us through our contact page. 
                  Our team will help you find a suitable class and schedule your trial session.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase">What should I bring to my first class?</h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  For your first class, please bring comfortable workout clothes, a water bottle, and a towel. 
                  We provide all necessary equipment. If you're joining a martial arts class, we recommend wearing athletic wear.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 uppercase">What are the membership options?</h2>
                <p className="text-gray-700 leading-relaxed">
                  We offer various membership plans including monthly, quarterly, and annual options. 
                  Visit our Pricing page for detailed information about each plan and what's included.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 uppercase">Can I cancel my membership?</h2>
                <p className="text-gray-700 leading-relaxed">
                  Yes, you can cancel your membership at any time. Please contact our membership team 
                  or visit the front desk to process your cancellation. Notice requirements may vary by plan.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 uppercase">Do you offer personal training?</h2>
                <p className="text-gray-700 leading-relaxed">
                  Yes, we offer personal training sessions with our certified trainers. 
                  Contact us to learn more about personal training packages and availability.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 uppercase">What if I have more questions?</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have additional questions, please don't hesitate to contact us through our 
                  <a href="/contact" className="text-black font-semibold hover:underline"> Contact page</a> or 
                  visit us at the gym during opening hours. Our team is always happy to help!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-heading mb-4 sm:mb-6">
              <span className="gradient-underline">Still Need Help?</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Can't find what you're looking for? Get in touch with our support team.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase hover:bg-gray-200 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="mailto:support@profitness.com"
                className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase hover:bg-gray-200 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

