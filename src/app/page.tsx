'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

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
};

type HeroMedia = {
  url: string;
  type: 'image' | 'video';
};

export default function Home() {
  const [classes, setClasses] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<ContentItem[]>([]);
  const [shopItems, setShopItems] = useState<ContentItem[]>([]);
  const [partners, setPartners] = useState<ContentItem[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [amenities, setAmenities] = useState<ContentItem[]>([]);
  const [trainerCarouselIndex, setTrainerCarouselIndex] = useState(0);
  const [heroMedia, setHeroMedia] = useState<HeroMedia | null>(null);

  // Load content from API (Supabase) - no localStorage fallback for syncing
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Always try to load from API first (Supabase) - add cache busting to ensure fresh data
        const response = await fetch('/api/content?' + new Date().getTime());
        if (response.ok) {
          const allContent = await response.json();
          
          // Set each content type
          if (allContent.classes && Array.isArray(allContent.classes) && allContent.classes.length > 0) {
            setClasses(allContent.classes);
          }
          if (allContent.events && Array.isArray(allContent.events) && allContent.events.length > 0) {
            setEvents(allContent.events);
          }
          if (allContent.shop && Array.isArray(allContent.shop) && allContent.shop.length > 0) {
            setShopItems(allContent.shop);
          }
          if (allContent.partners && Array.isArray(allContent.partners) && allContent.partners.length > 0) {
            setPartners(allContent.partners);
          }
          if (allContent.trainers && Array.isArray(allContent.trainers) && allContent.trainers.length > 0) {
            setTrainers(allContent.trainers.slice(0, 4));
          }
          if (allContent.amenities && Array.isArray(allContent.amenities) && allContent.amenities.length > 0) {
            setAmenities(allContent.amenities);
          }
          // Hero is a single object, not an array - ALWAYS use API data if available
          if (allContent.hero && typeof allContent.hero === 'object' && allContent.hero.url) {
            setHeroMedia(allContent.hero);
          } else {
            // Only use default if API doesn't have hero data
            setHeroMedia({
              url: "https://ext.same-assets.com/443545936/3789989498.webp",
              type: "image"
            });
          }
          
          // Use defaults for missing types
          if (!allContent.classes || !Array.isArray(allContent.classes) || allContent.classes.length === 0) {
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
          
          return; // Successfully loaded from API
        } else {
          console.error('API response not OK:', response.status, response.statusText);
          // If API fails, use defaults (not localStorage)
          setHeroMedia({
            url: "https://ext.same-assets.com/443545936/3789989498.webp",
            type: "image"
          });
        }
      } catch (error) {
        console.error('Error loading from API:', error);
        // If API fails, use defaults (not localStorage)
        setHeroMedia({
          url: "https://ext.same-assets.com/443545936/3789989498.webp",
          type: "image"
        });
      }

      const loadedClasses = localStorage.getItem("classes");
      const loadedEvents = localStorage.getItem("events");
      const loadedShop = localStorage.getItem("shopItems");
      const loadedPartners = localStorage.getItem("partners");
      const loadedTrainers = localStorage.getItem("trainers");

    if (loadedClasses) setClasses(JSON.parse(loadedClasses));
    else {
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

    if (loadedEvents) setEvents(JSON.parse(loadedEvents));
    else {
      const defaultEvents = [
        { id: '1', name: 'Intro to Martial Arts for FLINTA*', image: 'https://ext.same-assets.com/443545936/832029173.jpeg', date: 'SAMSTAG & SONNTAG', description: 'Das Wochenendseminar von und für FLINTA*s zur Einführung in den Kampfsport.' },
        { id: '2', name: 'ProFitness Annual Challenge', image: 'https://ext.same-assets.com/443545936/4036118501.jpeg', date: '6.12.25', description: 'Join us for our annual fitness challenge and celebrate strength, endurance, and community at ProFitness Health Club.' },
        { id: '3', name: 'Defensive-Boxing-Wrestling-for-MMA', image: 'https://ext.same-assets.com/443545936/2651900096.jpeg', date: '13.12.25', description: 'Join and learn all about boxing and wrestling for MMA.' },
        { id: '4', name: 'Boxing Training', image: 'https://ext.same-assets.com/443545936/1760012837.jpeg', date: 'SATURDAYS', description: 'Advanced boxing training for experienced boxers. Every Saturday from 13:00 till 15:00 at ProFitness Health Club.' },
        { id: '5', name: 'Gracie Academy Berlin: Open Mat', image: 'https://ext.same-assets.com/443545936/459894971.png', date: 'SONNTAGS', description: 'Open Mat für Grappling und BJJ' },
        { id: '6', name: 'Kardia - Muay Thai Sparring', image: 'https://ext.same-assets.com/443545936/3867060023.jpeg', date: 'SONNTAGS', description: 'Fortgeschrittenes Muay Thai Sparring' }
      ];
      setEvents(defaultEvents);
    }

    if (loadedShop) setShopItems(JSON.parse(loadedShop));
    else {
      const defaultShop = [
        { id: '1', name: 'T-Shirt', image: 'https://ext.same-assets.com/443545936/2710426474.webp' },
        { id: '2', name: 'Hoodie', image: 'https://ext.same-assets.com/443545936/480816838.webp' },
        { id: '3', name: 'Cap', image: 'https://ext.same-assets.com/443545936/1859491465.webp' },
        { id: '4', name: 'Duffle Bag', image: 'https://ext.same-assets.com/443545936/3860077197.webp' }
      ];
      setShopItems(defaultShop);
    }

    if (loadedPartners) setPartners(JSON.parse(loadedPartners));
    else {
      const defaultPartners = [
        { id: '1', name: 'GEMMAF', image: 'https://ext.same-assets.com/443545936/2709833716.webp' },
        { id: '2', name: 'AMMAG', image: 'https://ext.same-assets.com/443545936/59465891.webp' }
      ];
      setPartners(defaultPartners);
    }

    if (loadedTrainers) {
      const trainersData = JSON.parse(loadedTrainers);
      setTrainers(trainersData.slice(0, 4));
    } else {
      const defaultTrainers = [
        { 
          id: '1', 
          name: 'John Smith', 
          image: 'https://ext.same-assets.com/443545936/1729744263.webp', 
          specialty: 'Strength Training',
          instagramUrl: '#',
          facebookUrl: '#'
        },
        { 
          id: '2', 
          name: 'Sarah Johnson', 
          image: 'https://ext.same-assets.com/443545936/691732246.webp', 
          specialty: 'Yoga & Flexibility',
          instagramUrl: '#',
          linkedinUrl: '#'
        },
        { 
          id: '3', 
          name: 'Mike Chen', 
          image: 'https://ext.same-assets.com/443545936/1129713061.webp', 
          specialty: 'HIIT & Cardio',
          instagramUrl: '#',
          twitterUrl: '#'
        },
        { 
          id: '4', 
          name: 'Emma Wilson', 
          image: 'https://ext.same-assets.com/443545936/1537262654.webp', 
          specialty: 'Nutrition & Wellness',
          instagramUrl: '#',
          facebookUrl: '#'
        }
      ];
      setTrainers(defaultTrainers.slice(0, 4));
    }

    const loadedAmenities = localStorage.getItem("amenities");
    if (loadedAmenities) {
      setAmenities(JSON.parse(loadedAmenities));
    } else {
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
                src={heroMedia?.url || "https://ext.same-assets.com/443545936/3789989498.webp"}
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
                Transform.
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight sm:leading-none mb-1 sm:mb-2">
                Achieve.
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight sm:leading-none">
                Excel.
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
            On over 1500 m², we offer you a comprehensive fitness experience. From strength training to cardio, yoga to high-intensity interval training – at ProFitness Health Club, you'll find everything you need to achieve your fitness goals. Whether you're just starting your fitness journey or are an experienced athlete, we have the right program for you. For your active recovery, you can also attend our yoga classes or book a relaxing massage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {classes.map((classItem) => (
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

          <div className="text-center mt-12 sm:mt-16">
            <Link href="/classes">
              <button className="bg-black text-white px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg shadow-lg">
                View All Classes
              </button>
            </Link>
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
                <p>You want to try out a free training session with us? No problem! Just come by during our regular opening hours and talk to our team at the desk.</p>

                <p>There, we'll advise you, find a suitable date together, and give you a tour of the gym.</p>

                <p>Please note that due to high demand, we can rarely offer same-day appointments. For additional useful information about your trial training, please visit our Helpcenter.</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://ext.same-assets.com/443545936/230438858.webp"
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
                src="https://ext.same-assets.com/443545936/2484507683.webp"
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
                <p>We founded the gym in 2010 and have been based at Moritzplatz ever since. Originally starting as a pure MMA gym, over time, we have evolved into a hub for various martial arts with a focus on MMA, BJJ, and Muay Thai.</p>

                <p>Seven days a week, our team and community ensure a vast array of activities through over 140 classes. Our fitness area and spacious mat areas provide opportunities for independent strength and technique training or sparring sessions with friends.</p>
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

          {/* Trainer Images Carousel - 6 Picture Panoramic Collage */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${trainerCarouselIndex * 50}%)` }}
              >
                {/* All 6 Images in a Single Row - Panoramic Style */}
                {[
                  'https://ext.same-assets.com/443545936/1729744263.webp',
                  'https://ext.same-assets.com/443545936/691732246.webp',
                  'https://ext.same-assets.com/443545936/1129713061.webp',
                  'https://ext.same-assets.com/443545936/1537262654.webp',
                  'https://ext.same-assets.com/443545936/1553179705.webp',
                  'https://ext.same-assets.com/443545936/1443978950.webp'
                ].map((imageUrl, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-[4/3] sm:aspect-[16/9] flex-shrink-0 overflow-hidden"
                    style={{ width: '50%' }}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Training Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {/* Seamless connection - no gaps between images */}
                    {index < 5 && (
                      <div className="absolute right-0 top-0 bottom-0 w-px bg-black/10 z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => setTrainerCarouselIndex((prev) => (prev === 0 ? 1 : prev - 1))}
                className="bg-black text-white p-3 rounded-full hover:bg-profitness-brown transition-all duration-300 hover-lift"
                aria-label="Previous images"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {[0, 1].map((dot) => (
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
                onClick={() => setTrainerCarouselIndex((prev) => (prev === 1 ? 0 : prev + 1))}
                className="bg-black text-white p-3 rounded-full hover:bg-profitness-brown transition-all duration-300 hover-lift"
                aria-label="Next images"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-6 sm:mb-8">
            <span className="gradient-underline">Events</span>
          </h2>

          <p className="text-center text-gray-700 text-base sm:text-lg mb-12 sm:mb-16 lg:mb-20 leading-relaxed px-2 sm:px-0">
            Seminars with local and international fitness experts or tournaments in all areas are regularly featured in our program.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {events.map((event) => (
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

          <div className="text-center">
            <Link href="/events">
              <button className="bg-black text-white px-8 py-3 font-bold text-sm uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg">
                View All Events
              </button>
            </Link>
          </div>
        </div>
      </section>

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

                <p>Visit our Helpcenter, browse through our FAQs, or let us assist you through our chat.</p>

                <p>If your questions aren't answered in our Helpcenter, send us an E-Mail.</p>

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
            {amenities.slice(0, 6).map((amenity) => (
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
