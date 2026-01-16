'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";
import { DEFAULT_IMAGES } from "@/config/defaultImages";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-heading text-center mb-4 sm:mb-6">
              <span className="gradient-underline">About Us</span>
            </h1>
            <p className="text-center text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Learn more about ProFitness Gym and our mission to help you achieve your fitness goals.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
              <div className="relative aspect-[4/3] lg:sticky lg:top-24">
                <Image
                  src={DEFAULT_IMAGES.about || "https://ext.same-assets.com/443545936/2484507683.webp"}
                  alt="About ProFitness Gym"
                  fill
                  className="object-cover grayscale rounded-lg"
                />
              </div>

              <div>
                <h2 className="section-heading mb-6">
                  <span className="gradient-underline">Our Story</span>
                </h2>

                <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  <p>
                    ProFitness Gym was founded with a simple mission: to create a welcoming, inclusive 
                    fitness community where everyone can achieve their health and wellness goals. We believe 
                    that fitness is for everyone, regardless of age, fitness level, or background.
                  </p>

                  <p>
                    Our state-of-the-art facility features top-of-the-line equipment, expert trainers, 
                    and a wide variety of classes to suit every interest and fitness level. From strength 
                    training to cardio, yoga to high-intensity interval training, we offer something for everyone.
                  </p>

                  <p>
                    What sets us apart is our commitment to our members' success. Our team of certified 
                    trainers and staff are dedicated to providing personalized attention, expert guidance, 
                    and a supportive environment that motivates you to reach your full potential.
                  </p>
                </div>

                <div className="bg-black text-white p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 uppercase">Our Mission</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    To empower individuals to lead healthier, happier lives through fitness, community, 
                    and expert guidance in a welcoming and inclusive environment.
                  </p>
                </div>

                <div className="bg-black text-white p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 uppercase">Our Values</h3>
                  <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                    <li>• Inclusivity and accessibility for all</li>
                    <li>• Excellence in training and service</li>
                    <li>• Community and support</li>
                    <li>• Continuous improvement and innovation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading text-center mb-8 sm:mb-12">
              <span className="gradient-underline">Why Choose ProFitness?</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4">1500+</div>
                <p className="text-gray-300 uppercase text-xs sm:text-sm">Square Meters</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">State-of-the-art facility</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4">50+</div>
                <p className="text-gray-300 uppercase text-xs sm:text-sm">Classes Weekly</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Something for everyone</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4">100%</div>
                <p className="text-gray-300 uppercase text-xs sm:text-sm">Dedicated</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">To your success</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

