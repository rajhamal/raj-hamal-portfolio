'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { profileData } from '@/data/profile';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate brief client submission feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      <SectionHeader
        as="h1"
        badge="Direct Communication"
        title="Get in Touch"
        subtitle="Open for graduate data analyst roles, business intelligence opportunities, applied AI projects, and professional inquiries."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Contact Information Sidebar */}
        <div className="space-y-6">
          <div className="uiverse-card-glass p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Direct Contact Details
            </h3>

            <div className="space-y-5 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block">Email</span>
                  <a href={`mailto:${profileData.email}`} className="font-mono text-xs font-semibold text-blue-700 hover:underline">
                    {profileData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block">Phone</span>
                  <a href={`tel:${profileData.phone}`} className="font-mono text-xs font-semibold text-slate-900 hover:text-blue-700">
                    {profileData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block">Location</span>
                  <span className="text-xs font-semibold text-slate-900">{profileData.location}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3">
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                Professional Networks
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  Connect on LinkedIn
                </a>
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-800" />
                  Follow on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="uiverse-card-glass p-8 sm:p-10 rounded-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. I will respond to your message at <span className="font-mono text-slate-900">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill out the form below to initiate contact directly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="uiverse-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. s.jenkins@company.co.uk"
                      className="uiverse-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject / Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Data Analyst Role / Business Intelligence Opportunity"
                    className="uiverse-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="uiverse-input resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="uiverse-btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl disabled:opacity-50"
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
