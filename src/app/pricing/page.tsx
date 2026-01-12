'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
};

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load from API (Supabase) with cache busting
        const response = await fetch(`/api/content?type=pricing&_=${Date.now()}`);
        if (response.ok) {
          const apiPricing = await response.json();
          if (Array.isArray(apiPricing) && apiPricing.length > 0) {
            setPlans(apiPricing);
            return; // Successfully loaded from API
          }
        }
        
        // Fallback to defaults if API fails or has no data
        const defaultPlans: PricingPlan[] = [
          {
            id: '1',
            name: "Basic",
            price: "$49",
            period: "per month",
            features: [
              "Access to all group classes",
              "Gym equipment access",
              "Locker room facilities",
              "Free parking"
            ]
          },
          {
            id: '2',
            name: "Premium",
            price: "$79",
            period: "per month",
            features: [
              "Everything in Basic",
              "Priority class booking",
              "1 personal training session/month",
              "Nutrition consultation",
              "Guest passes (2/month)"
            ],
            popular: true
          },
          {
            id: '3',
            name: "Elite",
            price: "$129",
            period: "per month",
            features: [
              "Everything in Premium",
              "Unlimited personal training",
              "24/7 gym access",
              "Towel service",
              "Unlimited guest passes",
              "Complimentary supplements"
            ]
          }
        ];
        setPlans(defaultPlans);
      } catch (error) {
        console.error('Error loading pricing:', error);
        // Use defaults on error
        const defaultPlans: PricingPlan[] = [
          {
            id: '1',
            name: "Basic",
            price: "$49",
            period: "per month",
            features: [
              "Access to all group classes",
              "Gym equipment access",
              "Locker room facilities",
              "Free parking"
            ]
          },
          {
            id: '2',
            name: "Premium",
            price: "$79",
            period: "per month",
            features: [
              "Everything in Basic",
              "Priority class booking",
              "1 personal training session/month",
              "Nutrition consultation",
              "Guest passes (2/month)"
            ],
            popular: true
          },
          {
            id: '3',
            name: "Elite",
            price: "$129",
            period: "per month",
            features: [
              "Everything in Premium",
              "Unlimited personal training",
              "24/7 gym access",
              "Towel service",
              "Unlimited guest passes",
              "Complimentary supplements"
            ]
          }
        ];
        setPlans(defaultPlans);
      }
    };

    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-heading text-center mb-4 sm:mb-6">
              <span className="gradient-underline">Pricing</span>
            </h1>
            <p className="text-center text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Choose the membership plan that fits your fitness goals and lifestyle.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                    plan.popular ? 'ring-2 ring-black lg:scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-black text-white text-center py-2 text-xs sm:text-sm font-bold uppercase">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-black uppercase mb-3 sm:mb-4">{plan.name}</h3>
                    <div className="mb-4 sm:mb-6">
                      <span className="text-3xl sm:text-4xl font-black">{plan.price}</span>
                      <span className="text-gray-600 ml-2 text-sm sm:text-base">{plan.period}</span>
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase transition-colors ${
                        plan.popular
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-200 text-black hover:bg-gray-300'
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-heading mb-4 sm:mb-6">
              <span className="gradient-underline">Ready to Get Started?</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Start your fitness journey today with a free trial class.
            </p>
            <a
              href="/contact"
              className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase hover:bg-gray-200 transition-colors inline-block"
            >
              Book Your Trial
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

