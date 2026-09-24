'use client';

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Clock, Trash2, ShieldAlert, RefreshCw } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  useEffect(() => {
    async function loadMessages() {
      if (!isSupabaseConfigured()) {
        setMessages([
          {
            id: 'demo-1',
            name: 'Sarah Jenkins',
            email: 's.jenkins@techrecruit.co.uk',
            subject: 'Data Analyst Role Inquiry',
            message: 'Hi Raj, I reviewed your Nepal Tourism & Ecotourism case studies. We are recruiting for a Data Analyst role at our Bradford office and would love to connect.',
            status: 'unread',
            created_at: new Date().toISOString(),
          },
        ]);
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setMessages(data as MessageItem[]);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  const toggleStatus = async (msg: MessageItem) => {
    const newStatus = msg.status === 'unread' ? 'read' : 'unread';
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, status: newStatus } : m))
    );

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', msg.id);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('contact_messages').delete().eq('id', id);
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return m.status === 'unread';
    if (filter === 'read') return m.status === 'read';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            VISITOR COMMUNICATIONS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Contact Messages Inbox
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Direct messages submitted by recruiters, employers, and website visitors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-slate-950 border border-slate-800 p-8 text-center text-slate-500 text-xs rounded-2xl">
              No messages found.
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  selectedMessage?.id === msg.id
                    ? 'bg-slate-900 border-blue-500'
                    : msg.status === 'unread'
                    ? 'bg-slate-950 border-blue-500/40'
                    : 'bg-slate-950 border-slate-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white flex items-center gap-1.5">
                    {msg.status === 'unread' && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                    {msg.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-blue-300 truncate">{msg.subject}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {selectedMessage.subject}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>From: <strong className="text-slate-200">{selectedMessage.name}</strong></span>
                    <span>•</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-400 font-mono hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(selectedMessage)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
                  >
                    Mark as {selectedMessage.status === 'unread' ? 'Read' : 'Unread'}
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 border border-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-900 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re:%20${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email Client
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
              Select a message from the left list to read details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
