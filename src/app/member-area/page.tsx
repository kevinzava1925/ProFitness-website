'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useState } from "react";

export default function MemberAreaPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in production, this would connect to a backend
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        
        <main className="pt-16 sm:pt-20">
          <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="section-heading text-center mb-4 sm:mb-6">
                <span className="gradient-underline">Member Area</span>
              </h1>
              <p className="text-center text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                Access your membership information, class bookings, and exclusive member resources.
              </p>
            </div>
          </section>

          <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase text-center">Member Login</h2>
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 font-bold uppercase hover:bg-gray-800 transition-colors"
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <a href="#" className="text-sm text-gray-600 hover:text-black">
                    Forgot your password?
                  </a>
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded text-sm text-center">
                  <p className="text-gray-600 mb-2">Not a member yet?</p>
                  <a href="/pricing" className="text-black font-semibold hover:underline">
                    View Membership Plans
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="section-heading mb-2">
                  <span className="gradient-underline">Member Dashboard</span>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base">Welcome back! Manage your membership and bookings.</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase hover:bg-gray-200 transition-colors w-full sm:w-auto"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-bold mb-2 uppercase">Membership Status</h3>
                <p className="text-xl sm:text-2xl font-black text-green-600 mb-2">Active</p>
                <p className="text-gray-600 text-xs sm:text-sm">Premium Plan</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">Renews: Next Month</p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-bold mb-2 uppercase">Upcoming Classes</h3>
                <p className="text-xl sm:text-2xl font-black mb-2">3</p>
                <p className="text-gray-600 text-xs sm:text-sm">Booked this week</p>
                <a href="/classes-schedule" className="text-black font-semibold text-xs sm:text-sm mt-2 inline-block hover:underline">
                  View Schedule →
                </a>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-bold mb-2 uppercase">Personal Training</h3>
                <p className="text-xl sm:text-2xl font-black mb-2">2</p>
                <p className="text-gray-600 text-xs sm:text-sm">Sessions remaining</p>
                <a href="/contact" className="text-black font-semibold text-xs sm:text-sm mt-2 inline-block hover:underline">
                  Book Session →
                </a>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 uppercase">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <a
                  href="/classes-schedule"
                  className="bg-black text-white px-6 py-3 font-bold text-sm uppercase hover:bg-gray-800 transition-colors text-center"
                >
                  Book Class
                </a>
                <a
                  href="/pricing"
                  className="bg-black text-white px-6 py-3 font-bold text-sm uppercase hover:bg-gray-800 transition-colors text-center"
                >
                  Manage Plan
                </a>
                <a
                  href="/shop"
                  className="bg-black text-white px-6 py-3 font-bold text-sm uppercase hover:bg-gray-800 transition-colors text-center"
                >
                  Visit Shop
                </a>
                <a
                  href="/contact"
                  className="bg-black text-white px-6 py-3 font-bold text-sm uppercase hover:bg-gray-800 transition-colors text-center"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

