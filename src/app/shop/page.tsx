'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";

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
        // Always try to load from API first (Supabase) - add cache busting to ensure fresh data
        const response = await fetch('/api/content?type=shop&' + new Date().getTime());
        if (response.ok) {
          const apiShopItems = await response.json();
          
          // Set shop items from API if available
          if (Array.isArray(apiShopItems) && apiShopItems.length > 0) {
            setShopItems(apiShopItems);
            return; // Successfully loaded from API
          }
        } else {
          console.error('API response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error loading from API:', error);
      }

      // Fallback to localStorage if API fails
      const loadedShop = localStorage.getItem("shopItems");
      if (loadedShop) {
        setShopItems(JSON.parse(loadedShop));
      } else {
        const defaultShop = [
          { id: '1', name: 'T-Shirt', image: 'https://ext.same-assets.com/443545936/2710426474.webp', price: '$29.99' },
          { id: '2', name: 'Hoodie', image: 'https://ext.same-assets.com/443545936/480816838.webp', price: '$59.99' },
          { id: '3', name: 'Cap', image: 'https://ext.same-assets.com/443545936/1859491465.webp', price: '$24.99' },
          { id: '4', name: 'Duffle Bag', image: 'https://ext.same-assets.com/443545936/3860077197.webp', price: '$39.99' }
        ];
        setShopItems(defaultShop);
      }
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
                      <p className="text-gray-600 mb-3 sm:mb-4 font-semibold text-sm sm:text-base">{product.price}</p>
                    )}
                    <button className="w-full border-2 border-black px-4 sm:px-6 py-1.5 sm:py-2 font-bold text-xs sm:text-sm uppercase hover:bg-black hover:text-white transition-colors">
                      Add to Cart
                    </button>
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

