'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DEFAULT_CONTENT } from "@/config/defaultContent";

type ShopItem = {
  id: string;
  name: string;
  image: string;
  price?: string;
};

export default function ShopPage() {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    const loadShopItems = async () => {
      try {
        const response = await fetch("/api/content?type=shop&" + new Date().getTime());
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setShopItems(data);
            return;
          }
        }
        console.error("Failed to load shop items from API:", response.statusText);
      } catch (error) {
        console.error("Error loading shop items:", error);
      }
      // Fallback to default content
      setShopItems(DEFAULT_CONTENT.shop || []);
    };

    loadShopItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-heading text-center mb-4 sm:mb-6">
              <span className="gradient-underline">Shop</span>
            </h1>
            <p className="text-center text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Get your ProFitness gear and training equipment. Show your gym pride!
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {shopItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {shopItems.map((product) => (
                  <div key={product.id} className="text-center">
                    <div className="relative aspect-square mb-3 sm:mb-4 bg-white rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-3 sm:p-4"
                      />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{product.name}</h3>
                    {product.price && (
                      <p className="text-gray-600 font-semibold text-sm sm:text-base">{product.price}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-600 text-base sm:text-lg">No products available at this time.</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-heading mb-4 sm:mb-6">
              <span className="gradient-underline">Training Equipment</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Need training gear like gloves, resistance bands, or yoga mats? Visit us at the gym 
              and our team will help you find the perfect equipment for your workouts.
            </p>
            <a
              href="/contact"
              className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase hover:bg-gray-200 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

