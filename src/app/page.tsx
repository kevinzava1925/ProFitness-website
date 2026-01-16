'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { DEFAULT_CONTENT } from "@/config/defaultContent";
import { DEFAULT_IMAGES } from "@/config/defaultImages";

type ContentItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
  date?: string;
  price?: string;
  benefits?: string[];
  trainer?: string;
  schedule?: string[];
  headerImage?: string;
  order?: number; // For custom ordering
};

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
  order?: number; // For custom ordering
};

type HeroMedia = {
  url: string;
  type: 'image' | 'video';
};

type ContentResponse = {
  classes?: ContentItem[];
  events?: ContentItem[];
  shop?: ContentItem[];
  partners?: ContentItem[];
  carousel?: ContentItem[];
  trainers?: Trainer[];
  amenities?: ContentItem[];
  hero?: HeroMedia;
};

export default function Home() {
  const [classes, setClasses] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<ContentItem[]>([]);
  const [shopItems, setShopItems] = useState<ContentItem[]>([]);
  const [partners, setPartners] = useState<ContentItem[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [amenities, setAmenities] = useState<ContentItem[]>([]);
  const [carouselImages, setCarouselImages] = useState<ContentItem[]>([]);
  const [trainerCarouselIndex, setTrainerCarouselIndex] = useState(0);
  const [heroMedia, setHeroMedia] = useState<HeroMedia | null>(null);

  // Helper function to sort items by order field
  const sortByOrder = (items: ContentItem[]): ContentItem[] => {
    return [...items].sort((a, b) => {
      const orderA = a.order !== undefined ? a.order : 999999;
      const orderB = b.order !== undefined ? b.order : 999999;
      if (orderA !== orderB) return orderA - orderB;
      return a.id.localeCompare(b.id);
    });
  };

  // Helper function to sort trainers by order field
  const sortTrainersByOrder = (items: Trainer[]): Trainer[] => {
    return [...items].sort((a, b) => {
      const orderA = a.order !== undefined ? a.order : 999999;
      const orderB = b.order !== undefined ? b.order : 999999;
      if (orderA !== orderB) return orderA - orderB;
      return a.id.localeCompare(b.id);
    });
  };

  // Load content from API (Supabase) - no localStorage fallback for syncing
  useEffect(() => {
    const applyContent = (allContent: ContentResponse) => {
      // Only use default content if API returns empty, not if it returns an empty array
      const sortedClasses = allContent?.classes?.length ? sortByOrder(allContent.classes) : [];
      setClasses(sortedClasses);
      // Events: Only set if they exist from dashboard, don't use defaults
      const sortedEvents = allContent?.events?.length ? sortByOrder(allContent.events) : [];
      setEvents(sortedEvents);
      setShopItems(allContent?.shop?.length ? sortByOrder(allContent.shop) : DEFAULT_CONTENT.shop);
      setPartners(allContent?.partners?.length ? sortByOrder(allContent.partners) : DEFAULT_CONTENT.partners);
      setCarouselImages(allContent?.carousel?.length ? sortByOrder(allContent.carousel) : []);
      const sortedTrainers = allContent?.trainers?.length ? sortTrainersByOrder(allContent.trainers).slice(0, 4) : DEFAULT_CONTENT.trainers;
      setTrainers(sortedTrainers);
      const sortedAmenities = allContent?.amenities?.length ? sortByOrder(allContent.amenities) : DEFAULT_CONTENT.amenities;
      setAmenities(sortedAmenities);
      setHeroMedia(
        allContent?.hero && typeof allContent.hero === "object" && allContent.hero.url
          ? allContent.hero
          : DEFAULT_CONTENT.hero
      );
    };

    const loadContent = async () => {
      try {
        const response = await fetch("/api/content?" + new Date().getTime());
        if (response.ok) {
          const allContent = await response.json();
          applyContent(allContent);
          return;
        }
        console.error("API response not OK:", response.status, response.statusText);
      } catch (error) {
        console.error("Error loading from API:", error);
      }

      applyContent({});
    };

    loadContent();
  }, []);

  useEffect(() => {
    const totalSlides = Math.max(1, Math.ceil(carouselImages.length / 2));
    if (trainerCarouselIndex >= totalSlides) {
      setTrainerCarouselIndex(0);
    }
  }, [carouselImages.length, trainerCarouselIndex]);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[75vh] sm:h-[85vh] lg:h-[90vh] flex items-center justify-start bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-4 sm:inset-6 lg:inset-8 rounded-2xl sm:rounded-3xl overflow-hidden">
            {heroMedia && heroMedia.type === 'video' ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-75"
                style={{ objectFit: 'cover' }}
              >
                <source src={heroMedia.url} type="video/mp4" />
                <source src={heroMedia.url} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={heroMedia?.url || DEFAULT_IMAGES.hero || "https://ext.same-assets.com/443545936/3789989498.webp"}
                alt="Fitness Training"
                fill
                className="object-cover opacity-75"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B6F47]/20 via-transparent to-[#A68B5F]/20" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6 sm:mb-8 animate-slide-up">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight sm:leading-none mb-1 sm:mb-2">
                Make.
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight sm:leading-none mb-1 sm:mb-2">
                It.
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight sm:leading-none">
                Happen.
              </div>
            </h1>

            <p className="text-white text-base sm:text-lg md:text-xl max-w-xl mb-6 sm:mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Join ProFitness Health Club and unlock your full potential. Our state-of-the-art facility, expert trainers, and supportive community are here to help you achieve your fitness goals.
            </p>

            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/about">
                <button className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown hover:text-white transition-all duration-300 hover-lift animate-pulse-energetic rounded-lg shadow-2xl">
                  About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Classes Section */}
      <section id="classes" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-6 sm:mb-8">
            <span className="gradient-underline">Our Classes</span>
          </h2>

          <p className="text-center text-gray-700 text-base sm:text-lg max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20 leading-relaxed px-2 sm:px-0">
            On over 1500 m², we offer you a comprehensive fitness experience. From strength training to cardio, yoga to high-intensity interval training – at ProFitness Health Club, you'll find everything you need to achieve your fitness goals. Whether you're just starting your fitness journey or are an experienced athlete, we have the right programme for you. For your active recovery, you can also attend our yoga classes or book a relaxing massage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {classes.slice(0, 3).map((classItem) => (
              <div key={classItem.id} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover-lift border border-gray-200">
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
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {classItem.description}
                    </p>
                  )}
                  <Link href={`/classes/${classItem.id}`} className="mt-4 flex items-center text-profitness-brown font-semibold text-sm uppercase group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {classes.length > 3 && (
            <div className="text-center mt-12 sm:mt-16">
              <Link href="/classes">
                <button className="bg-black text-white px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg shadow-lg">
                  View All Classes
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Technogym App Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="section-heading mb-4 sm:mb-6">
                <span className="gradient-underline">Technogym App</span>
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Book classes, track workouts, and manage your training on the go with the
                Technogym App. Your next session is just a tap away.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-3 sm:gap-4">
                <a
                  href="https://apps.apple.com/us/app/technogym-training-coach/id976506047"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg shadow-lg whitespace-nowrap"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.477 2.245-1.246 3.083-.85.923-2.224 1.64-3.43 1.56-.153-1.096.39-2.237 1.153-3.06.8-.888 2.184-1.56 3.523-1.583z" />
                    <path d="M20.248 17.23c-.54 1.246-.802 1.805-1.496 2.89-.967 1.52-2.33 3.41-4.02 3.43-1.502.02-1.89-.98-3.93-.97-2.04.01-2.468.99-3.97.98-1.69-.02-2.98-1.7-3.95-3.22-2.72-4.18-3.01-9.07-1.33-11.68 1.2-1.88 3.1-2.98 4.88-2.98 1.82 0 2.96 1 4.46 1 1.46 0 2.35-1 4.42-1 1.58 0 3.26.86 4.45 2.35-3.92 2.15-3.28 7.73.49 10.2z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.technogym.tgapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-black text-black px-5 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown hover:text-white hover:border-profitness-brown transition-all duration-300 hover-lift rounded-lg whitespace-nowrap"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M17.523 9.384l1.826-3.163a.5.5 0 10-.866-.5l-1.85 3.206a8.617 8.617 0 00-9.266 0L5.517 5.72a.5.5 0 10-.866.5l1.825 3.163A7.51 7.51 0 003 15.5V19a2 2 0 002 2h1v-4h12v4h1a2 2 0 002-2v-3.5a7.51 7.51 0 00-3.477-6.116z" />
                    <circle cx="8" cy="13" r="1" />
                    <circle cx="16" cy="13" r="1" />
                  </svg>
                  Google Play
                </a>
                <Link href="/technogym-app">
                  <button className="border border-black text-black px-5 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown hover:text-white hover:border-profitness-brown transition-all duration-300 hover-lift rounded-lg whitespace-nowrap">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-black text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black uppercase mb-3">Book Your Class</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                New to the app? Learn how to book your spot in minutes and never miss a session.
              </p>
              <Link href="/technogym-app">
                <button className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown hover:text-white transition-all duration-300 rounded-lg">
                  How It Works
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Training Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="section-heading mb-6">
                <span className="gradient-underline">Trial Training</span>
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>You want to try out training session with us? No problem! Just come by during our regular opening hours and talk to our team at the desk.</p>

                <p>There, we'll advise you and give you a tour of the gym.</p>

                <p>For additional useful information about your trial training, please visit our Helpcentre.</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={DEFAULT_IMAGES.trialTraining}
                alt="Trial Training"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-profitness-brown/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
            <div className="relative aspect-[4/3] lg:sticky lg:top-24 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={DEFAULT_IMAGES.about}
                alt="About ProFitness Health Club"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-profitness-brown/10 to-transparent" />
            </div>

            <div>
              <h2 className="section-heading mb-6">
                <span className="gradient-underline">About Us</span>
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>ProFitness Gym is where commitment meets results.
                Built on the belief that fitness is for everyone, we deliver a world-class training experience through elite equipment, expert coaching, and a community that pushes you to be your best. </p>

                <p>Every detail is designed to support your journey — so you can train with purpose, move with confidence, and unlock your full potential.</p>
              </div>

              <Link href="/about">
                <button className="bg-black text-white px-8 py-3 font-bold text-sm uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift mb-12">
                  Learn More
                </button>
              </Link>

              <div>
                <h3 className="text-xl font-bold mb-6 uppercase">Our Partners</h3>
                <div className="flex flex-wrap gap-8 items-center">
                  {partners.map((partner) => (
                    <Image
                      key={partner.id}
                      src={partner.image}
                      alt={partner.name}
                      width={150}
                      height={60}
                      className="h-12 w-auto"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Trainers Section */}
      <section id="trainers" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-6 sm:mb-8">
            <span className="gradient-underline">Our Personal Trainers</span>
          </h2>

          <p className="text-center text-gray-700 text-base sm:text-lg max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20 leading-relaxed px-2 sm:px-0">
            Meet our expert team of certified personal trainers dedicated to helping you achieve your fitness goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
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
                <div className="p-6">
                  <h3 className="text-gray-900 text-xl sm:text-2xl font-black uppercase tracking-wide mb-2">
                    {trainer.name}
                  </h3>
                  <p className="text-profitness-brown text-sm sm:text-base font-bold mb-4 uppercase">
                    {trainer.specialty}
                  </p>
                  <div className="flex gap-3">
                    {trainer.instagramUrl && (
                      <a href={trainer.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <Image
                          src="https://ext.same-assets.com/443545936/2173459103.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                        />
                      </a>
                    )}
                    {trainer.facebookUrl && (
                      <a href={trainer.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <Image
                          src="https://ext.same-assets.com/443545936/3615542385.svg"
                          alt="Facebook"
                          width={20}
                          height={20}
                        />
                      </a>
                    )}
                    {trainer.twitterUrl && (
                      <a href={trainer.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                      </a>
                    )}
                    {trainer.linkedinUrl && (
                      <a href={trainer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12 sm:mb-16">
            <Link href="/personal-trainers">
              <button className="bg-black text-white px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg shadow-lg">
                View All Trainers
              </button>
            </Link>
          </div>

          {/* Trainer Images Carousel */}
          {carouselImages.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${trainerCarouselIndex * 100}%)` }}
                >
                  {carouselImages.map((imageItem, index) => (
                    <div
                      key={imageItem.id}
                      className="relative aspect-[4/3] sm:aspect-[16/9] flex-shrink-0 overflow-hidden"
                      style={{ width: carouselImages.length > 1 ? '50%' : '100%' }}
                    >
                      <Image
                        src={imageItem.image}
                        alt={imageItem.name || `Training Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {index < carouselImages.length - 1 && (
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-black/10 z-10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
                <button
                  onClick={() => {
                    const totalSlides = Math.max(1, Math.ceil(carouselImages.length / 2));
                    setTrainerCarouselIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
                  }}
                  className="bg-black text-white p-3 rounded-full hover:bg-profitness-brown transition-all duration-300 hover-lift"
                  aria-label="Previous images"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.max(1, Math.ceil(carouselImages.length / 2)) }).map((_, dot) => (
                    <button
                      key={dot}
                      onClick={() => setTrainerCarouselIndex(dot)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        trainerCarouselIndex === dot ? 'bg-profitness-brown w-8' : 'bg-gray-400 hover:bg-gray-300 w-2.5'
                      }`}
                      aria-label={`Go to slide ${dot + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    const totalSlides = Math.max(1, Math.ceil(carouselImages.length / 2));
                    setTrainerCarouselIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
                  }}
                  className="bg-black text-white p-3 rounded-full hover:bg-profitness-brown transition-all duration-300 hover-lift"
                  aria-label="Next images"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Section - Only show if events exist from dashboard */}
      {events.length > 0 && (
      <section id="events" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-6 sm:mb-8">
            <span className="gradient-underline">Events</span>
          </h2>

          <p className="text-center text-gray-700 text-base sm:text-lg mb-12 sm:mb-16 lg:mb-20 leading-relaxed px-2 sm:px-0">
            Seminars with local and international fitness experts or tournaments in all areas are regularly featured in our programme.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer border border-gray-200 transition-all duration-500 hover-lift">
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-profitness-brown/50 transition-all duration-500" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold uppercase mb-3 text-gray-900 group-hover:text-profitness-brown transition-colors duration-300">{event.name}</h3>
                  {event.date && (
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                      <Image
                        src="https://ext.same-assets.com/443545936/1099951661.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      {event.date}
                    </p>
                  )}
                  {event.description && (
                    <p className="text-sm sm:text-base text-gray-700 mb-5 leading-relaxed">{event.description}</p>
                  )}
                  <Link href={`/events/${event.id}`}>
                    <button className="bg-black text-white px-6 py-2.5 font-bold text-xs sm:text-sm uppercase hover:bg-profitness-brown transition-all duration-300 rounded-lg">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {events.length > 3 && (
            <div className="text-center">
              <Link href="/events">
                <button className="bg-black text-white px-8 py-3 font-bold text-sm uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg">
                  View All Events
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
      )}

      {/* FAQ & Contact Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            <div>
              <h2 className="section-heading mb-6">
                <span className="gradient-underline">FAQ & Contact</span>
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                <p>Do you have questions about the gym, the classes, the trial training, or your membership?</p>

                <p>Visit our Helpcentre, browse through our FAQs, or let us assist you through our chat.</p>

                <p>If your questions aren't answered in our Helpcentre, send us an E-Mail.</p>

                <p>For business related questions, workshop or other collaborations, click on the "Collaborations" button below.</p>

                <p>We are happy to help!</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/help">
                  <button className="bg-white text-black px-6 py-3 font-bold text-sm uppercase hover:bg-profitness-brown hover:text-white transition-all duration-300 hover-lift">
                    Help Center
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="bg-white text-black px-6 py-3 font-bold text-sm uppercase hover:bg-profitness-brown hover:text-white transition-all duration-300 hover-lift">
                    Email Us
                  </button>
                </Link>
                <Link href="/collaborations">
                  <button className="bg-white text-black px-6 py-3 font-bold text-sm uppercase hover:bg-profitness-brown hover:text-white transition-all duration-300 hover-lift">
                    Collaborations
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://ext.same-assets.com/443545936/2894262091.webp"
                alt="Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-profitness-brown/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-6 sm:mb-8">
            <span className="gradient-underline">Gym Amenities</span>
          </h2>

          <p className="text-center text-gray-700 text-base sm:text-lg max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20 leading-relaxed px-2 sm:px-0">
            Experience world-class facilities designed to support your fitness journey. From state-of-the-art equipment to premium amenities, we have everything you need.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {amenities.slice(0, 3).map((amenity) => (
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

          <div className="text-center">
            <Link href="/amenities">
              <button className="bg-black text-white px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg shadow-lg">
                View All Amenities
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-6 sm:mb-8">
            <span className="gradient-underline">Shop</span>
          </h2>

          <p className="text-center text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-4 sm:mb-5 leading-relaxed px-2 sm:px-0">
            Show your ProFitness pride! In our online shop, you can find T-shirts, hoodies, caps, and more.
          </p>

          <p className="text-center text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 leading-relaxed px-2 sm:px-0">
            Need training gear? You can get those in our gym, and we're happy to assist you at the counter.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {shopItems.map((product) => (
              <div key={product.id} className="text-center bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift border border-gray-200">
                <div className="relative aspect-square mb-4 sm:mb-6 bg-gray-50 rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">{product.name}</h3>
                {product.price && (
                  <p className="text-gray-600 mb-4 sm:mb-5 font-semibold text-sm sm:text-base">{product.price}</p>
                )}
                <button className="w-full border-2 border-black px-4 sm:px-6 py-2 sm:py-2.5 font-bold text-xs sm:text-sm uppercase hover:bg-profitness-brown hover:border-profitness-brown hover:text-white transition-all duration-300 rounded-lg">
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <button className="bg-black text-white px-8 py-3 font-bold text-sm uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift">
                Visit Shop
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
