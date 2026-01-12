'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

type ClassItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
  benefits?: string[];
  trainer?: string;
  schedule?: string[];
  headerImage?: string;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    const loadedClasses = localStorage.getItem("classes");
    if (loadedClasses) {
      setClasses(JSON.parse(loadedClasses));
    } else {
      // Default classes
      const defaultClasses = [
        { id: '1', name: 'MUAY THAI', image: 'https://ext.same-assets.com/443545936/1729744263.webp', description: 'Traditional Thai Boxing' },
        { id: '2', name: 'FITNESS', image: 'https://ext.same-assets.com/443545936/691732246.webp', description: 'Strength and Conditioning' },
        { id: '3', name: 'MMA', image: 'https://ext.same-assets.com/443545936/1129713061.webp', description: 'Mixed Martial Arts' },
        { id: '4', name: 'BJJ', image: 'https://ext.same-assets.com/443545936/1537262654.webp', description: 'Brazilian Jiu-Jitsu' },
        { id: '5', name: 'BOXING', image: 'https://ext.same-assets.com/443545936/1553179705.webp', description: 'Western Boxing' },
        { id: '6', name: 'RECOVERY', image: 'https://ext.same-assets.com/443545936/1443978950.webp', description: 'Yoga and Massage' }
      ];
      setClasses(defaultClasses);
    }
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
              alt="Our Classes"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-4 sm:mb-6">
              Our Classes
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Discover all our fitness programs designed to help you achieve your goals
            </p>
          </div>
        </section>

        {/* Classes Grid */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {classes.map((classItem) => (
                <Link key={classItem.id} href={`/classes/${classItem.id}`}>
                  <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover-lift border border-gray-200">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                      <Image
                        src={classItem.image}
                        alt={classItem.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-profitness-brown/70 group-hover:via-profitness-brown/40 group-hover:to-transparent transition-all duration-500" />
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="text-gray-900 text-2xl sm:text-3xl font-black uppercase tracking-wide mb-3 group-hover:text-profitness-brown transition-colors duration-300">
                        {classItem.name}
                      </h3>
                      {classItem.description && (
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300 mb-4">
                          {classItem.description}
                        </p>
                      )}
                      <div className="flex items-center text-profitness-brown font-semibold text-sm uppercase group-hover:translate-x-2 transition-transform duration-300">
                        Learn More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

