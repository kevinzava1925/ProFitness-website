'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { DEFAULT_IMAGES } from "@/config/defaultImages";

type CollaborationItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
};

export default function CollaborationsPage() {
  const [collaborations, setCollaborations] = useState<CollaborationItem[]>([]);

  useEffect(() => {
    const loadedCollaborations = localStorage.getItem("collaborations");
    if (loadedCollaborations) {
      setCollaborations(JSON.parse(loadedCollaborations));
    } else {
      // Default collaborations
      const defaultCollaborations = [
        { id: '1', name: 'Fitness Brand A', image: DEFAULT_IMAGES.collaborations.brandA, description: 'Premium fitness equipment and gear' },
        { id: '2', name: 'Nutrition Company B', image: DEFAULT_IMAGES.collaborations.brandB, description: 'Health supplements and nutrition products' },
        { id: '3', name: 'Sports Apparel C', image: DEFAULT_IMAGES.shop.tshirt, description: 'High-quality athletic wear and accessories' },
        { id: '4', name: 'Wellness Partner D', image: DEFAULT_IMAGES.collaborations.brandA, description: 'Recovery and wellness solutions' }
      ];
      setCollaborations(defaultCollaborations);
      localStorage.setItem("collaborations", JSON.stringify(defaultCollaborations));
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
              src={DEFAULT_IMAGES.hero}
              alt="Collaborations"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-4 sm:mb-6">
              Collaborations
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              We partner with leading brands to bring you the best fitness experience
            </p>
          </div>
        </section>

        {/* Collaborations Grid */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {collaborations.map((collab) => (
                <div key={collab.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift border border-gray-200 overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                    <Image
                      src={collab.image}
                      alt={collab.name}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-gray-900 text-xl sm:text-2xl font-black uppercase tracking-wide mb-3">
                      {collab.name}
                    </h3>
                    {collab.description && (
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {collab.description}
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

