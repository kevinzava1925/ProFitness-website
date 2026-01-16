'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DEFAULT_CONTENT } from "@/config/defaultContent";

type EventItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
  date?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/content?type=events&" + new Date().getTime());
        if (response.ok) {
          const data = await response.json();
          // Only set events if they exist from dashboard, don't use defaults
          setEvents(Array.isArray(data) && data.length ? data : []);
          return;
        }
        console.error("Failed to load events from API:", response.statusText);
      } catch (error) {
        console.error("Error loading events:", error);
      }

      // Don't set default events - show empty state instead
      setEvents([]);
    };

    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-heading text-center mb-4 sm:mb-6">
              <span className="gradient-underline">Events</span>
            </h1>
            <p className="text-center text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Join us for exciting events, workshops, and special activities throughout the year.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {events.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer border border-gray-200 transition-all duration-500 hover-lift">
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
                        <button className="bg-black text-white px-6 py-2.5 font-bold text-xs sm:text-sm uppercase hover:bg-profitness-brown transition-all duration-300 rounded-lg">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No events scheduled at this time. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

