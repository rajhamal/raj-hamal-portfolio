'use client';

import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2 } from 'lucide-react';
import { getProfileData } from '@/lib/data-service';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminSiteSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    title: '',
    tagline: '',
    domain: '',
    location: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    githubUrl: '',
    bio: '',
  });

  useEffect(() => {
    async function loadProfile() {
      const data = await getProfileData();
      setFormData({
        fullName: data.fullName,
        displayName: data.displayName,
        title: data.title,
        tagline: data.tagline,
        domain: data.domain,
        location: data.location,
        email: data.email,
        phone: data.phone,
        linkedinUrl: data.linkedinUrl,
        githubUrl: data.githubUrl,
        bio: data.bio,
      });
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!isSupabaseConfigured()) {
      setMessage('Demo Mode: Settings updated transiently. Add Supabase env variables to persist to database.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: '00000000-0000-0000-0000-000000000001',
          full_name: formData.fullName,
          display_name: formData.displayName,
          professional_title: formData.title,
          tagline: formData.tagline,
          domain: formData.domain,
          location: formData.location,
          email: formData.email,
          phone: formData.phone,
          linkedin_url: formData.linkedinUrl,
          github_url: formData.githubUrl,
          short_bio: formData.bio,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Site settings updated successfully!');
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
          GLOBAL REGISTRY
        </span>
        <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
          Site Settings & Identity
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your name, professional title, contact details, social links, and domain profile.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-300 text-xs font-semibold">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Headline / Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Homepage Hero Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Bio</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
          ></textarea>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
