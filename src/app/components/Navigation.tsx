'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dvdogsvf6/image/upload/v1763919430/Pro_Fitness_logo_ldvjyt.png"
              alt="ProFitness"
              width={200}
              height={80}
              className="h-12 sm:h-16 md:h-20 w-auto brightness-0 invert"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 text-xs lg:text-sm font-bold">
            <Link href="/help" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Help</Link>
            <Link href="/classes-schedule" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Classes</Link>
            <Link href="/events" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Events</Link>
            <Link href="/pricing" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Pricing</Link>
            <Link href="/about" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">About Us</Link>
            <Link href="/amenities" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Amenities</Link>
            <Link href="/shop" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Shop</Link>
            <Link href="/register" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Register</Link>
            <Link href="/member-area" className="text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase">Member Area</Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/help" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Help</Link>
            <Link href="/classes-schedule" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Classes</Link>
            <Link href="/events" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Events</Link>
            <Link href="/pricing" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/about" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/amenities" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Amenities</Link>
            <Link href="/shop" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link href="/register" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Register</Link>
            <Link href="/member-area" className="block text-white hover:text-[#A68B5F] transition-colors duration-300 uppercase py-2 text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>Member Area</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

