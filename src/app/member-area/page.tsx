'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { saveAuth, clearAuth, getUser, isAuthenticated, authenticatedFetch, type User } from "@/utils/auth";

export default function MemberAreaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = getUser();
      if (storedUser && isAuthenticated()) {
        // Verify token is still valid by fetching user data
        const response = await authenticatedFetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token invalid, clear auth
          clearAuth();
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Save auth data
      saveAuth(data.token, data.user);
      setUser(data.user);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      // Save auth data
      saveAuth(data.token, data.user);
      setUser(data.user);
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
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
                {isRegisterMode 
                  ? "Create your account to access membership information, class bookings, and exclusive member resources."
                  : "Access your membership information, class bookings, and exclusive member resources."}
              </p>
            </div>
          </section>

          <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase text-center">
                  {isRegisterMode ? "Create Account" : "Member Login"}
                </h2>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4 sm:space-y-6">
                  {isRegisterMode && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                        placeholder="John Doe"
                      />
                    </div>
                  )}

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
                      minLength={isRegisterMode ? 6 : undefined}
                    />
                    {isRegisterMode && (
                      <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-3 font-bold uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Please wait..." : (isRegisterMode ? "Create Account" : "Sign In")}
                  </button>
                </form>

                {!isRegisterMode && (
                  <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-gray-600 hover:text-black">
                      Forgot your password?
                    </a>
                  </div>
                )}

                <div className="mt-6 p-4 bg-gray-100 rounded text-sm text-center">
                  <p className="text-gray-600 mb-2">
                    {isRegisterMode ? "Already have an account?" : "Not a member yet?"}
                  </p>
                  {isRegisterMode ? (
                    <button
                      onClick={toggleMode}
                      className="text-black font-semibold hover:underline"
                    >
                      Sign in instead
                    </button>
                  ) : (
                    <>
                      <a 
                        href="/register" 
                        className="text-black font-semibold hover:underline"
                      >
                        Create an account
                      </a>
                      <span className="mx-2 text-gray-400">or</span>
                      <a href="/pricing" className="text-black font-semibold hover:underline">
                        View Membership Plans
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  // User is logged in - show dashboard
  const getMembershipColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600';
      case 'Inactive':
        return 'text-yellow-600';
      case 'Expired':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

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
                <p className="text-gray-300 text-sm sm:text-base">
                  Welcome back{user.name ? `, ${user.name}` : ''}! Manage your membership and bookings.
                </p>
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
                <p className={`text-xl sm:text-2xl font-black mb-2 ${getMembershipColor(user.membershipStatus)}`}>
                  {user.membershipStatus}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">{user.membershipType} Plan</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-bold mb-2 uppercase">Upcoming Classes</h3>
                <p className="text-xl sm:text-2xl font-black mb-2">{user.upcomingClasses || 0}</p>
                <p className="text-gray-600 text-xs sm:text-sm">Booked classes</p>
                <a href="/classes-schedule" className="text-black font-semibold text-xs sm:text-sm mt-2 inline-block hover:underline">
                  View Schedule →
                </a>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-bold mb-2 uppercase">Personal Training</h3>
                <p className="text-xl sm:text-2xl font-black mb-2">{user.personalTrainingSessions || 0}</p>
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
