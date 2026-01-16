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
  category?: string;
};

type PricingCategory = {
  id: string;
  name: string;
  description?: string;
};

const DEFAULT_PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'vip-all-access',
    name: 'VIP All Access',
    description: 'Unlimited access for members who want everything covered.',
  },
  {
    id: 'regular-ride',
    name: 'Regular Ride',
    description: 'Consistent training options for routine-focused members.',
  },
  {
    id: 'sessions',
    name: 'Sessions',
    description: 'Flexible session packs for targeted training goals.',
  },
  {
    id: 'casuals',
    name: 'Casuals',
    description: 'Pay-as-you-go access for casual visits.',
  },
];

const normaliseName = (value?: string) => value?.trim().toLowerCase() || '';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const normaliseCategories = (data: unknown): PricingCategory[] => {
  if (!Array.isArray(data)) return [];
  return data
    .map((item) => {
      if (typeof item === 'string') {
        return { id: slugify(item), name: item };
      }
      if (item && typeof item === 'object' && 'name' in item) {
        const name = String((item as { name: string }).name);
        return {
          id: String((item as { id?: string }).id || slugify(name)),
          name,
          description: (item as { description?: string }).description || '',
        };
      }
      return null;
    })
    .filter((item): item is PricingCategory => Boolean(item?.name));
};

const mergeCategories = (
  categories: PricingCategory[],
  plans: PricingPlan[]
): PricingCategory[] => {
  const merged = [...categories];
  const existingNames = new Set(categories.map((c) => normaliseName(c.name)));
  plans.forEach((plan) => {
    if (plan.category) {
      const key = normaliseName(plan.category);
      if (key && !existingNames.has(key)) {
        merged.push({ id: slugify(plan.category), name: plan.category });
        existingNames.add(key);
      }
    }
  });
  return merged.length ? merged : DEFAULT_PRICING_CATEGORIES;
};

const getPlanCategory = (plan: PricingPlan, categories: PricingCategory[]): string => {
  if (plan.category) {
    const match = categories.find(
      (category) => normaliseName(category.name) === normaliseName(plan.category)
    );
    return match?.name || plan.category;
  }
  const byName = categories.find((category) =>
    normaliseName(plan.name).includes(normaliseName(category.name))
  );
  return byName?.name || categories[0]?.name || 'VIP All Access';
};

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [categories, setCategories] = useState<PricingCategory[]>(DEFAULT_PRICING_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string | null>(DEFAULT_PRICING_CATEGORIES[0].name);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load from API (Supabase) with cache busting
        const [pricingResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/content?type=pricing&_=${Date.now()}`),
          fetch(`/api/content?type=pricingCategories&_=${Date.now()}`),
        ]);

        if (categoriesResponse.ok) {
          const apiCategories = await categoriesResponse.json();
          const normalised = normaliseCategories(apiCategories);
          if (normalised.length > 0) setCategories(normalised);
        }

        if (pricingResponse.ok) {
          const apiPricing = await pricingResponse.json();
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
            ],
            category: "VIP All Access"
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
            popular: true,
            category: "VIP All Access"
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
            ],
            category: "VIP All Access"
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
            ],
            category: "VIP All Access"
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
            popular: true,
            category: "VIP All Access"
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
            ],
            category: "VIP All Access"
          }
        ];
        setPlans(defaultPlans);
      }
    };

    loadContent();
  }, []);

  const categoryList = mergeCategories(categories, plans);

  useEffect(() => {
    if (activeCategory && !categoryList.find((category) => category.name === activeCategory)) {
      setActiveCategory(categoryList[0]?.name || null);
    }
  }, [activeCategory, categoryList]);

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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-3 sm:space-y-6">
              {categoryList.map((category) => {
                const categoryPlans = plans.filter(
                  (plan) => getPlanCategory(plan, categoryList) === category.name
                );
                const isOpen = activeCategory === category.name;

                return (
                  <div
                    key={category.id}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'border-black bg-white shadow-xl'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCategory(isOpen ? null : category.name)
                      }
                      className={`w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 text-left transition-all ${
                        isOpen
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="text-sm uppercase tracking-widest text-profitness-brown">
                          {category.name}
                        </p>
                        <h3 className="text-lg sm:text-xl font-black uppercase mt-1">
                          {category.description || 'Browse the pricing options available in this group.'}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className={`text-xs sm:text-sm uppercase font-semibold ${isOpen ? 'text-white' : 'text-gray-500'}`}>
                          {categoryPlans.length} options
                        </span>
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            isOpen ? 'rotate-180 text-white' : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                        isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-4 sm:px-8 pb-5 sm:pb-8 pt-0.5">
                        {categoryPlans.length === 0 ? (
                          <p className="text-gray-600 text-sm sm:text-base">
                            No pricing options available for this category yet.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mt-3 sm:mt-4">
                            {categoryPlans.map((plan) => (
                              <div
                                key={plan.id}
                                className={`rounded-xl border p-4 sm:p-6 ${
                                  plan.popular
                                    ? 'border-black shadow-lg'
                                    : 'border-gray-200'
                                }`}
                              >
                                {plan.popular && (
                                  <div className="text-xs uppercase font-bold text-profitness-brown mb-2">
                                    Most Popular
                                  </div>
                                )}
                                <div className="flex items-baseline justify-between gap-3 sm:gap-4 mb-3">
                                  <h4 className="text-lg sm:text-xl font-black uppercase">
                                    {plan.name}
                                  </h4>
                                  <div className="text-right">
                                    <div className="text-2xl sm:text-3xl font-black">
                                      {plan.price}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500">
                                      {plan.period}
                                    </div>
                                  </div>
                                </div>
                                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700 mb-4">
                                  {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <svg
                                        className="w-4 h-4 text-profitness-brown mt-1 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span>{feature}</span>
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
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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

