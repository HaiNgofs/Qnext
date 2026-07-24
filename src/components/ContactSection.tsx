/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PARTNERS, OFFICES } from '../data';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, HelpCircle, ExternalLink, Trash2 } from 'lucide-react';
import { safeStorage } from '../utils';

export default function ContactSection() {
  const [partnerFilter, setPartnerFilter] = useState<'all' | 'ecommerce' | 'payment'>('all');
  
  // Contact Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Career inquiry');
  const [message, setMessage] = useState('');
  
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [storedInquiries, setStoredInquiries] = useState<any[]>([]);

  useEffect(() => {
    const saved = safeStorage.getItem('qnext_inquiries');
    if (saved) {
      try {
        setStoredInquiries(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading inquiries:', err);
      }
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);

    setTimeout(() => {
      const newInquiry = {
        id: `inq_${Date.now()}`,
        name,
        email,
        subject,
        message,
        sentAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newInquiry, ...storedInquiries];
      setStoredInquiries(updated);
      safeStorage.setItem('qnext_inquiries', JSON.stringify(updated));

      setIsSending(false);
      setSuccessMsg(true);
      
      // Clear
      setName('');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setSuccessMsg(false), 5000);
    }, 1200);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = storedInquiries.filter(i => i.id !== id);
    setStoredInquiries(updated);
    safeStorage.setItem('qnext_inquiries', JSON.stringify(updated));
  };

  const filteredPartners = partnerFilter === 'all' 
    ? PARTNERS 
    : PARTNERS.filter(p => p.category === partnerFilter);

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* FIRST SEGMENT: Partners Ecosystem (Đối tác) */}
        <div id="partners-ecosystem" className="mb-24">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Global Integrations</span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tighter">
              Our Strategic Partners &amp; Ecosystem
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-450">
              Qnext integrates directly with elite commerce environments and secure international payment gateways, ensuring bulletproof settlement scopes.
            </p>

            {/* Category filter pills */}
            <div className="flex justify-center gap-2 pt-4">
              <button
                id="btn-partner-all"
                onClick={() => setPartnerFilter('all')}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                  partnerFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-850 dark:hover:text-slate-300 border border-slate-200/50 dark:border-slate-850'
                }`}
              >
                All Integrations
              </button>
              <button
                id="btn-partner-ecommerce"
                onClick={() => setPartnerFilter('ecommerce')}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                  partnerFilter === 'ecommerce'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-850 dark:hover:text-slate-300 border border-slate-200/50 dark:border-slate-850'
                }`}
              >
                Commerce Platforms
              </button>
              <button
                id="btn-partner-payment"
                onClick={() => setPartnerFilter('payment')}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                  partnerFilter === 'payment'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-855 dark:hover:text-slate-400 border border-slate-200/50 dark:border-slate-850'
                }`}
              >
                Global Payments
              </button>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" id="partners-grid">
            {filteredPartners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-xs transition-all duration-300 relative group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-sans font-black text-xs">
                    {partner.logoText}
                  </div>
                  <h4 className="font-sans font-extrabold text-sm text-slate-900 dark:text-white group-hover:underline">
                    {partner.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {partner.role}
                </p>
                <span className="absolute top-4 right-4 text-slate-350 dark:text-slate-700 font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-blue-50/40 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-center sm:text-left">
            <div className="space-y-1 font-sans">
              <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase font-sans">
                Active Logistics &amp; Carrier Integrations
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                We cooperate with tier-1 global shipping providers (FedEx, USPS, DHL) to secure tracking logs and ensure direct shopper transit inside 3-5 days.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono font-bold text-blue-600/70 dark:text-blue-400/70">
              <span>FedEx Eco</span>
              <span>&bull;</span>
              <span>USPS Ground</span>
              <span>&bull;</span>
              <span>DHL Express</span>
            </div>
          </div>
        </div>


        {/* SECOND SEGMENT: Contact Office & Messaging Form */}
        <div id="contact-panel-flows" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-16 border-t border-slate-200 dark:border-slate-900">
          
          {/* Left Panel: Contact info & offices details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3 font-sans">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Reach Out</span>
              <h2 className="font-sans font-extrabold text-3xl text-slate-900 dark:text-white tracking-tighter">
                Establish Connections with Qnext.
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                Whether you wish to pitch supplier options, propose strategic advertising, or discuss career options, our communication officers monitor inquiries closely.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-450 font-sans">Active Locations</h4>
              {OFFICES.map((office) => (
                <div
                  key={office.country}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-sans text-slate-900 dark:text-white uppercase tracking-wider">
                      {office.name}
                    </span>
                    <span className="text-[9px] uppercase font-mono font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/40">
                      {office.country}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 font-mono">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:underline font-mono">
                        {office.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Clean form input */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 rounded-3xl shadow-sm">
            <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-6">
              Write Us an Instant Message
            </h3>

            <form onSubmit={handleSendMessage} className="space-y-5">
              
              {successMsg && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-150 dark:border-emerald-900/40 rounded-xl text-xs text-emerald-805 dark:text-emerald-400 flex items-start gap-2 animate-bounce">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-505" />
                  <div>
                    <strong className="block">Message successfully dispatched!</strong>
                    <span>Thank you for reaching out. Notification sent to <strong>contact.qnextglobal@gmail.com</strong>. Our team will get back to you shortly.</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 font-sans transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 font-sans transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Subject Scope
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 font-sans cursor-pointer transition-colors"
                >
                  <option value="Career inquiry">Career &amp; Application Screening</option>
                  <option value="Supplier offer">Supplier / Printing Partner Proposal</option>
                  <option value="Advertising optimization">Advertising / Publisher Match</option>
                  <option value="Corporate questions">Corporate Group Queries</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Message Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Draft your detailed inquiry coordinates here..."
                  rows={5}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 font-sans resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                id="submit-contact-btn"
                disabled={isSending}
                className="w-full py-3 px-6 bg-blue-650 dark:bg-blue-600 text-white font-bold uppercase text-[11px] tracking-wider rounded-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSending ? (
                  <span className="flex items-center gap-2 font-sans text-xs">
                    <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Transmitting Protocol...
                  </span>
                ) : (
                  <>
                    Send Secure Message
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>

            {/* Display local inbox queries */}
            {storedInquiries.length > 0 && (
              <div id="local-inbox-history" className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] uppercase font-mono text-slate-900 dark:text-white">Your Sent Messages ({storedInquiries.length})</span>
                  <span className="text-[9px] text-slate-400 font-mono">Stored Locally</span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
                  {storedInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-start gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono">
                          <span>{inq.subject}</span>
                          <span>&bull;</span>
                          <span>{inq.sentAt}</span>
                        </div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200">{inq.name} ({inq.email})</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-2 italic font-sans">
                          &ldquo;{inq.message}&rdquo;
                        </p>
                      </div>
                      <button
                        id={`delete-inq-btn-${inq.id}`}
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="text-slate-450 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-md transition-colors shrink-0 cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
