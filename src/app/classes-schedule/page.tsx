'use client';

import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { DEFAULT_CONTENT } from "@/config/defaultContent";

type ClassSchedule = {
  id: string;
  name: string;
  instructor: string;
  time: string;
  day: string;
  duration: string;
  level: string;
};

export default function ClassesSchedulePage() {
  const [schedule, setSchedule] = useState<ClassSchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('all');

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        // Fetch from API - admin dashboard saves as 'schedule'
        const response = await fetch("/api/content?type=schedule&" + new Date().getTime());
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setSchedule(data);
            return;
          }
        }
        console.error("Failed to load class schedule from API:", response.statusText);
      } catch (error) {
        console.error("Error loading class schedule:", error);
      }

      // Fallback to default content if API fails
      setSchedule(DEFAULT_CONTENT.classSchedule);
    };

    loadSchedule();
  }, []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const filteredSchedule = selectedDay === 'all' 
    ? schedule 
    : schedule.filter(cls => cls.day === selectedDay);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-heading text-center mb-4 sm:mb-6">
              <span className="gradient-underline">Class Schedule</span>
            </h1>
            <p className="text-center text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              View our weekly class schedule and book your favorite classes.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Day Filter */}
            <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedDay('all')}
                className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 font-bold text-xs sm:text-sm uppercase transition-colors ${
                  selectedDay === 'all'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-2 border-black hover:bg-gray-100'
                }`}
              >
                All Days
              </button>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 font-bold text-xs sm:text-sm uppercase transition-colors ${
                    selectedDay === day
                      ? 'bg-black text-white'
                      : 'bg-white text-black border-2 border-black hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Schedule Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase">Time</th>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase">Class</th>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase hidden md:table-cell">Instructor</th>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase hidden lg:table-cell">Duration</th>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase hidden sm:table-cell">Level</th>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedule.length > 0 ? (
                      filteredSchedule.map((cls) => (
                        <tr key={cls.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base">{cls.time}</td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                            <div className="font-bold text-sm sm:text-base">{cls.name}</div>
                            <div className="text-xs sm:text-sm text-gray-600">{cls.day}</div>
                            <div className="md:hidden text-xs text-gray-500 mt-1">{cls.instructor}</div>
                            <div className="lg:hidden md:block text-xs text-gray-500 mt-1">{cls.duration}</div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden md:table-cell text-sm sm:text-base">{cls.instructor}</td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden lg:table-cell text-sm sm:text-base">{cls.duration}</td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden sm:table-cell">
                            <span className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-800 text-xs font-semibold uppercase rounded">
                              {cls.level}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                            <Link href="/help" className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold uppercase hover:bg-gray-800 transition-colors w-full sm:w-auto inline-block text-center">
                              Book
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-600 text-sm sm:text-base">
                          No classes scheduled for this day.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-heading mb-4 sm:mb-6">
              <span className="gradient-underline">Need Help Booking?</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Contact our team for assistance with class bookings or membership questions.
            </p>
            <a
              href="/contact"
              className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase hover:bg-gray-200 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

