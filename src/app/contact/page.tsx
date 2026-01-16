'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DEFAULT_IMAGES } from "@/config/defaultImages";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [footerInfo, setFooterInfo] = useState({
    gymName: 'ProFitness Gym',
    address: '123 Fitness Street',
    city: 'City, State 12345',
    phone: '(123) 456-7890',
    email: 'borrowdale@pro-fitness.co.zw',
    hoursWeekday: '06 AM - 10 PM',
    hoursSaturday: '08 AM - 8 PM',
    hoursSunday: '09 AM - 6 PM',
    locationImage: '',
  });

  useEffect(() => {
    const loadFooterInfo = async () => {
      try {
        const response = await fetch(`/api/content?_=${Date.now()}`);
        if (response.ok) {
          const allContent = await response.json();
          if (allContent.footer && typeof allContent.footer === 'object' && allContent.footer !== null) {
            setFooterInfo({
              gymName: allContent.footer.gymName || footerInfo.gymName,
              address: allContent.footer.address || footerInfo.address,
              city: allContent.footer.city || footerInfo.city,
              phone: allContent.footer.phone || footerInfo.phone,
              email: allContent.footer.email || footerInfo.email,
              hoursWeekday: allContent.footer.hoursWeekday || footerInfo.hoursWeekday,
              hoursSaturday: allContent.footer.hoursSaturday || footerInfo.hoursSaturday,
              hoursSunday: allContent.footer.hoursSunday || footerInfo.hoursSunday,
              locationImage: allContent.footer.locationImage || footerInfo.locationImage,
            });
          }
        }
      } catch (error) {
        console.error('Error loading footer info:', error);
      }
    };

    loadFooterInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send message");
      }

      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error("Contact form error:", error);
      alert('Sorry, there was a problem sending your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-heading text-center mb-4 sm:mb-6">
              <span className="gradient-underline">Contact Us</span>
            </h1>
            <p className="text-center text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Get in touch with us. We're here to help with any questions about memberships, classes, or our facilities.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {/* Contact Form */}
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="classes">Class Information</option>
                      <option value="training">Personal Training</option>
                      <option value="events">Events</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white py-3 font-bold uppercase hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase">Get in Touch</h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="font-bold uppercase mb-2 text-sm">Address</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {footerInfo.gymName}<br />
                        {footerInfo.address}<br />
                        {footerInfo.city}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold uppercase mb-2 text-sm">Phone</h3>
                      <p className="text-gray-700">
                        <a
                          href={`tel:${footerInfo.phone.replace(/\s+/g, '')}`}
                          className="hover:text-black"
                        >
                          {footerInfo.phone}
                        </a>
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold uppercase mb-2 text-sm">Email</h3>
                      <p className="text-gray-700">
                        <a href={`mailto:${footerInfo.email}`} className="hover:text-black">
                          {footerInfo.email}
                        </a>
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold uppercase mb-2 text-sm">Opening Hours</h3>
                      <div className="text-gray-700 space-y-1 text-sm">
                        <p>Monday - Friday: {footerInfo.hoursWeekday}</p>
                        <p>Saturday: {footerInfo.hoursSaturday}</p>
                        <p>Sunday: {footerInfo.hoursSunday}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={footerInfo.locationImage || DEFAULT_IMAGES.location || "https://ext.same-assets.com/443545936/2894262091.webp"}
                    alt="Location Map"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

