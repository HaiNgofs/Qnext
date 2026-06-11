/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PILLARS } from '../data';
import { Target, Heart, Compass, CheckCircle } from 'lucide-react';

export default function Pillars() {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'culture'>('vision');

  const getIcon = (type: string) => {
    switch (type) {
      case 'vision':
        return <Compass className="w-10 h-10 text-zinc-900 dark:text-white" />;
      case 'mission':
        return <Target className="w-10 h-10 text-zinc-900 dark:text-white" />;
      case 'culture':
        return <Heart className="w-10 h-10 text-zinc-900 dark:text-white" />;
      default:
        return <Compass className="w-10 h-10 text-zinc-900 dark:text-white" />;
    }
  };

  const tabs = [
    { key: 'vision', label: 'Our Vision', icon: <Compass className="w-4 h-4" /> },
    { key: 'mission', label: 'Our Mission', icon: <Target className="w-4 h-4" /> },
    { key: 'culture', label: 'Our Culture', icon: <Heart className="w-4 h-4" /> },
  ] as const;

  return (
    <section id="pillars" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header content */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Core Foundations</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tighter">
            Our Purpose &amp; Core Values
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            How we think, operate, and build relationships across border lines to conquer global objectives.
          </p>
        </div>

        {/* Tab triggers */}
        <div id="pillars-toggles" className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                id={`tab-pillar-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab display card */}
        <div id="pillar-content-card" className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-lg transition-all duration-300 max-w-4xl mx-auto relative overflow-hidden">
          {/* Subtle background graphic */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white dark:bg-slate-950/40 rounded-bl-full flex items-center justify-center pointer-events-none opacity-40">
            {getIcon(activeTab)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left part: large icon and tagline text */}
            <div className="md:col-span-5 space-y-4">
              <div className="inline-flex p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl">
                {getIcon(activeTab)}
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Pillar Segment</span>
                <h3 className="font-sans font-black text-2xl text-slate-900 dark:text-white mt-1">
                  {PILLARS[activeTab].title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-mono text-xs mt-1 font-semibold">
                  {PILLARS[activeTab].tagline}
                </p>
              </div>
            </div>

            {/* Right part: Description narrative and lists */}
            <div className="md:col-span-7 space-y-6">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm font-sans">
                {PILLARS[activeTab].description}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-850">
                <span className="block text-xs font-mono uppercase text-slate-400 mb-1">Strategic Framework</span>
                {PILLARS[activeTab].bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-450 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Elegant structural graphic in footer of pillars to transition nicely */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-405 italic font-mono">
            &ldquo;We treat our company as a product, constantly updating and refining our cultural kernel.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
