'use client';

export const runtime = 'edge';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { DEFAULT_CONTENT } from "@/config/defaultContent";

type EventItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
  date?: string;
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await fetch("/api/content?type=events&" + new Date().getTime());
        if (response.ok) {
          const data = await response.json();
          const list: EventItem[] = Array.isArray(data) && data.length ? data : DEFAULT_CONTENT.events;
          const foundEvent = list.find((e) => e.id === eventId);
          if (foundEvent) {
            setEvent(foundEvent);
          }
          setLoading(false);
          return;
        }
        console.error("Failed to load events from API:", response.statusText);
      } catch (error) {
        console.error("Error loading event:", error);
      }

      const fallbackEvent = DEFAULT_CONTENT.events.find((e) => e.id === eventId) || null;
      setEvent(fallbackEvent);
      setLoading(false);
    };

    loadEvent();
  }, [eventId]);

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

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-16 sm:pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
            <Link href="/events" className="bg-black text-white px-6 py-3 font-bold uppercase hover:bg-profitness-brown transition-all duration-300 rounded-lg">
              Back to Events
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
            src={event.image}
            alt={event.name}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-4 sm:mb-6">
                {event.name}
              </h1>
              {event.date && (
                <p className="text-white text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-3">
                  <Image
                    src="https://ext.same-assets.com/443545936/1099951661.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  {event.date}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Event Content */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Description */}
            {event.description && (
              <div className="mb-12 sm:mb-16">
                <h2 className="section-heading mb-6 sm:mb-8">
                  <span className="gradient-underline">About This Event</span>
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Event Details */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-6 text-gray-900">
                Event Details
              </h3>
              <div className="space-y-4">
                {event.date && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 mr-3 mt-1">
                      <Image
                        src="https://ext.same-assets.com/443545936/1099951661.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-gray-700 font-semibold text-base sm:text-lg mb-1">Date & Time</p>
                      <p className="text-gray-600 text-base sm:text-lg">{event.date}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/contact">
                <button className="bg-black text-white px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown transition-all duration-300 hover-lift rounded-lg shadow-lg w-full sm:w-auto">
                  Book This Event
                </button>
              </Link>
              <Link href="/events">
                <button className="bg-white text-black border-2 border-black px-8 sm:px-12 py-4 sm:py-5 font-bold text-sm sm:text-base uppercase hover:bg-gray-100 transition-all duration-300 hover-lift rounded-lg w-full sm:w-auto">
                  View All Events
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

