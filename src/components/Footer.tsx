/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLogoClick = () => {
    onNavigate('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="corporate-footer" className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900 items-start">
          
          {/* Logo brand and subtitle description */}
          <div className="md:col-span-5 space-y-4">
            <div 
              id="footer-logo"
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-lg transition-transform group-hover:scale-105">
                <span className="font-sans font-black text-xs text-zinc-950">Q</span>
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">Qnext</span>
                <span className="block text-[8px] uppercase tracking-widest text-zinc-500 font-mono">
                  Borderless Social Commerce
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Qnext leverages localized creative assets, smart automated warehousing channels, and cross-border payment environments to scale Direct-to-Consumer (DTC) brands in the United States and North American markets.
            </p>

            <div className="flex gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-455">
                <Globe className="w-3.5 h-3.5 text-zinc-600" />
                Singapore Headquarters
              </span>
            </div>
          </div>

          {/* Map links columns */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-semibold">NAVIGATION MAP</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs">
              <button onClick={() => onNavigate('about')} className="text-left hover:text-white transition-colors cursor-pointer">
                Corporate Profile
              </button>
              <button onClick={() => onNavigate('pillars')} className="text-left hover:text-white transition-colors cursor-pointer">
                Pillars & Culture
              </button>
              <button onClick={() => onNavigate('services')} className="text-left hover:text-white transition-colors cursor-pointer">
                Business Models
              </button>
              <button onClick={() => onNavigate('milestones')} className="text-left hover:text-white transition-colors cursor-pointer">
                Summits & Milestones
              </button>
              <button onClick={() => onNavigate('contact')} className="text-left hover:text-white transition-colors cursor-pointer">
                Contact & Partners
              </button>
            </div>
          </div>

          {/* Headquarters locations list */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-semibold">LOCATIONS HUB</h4>
            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <span className="block text-white font-bold text-[11px] uppercase tracking-wider">Singapore (HQ)</span>
                <span className="block text-[11px] text-zinc-500 font-mono leading-relaxed">
                  Qnext Pte. Ltd. &bull; 114 LAVENDER STREET #10-05 CT HUB 2 SINGAPORE 338729
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal disclosures and copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-650">
          <div>
            <span>&copy; {new Date().getFullYear()} Qnext Group. All rights reserved globally.</span>
          </div>
          <div className="flex gap-4 font-mono">
            <a href="#about" className="hover:text-white transition-colors flex items-center gap-0.5">
              Terms of Operations <ArrowUpRight className="w-3 h-3" />
            </a>
            <span>&bull;</span>
            <a href="#contact" className="hover:text-white transition-colors flex items-center gap-0.5">
              Privacy Enforced <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
