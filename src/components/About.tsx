/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { METRICS, OFFICES } from '../data';
import { MapPin, Globe2, Sparkles, Building2, HelpCircle, ChevronRight } from 'lucide-react';
import aboutOfficeImage from '../assets/images/about_office_1780992247265.png';

export default function About() {
  const [activeOfficeIndex, setActiveOfficeIndex] = useState(0);

  const activeOffice = OFFICES[activeOfficeIndex] || OFFICES[0];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* About Main Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Narrative text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-blue-600 dark:text-blue-400 text-xs font-mono uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              Corporate Profile
            </div>
            
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tighter leading-tight">
              A Modern Infrastructure for Cross-Border E-Commerce.
            </h2>
            
            <p className="font-sans text-slate-650 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              Founded on the belief that geography shouldn&rsquo;t restrict brand scaling, <strong className="font-bold text-slate-900 dark:text-white">Qnext</strong> is globally positioned to lead native social commerce. We design, optimize, and distribute print-on-demand assets and smart physical items directly to North American shoppers.
            </p>

            {/* Custom Description Visual Image Asset */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group relative">
              <img 
                src={aboutOfficeImage} 
                alt="Qnext SG Headquarter Operations Hub"
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-xs text-[10px] text-white px-2.5 py-1 rounded-md font-mono font-bold tracking-wider">
                Qnext Singapore HQ & Operations Hub
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider font-sans text-blue-600 dark:text-blue-400">
                Our Strategic Market Positioning
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                By mastering hyper-targeted micro-creators networks with Facebook and TikTok Ads architectures, we establish resilient seller pipelines inside the US TikTok Shop ecosystem &mdash; bypassing legacy distributor markups completely.
              </p>
              
              <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Global Reach
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Instant POD Dispatchal
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Dynamic Office Hubs Toggle and Location Visuals */}
          <div className="lg:col-span-6">
            <div id="office-selector" className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Our Strategic Offices</h3>
                  <p className="text-xs text-slate-400">Headquarters &amp; high-speed operational facilities</p>
                </div>
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>

              {/* Toggle controls - only render if multiple offices */}
              {OFFICES.length > 1 && (
                <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl mb-6 border border-slate-200/50 dark:border-slate-850">
                  {OFFICES.map((office, idx) => (
                    <button
                      key={office.country}
                      id={`btn-office-${idx}`}
                      onClick={() => setActiveOfficeIndex(idx)}
                      className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeOfficeIndex === idx
                          ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                      }`}
                    >
                      {office.country}
                    </button>
                  ))}
                </div>
              )}

              {/* Office Details Cards */}
              <div id="office-details-panel" className="space-y-6">
                <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-850 shadow-xs">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-blue-600 dark:text-blue-400 shrink-0 shadow-xs">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded uppercase border border-blue-100 dark:border-blue-900">
                        {activeOffice.city}
                      </span>
                      <h4 className="font-sans font-bold text-base text-slate-905 dark:text-white">
                        {activeOffice.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {activeOffice.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-850 shadow-xs">
                    <span className="block text-[8px] font-mono uppercase text-slate-400">Official Channel</span>
                    <a
                      href={`mailto:${activeOffice.email}`}
                      className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:underline hover:text-blue-600 dark:hover:text-blue-400 block mt-1"
                    >
                      {activeOffice.email}
                    </a>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-850 shadow-xs">
                    <span className="block text-[8px] font-mono uppercase text-slate-400">Operational Line</span>
                    <a 
                      href={`tel:${activeOffice.phone}`}
                      className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:underline hover:text-blue-600 dark:hover:text-blue-400 block mt-1"
                    >
                      {activeOffice.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Highlighted Performance Statistics - "Các con số nổi bật" */}
        <div id="scrolling-metrics-panel" className="mt-20 pt-16 border-t border-slate-200/80 dark:border-slate-900">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Performance Metrics</span>
            <h3 className="font-sans font-bold text-2xl text-slate-900 dark:text-white mt-1">
              Qnext in Hard Numbers
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Consolidated scale proving product reach and deep logistic reliability across target markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((metric) => (
              <div
                key={metric.id}
                id={`metric-card-${metric.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between hover:-translate-y-1 hover:border-blue-600/50 dark:hover:border-blue-400/55 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-blue-600 dark:text-blue-400">
                      {metric.value}
                    </span>
                    {metric.suffix && (
                      <span className="text-2xl font-bold text-blue-405 font-mono ml-0.5">
                        {metric.suffix}
                      </span>
                    )}
                  </div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    {metric.label}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed font-sans">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
