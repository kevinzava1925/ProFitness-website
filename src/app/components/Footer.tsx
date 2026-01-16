'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type FooterData = {
  gymName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  locationImage?: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  copyright: string;
};

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load from API (Supabase) - try fetching all content first to get footer as object
        const response = await fetch(`/api/content?_=${Date.now()}`);
        if (response.ok) {
          const allContent = await response.json();
          // Footer is returned as a single object when fetching all content
          if (allContent.footer && typeof allContent.footer === 'object' && allContent.footer !== null) {
            setFooterData(allContent.footer);
            return; // Successfully loaded from API
          }
        }
        
        // Fallback to defaults if API fails or has no data
        const defaultFooter: FooterData = {
          gymName: 'ProFitness Gym',
          address: '123 Fitness Street',
          city: 'City, State 12345',
          phone: '(123) 456-7890',
          email: 'borrowdale@pro-fitness.co.zw',
          hoursWeekday: '06 AM - 10 PM',
          hoursSaturday: '08 AM - 8 PM',
          hoursSunday: '09 AM - 6 PM',
          locationImage: '',
          instagramUrl: '#',
          facebookUrl: '#',
          youtubeUrl: '#',
          tiktokUrl: '#',
          copyright: 'Copyright ProFitness Gym 2025'
        };
        setFooterData(defaultFooter);
      } catch (error) {
        console.error('Error loading footer:', error);
        // Use defaults on error
        const defaultFooter: FooterData = {
          gymName: 'ProFitness Gym',
          address: '123 Fitness Street',
          city: 'City, State 12345',
          phone: '(123) 456-7890',
          email: 'borrowdale@pro-fitness.co.zw',
          hoursWeekday: '06 AM - 10 PM',
          hoursSaturday: '08 AM - 8 PM',
          hoursSunday: '09 AM - 6 PM',
          locationImage: '',
          instagramUrl: '#',
          facebookUrl: '#',
          youtubeUrl: '#',
          tiktokUrl: '#',
          copyright: 'Copyright ProFitness Gym 2025'
        };
        setFooterData(defaultFooter);
      }
    };

    loadContent();
  }, []);

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-black text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          <div>
            <h3 className="font-bold uppercase mb-3 sm:mb-4 text-xs sm:text-sm">Address</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              {footerData.gymName}<br />
              {footerData.address}<br />
              {footerData.city}
            </p>
          </div>

          <div>
            <h3 className="font-bold uppercase mb-3 sm:mb-4 text-xs sm:text-sm">Opening Hours:*</h3>
            <div className="text-gray-400 text-xs sm:text-sm space-y-1">
              <p>Mo-Fr<span className="ml-2 sm:ml-4">{footerData.hoursWeekday}</span></p>
              <p>Saturday<span className="ml-2 sm:ml-4">{footerData.hoursSaturday}</span></p>
              <p>Sunday<span className="ml-2 sm:ml-4">{footerData.hoursSunday}</span></p>
            </div>
            <p className="text-xs text-gray-500 mt-3 sm:mt-4">* Opening hours can vary due to holidays or events</p>
          </div>

          <div>
            <h3 className="font-bold uppercase mb-3 sm:mb-4 text-xs sm:text-sm">Follow Us:</h3>
            <div className="flex gap-3 sm:gap-4">
              {footerData.instagramUrl && footerData.instagramUrl !== '#' && (
                <a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/443545936/2173459103.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </a>
              )}
              {footerData.facebookUrl && footerData.facebookUrl !== '#' && (
                <a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/443545936/3615542385.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </a>
              )}
              {footerData.youtubeUrl && footerData.youtubeUrl !== '#' && (
                <a href={footerData.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/443545936/1912028684.svg"
                    alt="YouTube"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </a>
              )}
              {footerData.tiktokUrl && footerData.tiktokUrl !== '#' && (
                <a href={footerData.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <Image
              src="https://res.cloudinary.com/dvdogsvf6/image/upload/v1763919430/Pro_Fitness_logo_ldvjyt.png"
              alt="ProFitness"
              width={200}
              height={80}
              className="h-16 sm:h-20 md:h-24 w-auto mb-6 brightness-0 invert"
            />
          </div>
        </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center text-xs sm:text-sm mb-4 sm:mb-6">
            <Link href="/help" className="text-gray-400 hover:text-white transition-colors uppercase">Help</Link>
            <Link href="/classes-schedule" className="text-gray-400 hover:text-white transition-colors uppercase">Classes</Link>
            <Link href="/events" className="text-gray-400 hover:text-white transition-colors uppercase">Events</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors uppercase">Pricing</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors uppercase">About Us</Link>
            <Link href="/amenities" className="text-gray-400 hover:text-white transition-colors uppercase">Amenities</Link>
            <Link href="/shop" className="text-gray-400 hover:text-white transition-colors uppercase">Shop</Link>
          </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center text-xs sm:text-sm mb-4 sm:mb-6">
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>

            <p className="text-center text-gray-500 text-xs px-2">
              {footerData.copyright}
            </p>

        </div>
      </div>
    </footer>
  );
}

