'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

type AmenityItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
};

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<AmenityItem[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load from API (Supabase) with cache busting
        const response = await fetch(`/api/content?type=amenities&_=${Date.now()}`);
        if (response.ok) {
          const apiAmenities = await response.json();
          if (Array.isArray(apiAmenities) && apiAmenities.length > 0) {
            setAmenities(apiAmenities);
            return; // Successfully loaded from API
          }
        }
        
        // Fallback to defaults if API fails or has no data
        const defaultAmenities = [
          { id: '1', name: 'Locker Rooms', image: 'https://ext.same-assets.com/443545936/1729744263.webp', description: 'Spacious locker rooms with showers and changing facilities' },
          { id: '2', name: 'Cardio Equipment', image: 'https://ext.same-assets.com/443545936/691732246.webp', description: 'State-of-the-art cardio machines including treadmills, bikes, and ellipticals' },
          { id: '3', name: 'Free Weights', image: 'https://ext.same-assets.com/443545936/1129713061.webp', description: 'Comprehensive free weights area with dumbbells, barbells, and plates' },
          { id: '4', name: 'Group Classes', image: 'https://ext.same-assets.com/443545936/1537262654.webp', description: 'Multiple group fitness studios for various classes' },
          { id: '5', name: 'Personal Training', image: 'https://ext.same-assets.com/443545936/1553179705.webp', description: 'Private training areas with certified personal trainers' },
          { id: '6', name: 'Sauna & Steam Room', image: 'https://ext.same-assets.com/443545936/1443978950.webp', description: 'Relaxation facilities for post-workout recovery' }
        ];
        setAmenities(defaultAmenities);
      } catch (error) {
        console.error('Error loading amenities:', error);
        // Use defaults on error
        const defaultAmenities = [
          { id: '1', name: 'Locker Rooms', image: 'https://ext.same-assets.com/443545936/1729744263.webp', description: 'Spacious locker rooms with showers and changing facilities' },
          { id: '2', name: 'Cardio Equipment', image: 'https://ext.same-assets.com/443545936/691732246.webp', description: 'State-of-the-art cardio machines including treadmills, bikes, and ellipticals' },
          { id: '3', name: 'Free Weights', image: 'https://ext.same-assets.com/443545936/1129713061.webp', description: 'Comprehensive free weights area with dumbbells, barbells, and plates' },
          { id: '4', name: 'Group Classes', image: 'https://ext.same-assets.com/443545936/1537262654.webp', description: 'Multiple group fitness studios for various classes' },
          { id: '5', name: 'Personal Training', image: 'https://ext.same-assets.com/443545936/1553179705.webp', description: 'Private training areas with certified personal trainers' },
          { id: '6', name: 'Sauna & Steam Room', image: 'https://ext.same-assets.com/443545936/1443978950.webp', description: 'Relaxation facilities for post-workout recovery' }
        ];
        setAmenities(defaultAmenities);
      }
    };

    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        {/* Header Section */}
        <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center bg-black overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://ext.same-assets.com/443545936/3789989498.webp"
              alt="Gym Amenities"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-4 sm:mb-6">
              Gym Amenities
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              World-class facilities designed to support your fitness journey
            </p>
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer border border-gray-200 transition-all duration-500 hover-lift">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <Image
                      src={amenity.image}
                      alt={amenity.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-profitness-brown/70 group-hover:via-profitness-brown/40 group-hover:to-transparent transition-all duration-500" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-gray-900 text-xl sm:text-2xl font-black uppercase tracking-wide mb-3 group-hover:text-profitness-brown transition-colors duration-300">
                      {amenity.name}
                    </h3>
                    {amenity.description && (
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        {amenity.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

