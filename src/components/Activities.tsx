/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MILESTONES } from '../data';
import { Award, Target, Flame, Calendar, ArrowRight, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export default function Activities() {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>('summit-2024');

  const getMilestoneIcon = (tag: string) => {
    switch (tag) {
      case 'Industry Leadership':
        return <Award className="w-5 h-5" />;
      case 'Elite Networking':
        return <Flame className="w-5 h-5" />;
      case 'Corporate Growth':
        return <Target className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getCardOverlayGradient = (tag: string) => {
    switch (tag) {
      case 'Industry Leadership':
        return 'from-sky-500/10 via-sky-500/5 to-transparent';
      case 'Elite Networking':
        return 'from-amber-500/10 via-amber-500/5 to-transparent';
      case 'Corporate Growth':
        return 'from-emerald-500/10 via-emerald-500/5 to-transparent';
      default:
        return 'from-zinc-500/10 via-zinc-500/5 to-transparent';
    }
  };

  const getBadgeColor = (tag: string) => {
    switch (tag) {
      case 'Industry Leadership':
        return 'bg-sky-50 text-sky-800 dark:bg-sky-955/20 dark:text-sky-300 border-sky-100 dark:border-sky-950/45';
      case 'Elite Networking':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-955/20 dark:text-amber-300 border-amber-100 dark:border-amber-950/45';
      case 'Corporate Growth':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-955/20 dark:text-emerald-300 border-emerald-100 dark:border-emerald-950/45';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300 border-zinc-200/50';
    }
  };

  return (
    <section id="milestones" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Head Intro */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Events &amp; Expansion</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tighter">
            Key Corporate Activities
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
            A glimpse into Qnext&apos;s active presence at exclusive summits, platform bootcamps, and team benchmarks.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="timeline-group">
          
          {/* Timeline Cards side (2/3 of space) */}
          <div className="lg:col-span-7 space-y-6">
            {MILESTONES.map((milestone) => {
              const isActive = activeMilestoneId === milestone.id;
              return (
                <div
                  key={milestone.id}
                  id={`milestone-box-${milestone.id}`}
                  onClick={() => setActiveMilestoneId(milestone.id)}
                  className={`border rounded-2xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'bg-slate-50 dark:bg-slate-900/40 border-blue-600 dark:border-blue-500 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-850 hover:bg-slate-50 hover:border-slate-350 dark:hover:bg-slate-800'
                  }`}
                >
                  {/* Subtle color flare depending on milestone type */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${getCardOverlayGradient(milestone.tag)} pointer-events-none`} />
                  )}

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{milestone.date}</span>
                      </div>
                      <span className={`text-[10px] uppercase font-bold font-mono px-2 py-1 rounded-md border ${getBadgeColor(milestone.tag)}`}>
                        {milestone.tag}
                      </span>
                    </div>

                    <div className="space-y-1.5 py-1">
                      <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {milestone.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-end">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-blue-600 flex items-center gap-1 font-semibold">
                        {isActive ? 'Currently Viewing' : 'Read Full Log'}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-350 ${isActive ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Display detail side (1/3 of space) */}
          <div className="lg:col-span-5 h-full">
            {activeMilestoneId ? (
              (() => {
                const current = MILESTONES.find(m => m.id === activeMilestoneId);
                if (!current) return null;
                return (
                  <div id="milestone-details-panel" className="bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 sm:p-8 rounded-3xl sticky top-28 space-y-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${getBadgeColor(current.tag)}`}>
                        {getMilestoneIcon(current.tag)}
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-mono text-slate-400 block">{current.date}</span>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-405 block uppercase tracking-wider mt-0.5">{current.tag}</span>
                      </div>
                    </div>

                    <h3 className="font-sans font-black text-lg sm:text-xl text-slate-905 dark:text-white leading-snug">
                      {current.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                      {current.detail}
                    </p>

                    <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-lg">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono">Qnext Impact</span>
                        <span className="block text-[11px] font-sans font-bold text-slate-800 dark:text-slate-200">
                          Strengthening North American presence.
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-slate-50 dark:bg-slate-905/20 border border-dashed border-slate-200 dark:border-slate-800 p-8 rounded-3xl text-center flex flex-col justify-center items-center text-slate-400 h-64 shadow-xs">
                <Target className="w-8 h-8 mb-2 text-blue-600" />
                <span className="text-xs font-mono uppercase font-semibold">Select a timeline log to inspect details</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
