'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

type Trainer = {
  id: string;
  name: string;
  image: string;
  specialty: string;
  bio?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
};

export default function PersonalTrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    const loadedTrainers = localStorage.getItem("trainers");
    if (loadedTrainers) {
      setTrainers(JSON.parse(loadedTrainers));
    } else {
      // Default trainers
      const defaultTrainers = [
        { 
          id: '1', 
          name: 'John Smith', 
          image: 'https://ext.same-assets.com/443545936/1729744263.webp', 
          specialty: 'Strength Training',
          bio: 'With over 10 years of experience in strength training and bodybuilding, John helps clients build muscle and achieve their fitness goals.',
          instagramUrl: '#',
          facebookUrl: '#',
          twitterUrl: '#'
        },
        { 
          id: '2', 
          name: 'Sarah Johnson', 
          image: 'https://ext.same-assets.com/443545936/691732246.webp', 
          specialty: 'Yoga & Flexibility',
          bio: 'Certified yoga instructor specializing in flexibility, mobility, and mindfulness practices for overall wellness.',
          instagramUrl: '#',
          facebookUrl: '#',
          linkedinUrl: '#'
        },
        { 
          id: '3', 
          name: 'Mike Chen', 
          image: 'https://ext.same-assets.com/443545936/1129713061.webp', 
          specialty: 'HIIT & Cardio',
          bio: 'Expert in high-intensity interval training and cardiovascular fitness, helping clients burn fat and improve endurance.',
          instagramUrl: '#',
          twitterUrl: '#',
          linkedinUrl: '#'
        },
        { 
          id: '4', 
          name: 'Emma Wilson', 
          image: 'https://ext.same-assets.com/443545936/1537262654.webp', 
          specialty: 'Nutrition & Wellness',
          bio: 'Registered dietitian and wellness coach specializing in nutrition planning and lifestyle optimization.',
          instagramUrl: '#',
          facebookUrl: '#',
          linkedinUrl: '#'
        }
      ];
      setTrainers(defaultTrainers);
      localStorage.setItem("trainers", JSON.stringify(defaultTrainers));
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
              alt="Personal Trainers"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-4 sm:mb-6">
              Our Personal Trainers
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Meet our expert team of certified personal trainers dedicated to your success
            </p>
          </div>
        </section>

        {/* Trainers Grid */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift border border-gray-200 overflow-hidden">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-gray-900 text-2xl sm:text-3xl font-black uppercase tracking-wide mb-2">
                      {trainer.name}
                    </h3>
                    <p className="text-profitness-brown text-base sm:text-lg font-bold mb-4 uppercase">
                      {trainer.specialty}
                    </p>
                    {trainer.bio && (
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                        {trainer.bio}
                      </p>
                    )}
                    <div className="flex gap-4">
                      {trainer.instagramUrl && (
                        <a href={trainer.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                          <Image
                            src="https://ext.same-assets.com/443545936/2173459103.svg"
                            alt="Instagram"
                            width={24}
                            height={24}
                          />
                        </a>
                      )}
                      {trainer.facebookUrl && (
                        <a href={trainer.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                          <Image
                            src="https://ext.same-assets.com/443545936/3615542385.svg"
                            alt="Facebook"
                            width={24}
                            height={24}
                          />
                        </a>
                      )}
                      {trainer.twitterUrl && (
                        <a href={trainer.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                          </svg>
                        </a>
                      )}
                      {trainer.linkedinUrl && (
                        <a href={trainer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
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

