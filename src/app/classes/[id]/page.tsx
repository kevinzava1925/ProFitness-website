'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { DEFAULT_IMAGES } from "@/config/defaultImages";

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

export default function ClassDetailPage() {
  const params = useParams();
  const classId = params?.id as string;
  const [classItem, setClassItem] = useState<ClassItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClass = async () => {
      try {
        // Always try to load from API first (Supabase) - add cache busting to ensure fresh data
        const response = await fetch('/api/content?type=classes&' + new Date().getTime());
        if (response.ok) {
          const apiClasses = await response.json();
          
          // Find the class by ID
          if (Array.isArray(apiClasses) && apiClasses.length > 0) {
            const foundClass = apiClasses.find((c: ClassItem) => c.id === classId);
            if (foundClass) {
              setClassItem(foundClass);
              setLoading(false);
              return; // Successfully loaded from API
            }
          }
        } else {
          console.error('API response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error loading from API:', error);
      }

      // Fallback to localStorage if API fails
      const loadedClasses = localStorage.getItem("classes");
      if (loadedClasses) {
        const classes = JSON.parse(loadedClasses);
        const foundClass = classes.find((c: ClassItem) => c.id === classId);
        if (foundClass) {
          setClassItem(foundClass);
          setLoading(false);
          return;
        }
      }

      // Fallback to default classes if not found
      const defaultClasses = [
        { id: '1', name: 'MUAY THAI', image: DEFAULT_IMAGES.classes.muayThai, description: 'Traditional Thai Boxing' },
        { id: '2', name: 'FITNESS', image: DEFAULT_IMAGES.classes.fitness, description: 'Strength and Conditioning' },
        { id: '3', name: 'MMA', image: DEFAULT_IMAGES.classes.mma, description: 'Mixed Martial Arts' },
        { id: '4', name: 'BJJ', image: DEFAULT_IMAGES.classes.bjj, description: 'Brazilian Jiu-Jitsu' },
        { id: '5', name: 'BOXING', image: DEFAULT_IMAGES.classes.boxing, description: 'Western Boxing' },
        { id: '6', name: 'RECOVERY', image: DEFAULT_IMAGES.classes.recovery, description: 'Yoga and Massage' }
      ];
      const fallbackClass = defaultClasses.find(c => c.id === classId);
      if (fallbackClass) {
        setClassItem(fallbackClass);
      }
      setLoading(false);
    };

    loadClass();
  }, [classId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-profitness-brown mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!classItem) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-16 sm:pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Class Not Found</h1>
            <p className="text-gray-600 mb-8">The class you're looking for doesn't exist.</p>
            <Link href="/classes" className="bg-black text-white px-6 py-3 font-bold uppercase hover:bg-profitness-brown transition-all duration-300 rounded-lg">
              Back to Classes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        {/* Header Image */}
        <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-black overflow-hidden">
          <Image
            src={classItem.headerImage || classItem.image}
            alt={classItem.name}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase text-center px-4">
              {classItem.name}
            </h1>
          </div>
        </section>

        {/* Class Content */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Description */}
            {classItem.description && (
              <div className="mb-12 sm:mb-16">
                <h2 className="section-heading mb-6 sm:mb-8">
                  <span className="gradient-underline">About This Class</span>
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {classItem.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Benefits */}
              {classItem.benefits && classItem.benefits.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase mb-6 text-gray-900">
                    Benefits
                  </h3>
                  <ul className="space-y-4">
                    {classItem.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-6 h-6 text-profitness-brown mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-base sm:text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trainer */}
              {classItem.trainer && (
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase mb-6 text-gray-900">
                    Trainer
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {classItem.trainer}
                  </p>
                </div>
              )}

              {/* Schedule */}
              {classItem.schedule && classItem.schedule.length > 0 && (
                <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase mb-6 text-gray-900">
                    Schedule
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classItem.schedule.map((scheduleItem, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-gray-700 text-base sm:text-lg font-semibold">
                          {scheduleItem}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/contact">
                <button className="bg-black text-white px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg shadow-lg w-full sm:w-auto">
                  Join This Class
                </button>
              </Link>
              <Link href="/classes">
                <button className="bg-white text-black border-2 border-black px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-gray-100 transition-all duration-300 hover-lift rounded-lg w-full sm:w-auto">
                  View All Classes
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

