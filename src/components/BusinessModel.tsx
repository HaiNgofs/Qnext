/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BUSINESS_AREAS } from '../data';
import { Printer, Milestone, ShoppingBag, TrendingUp, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

import businessPodImage from '../assets/images/business_pod_1780992267307.png';
import businessDropshipImage from '../assets/images/business_dropship_1780992282840.png';
import businessTiktokImage from '../assets/images/business_tiktok_1780992298464.png';
import businessMarketingImage from '../assets/images/business_marketing_1780992315528.png';

const AREA_IMAGES: Record<string, string> = {
  pod: businessPodImage,
  dropshipping: businessDropshipImage,
  'tiktok-shop': businessTiktokImage,
  'ads-marketing': businessMarketingImage,
};

export default function BusinessModel() {
  const [activeAreaId, setActiveAreaId] = useState('tiktok-shop');

  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer':
        return <Printer className="w-6 h-6" />;
      case 'Milestone':
        return <Milestone className="w-6 h-6" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <ShoppingBag className="w-6 h-6" />;
    }
  };

  const activeArea = BUSINESS_AREAS.find(area => area.id === activeAreaId) || BUSINESS_AREAS[0];

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Core Ecosystem</span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tighter">
              Our Core Business Architectures
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              We streamline cross-border value chains by fusing digital media acquisition with state-of-the-art print fabrication networks and automated US logistics channels.
            </p>
          </div>
          <div className="lg:col-span-5 text-left lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-lg text-blue-700 dark:text-blue-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-405 animate-pulse" />
              US Fulfillment Active under 72h
            </div>
          </div>
        </div>

        {/* Modular Grid with selector on the left, detailed projection on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Selector column (1/3 of space) */}
          <div id="service-selectors" className="lg:col-span-5 space-y-4">
            <span className="block text-[11px] uppercase font-mono tracking-widest text-slate-400 mb-2">Select Domain:</span>
            {BUSINESS_AREAS.map((area) => {
              const isActive = area.id === activeAreaId;
              return (
                <button
                  key={area.id}
                  id={`btn-area-${area.id}`}
                  onClick={() => setActiveAreaId(area.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md transform -translate-x-1 lg:-translate-x-2'
                      : 'bg-white dark:bg-slate-905 text-slate-850 dark:text-slate-300 border-slate-250/20 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      isActive ? 'bg-blue-505 dark:bg-blue-500 bg-opacity-30 text-white' : 'bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-100 dark:border-slate-700 shadow-xs'
                    }`}>
                      {getAreaIcon(area.iconName)}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-sm tracking-tight">
                        {area.title}
                      </h3>
                      <p className={`text-[11px] ${isActive ? 'text-blue-105' : 'text-slate-400'}`}>
                        {area.id === 'pod' ? 'Personalization engine' : area.id === 'dropshipping' ? 'Agile direct shipping' : area.id === 'tiktok-shop' ? 'Social commerce node' : 'High yield marketing'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Detailed View projection column (2/3 of space) */}
          <div id="service-projection" className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-605 dark:text-blue-400 border border-blue-100 dark:border-blue-900 rounded-2xl">
                  {getAreaIcon(activeArea.iconName)}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">In-Depth Scope</span>
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 dark:text-white mt-0.5">
                    {activeArea.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed">
                {activeArea.description}
              </p>

              {/* Dynamic Service Segment Visual Illustration */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs h-48 group relative">
                <img 
                  src={AREA_IMAGES[activeArea.id]} 
                  alt={activeArea.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-xs text-[9px] uppercase text-white px-2 py-0.5 rounded font-mono font-bold tracking-wider">
                  Operational Concept
                </div>
              </div>

              {/* Core Features list of the active Area */}
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-mono text-xs uppercase text-slate-400">Core Service Deliverables</h4>
                {activeArea.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Schematic flow / Pipeline diagram - interactive highlight */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-mono text-xs uppercase text-slate-400 mb-4 flex items-center gap-1.5">
                  <span>Operational Pipeline Flow</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
                  {activeArea.process.map((step, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 dark:bg-slate-950/60 relative rounded-2xl border border-slate-200/60 dark:border-slate-850 shadow-xs flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <span className="block font-mono text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 w-6 h-6 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <p className="text-[11px] font-sans font-bold text-slate-900 dark:text-white pt-1">
                          {step}
                        </p>
                      </div>

                      {index < activeArea.process.length - 1 && (
                        <div className="hidden sm:block absolute top-1/2 -right-2 -translate-y-1/2 z-10 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                          <ArrowRight className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
