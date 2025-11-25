'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication (in production, this would be proper backend auth)
    if (email === "admin@profitness.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Image
            src="https://res.cloudinary.com/dvdogsvf6/image/upload/v1763919430/Pro_Fitness_logo_ldvjyt.png"
                alt="ProFitness"
            width={250}
            height={100}
            className="h-20 sm:h-24 md:h-28 w-auto mx-auto mb-6 brightness-0 invert"
          />
          <h1 className="text-3xl font-black text-white uppercase mb-2">Admin Login</h1>
          <p className="text-gray-400">Manage your ProFitness Health Club website</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-white"
                placeholder="admin@profitness.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-white"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white text-black py-3 font-bold uppercase hover:bg-gray-200 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-800 rounded text-sm">
            <p className="text-gray-400 mb-2">Demo Credentials:</p>
            <p className="text-white">Email: admin@profitness.com</p>
            <p className="text-white">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
