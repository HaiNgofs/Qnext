/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeSingapore, setTimeSingapore] = useState('');
  const [timeHanoi, setTimeHanoi] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Update global times
    const updateTimes = () => {
      const now = new Date();
      
      // Singapore is UTC+8
      const sgTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      
      // Hanoi is UTC+7
      const hnTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);

      setTimeSingapore(sgTime);
      setTimeHanoi(hnTime);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'pillars', label: 'Our Pillars' },
    { id: 'services', label: 'Business Areas' },
    { id: 'careers', label: 'Careers' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'contact', label: 'Contact Office' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          id="logo-brand"
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleLinkClick('hero')}
        >
          <div className="w-9 h-9 bg-zinc-950 dark:bg-white flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105">
            <span className="font-sans font-extrabold text-lg text-white dark:text-zinc-950 tracking-tight">Q</span>
          </div>
          <div>
            <span className="font-sans font-bold text-xl tracking-tight text-zinc-950 dark:text-white transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
              Qnext
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-zinc-400 font-mono">
              Cross-border E-com
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleLinkClick(item.id)}
              className={`font-sans text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                activeSection === item.id
                  ? 'text-zinc-950 dark:text-white font-semibold'
                  : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 dark:bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Global Clocks & Action Button */}
        <div id="nav-system-status" className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 border-l border-zinc-200 dark:border-zinc-800 pl-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-zinc-400">SG HQ</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{timeSingapore || '00:00:00'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-zinc-400">HN HUB</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{timeHanoi || '00:00:00'}</span>
            </div>
          </div>
          
          <button
            id="nav-apply-btn"
            onClick={() => handleLinkClick('careers')}
            className="flex items-center gap-1 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold uppercase px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            Apply Now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Action */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl px-6 py-8 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`font-sans text-lg font-medium text-left py-2 border-b border-zinc-100 dark:border-zinc-900 ${
                  activeSection === item.id
                    ? 'text-zinc-950 dark:text-white font-bold'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between py-2 text-xs font-mono text-zinc-400">
            <div>
              <span className="block text-[8px] uppercase">Singapore HQ</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{timeSingapore || '00:00'}</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase">Hanoi hub</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{timeHanoi || '00:00'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-905 rounded text-zinc-650 dark:text-zinc-300 text-[10px]">
              <Globe className="w-3 h-3 text-zinc-400" />
              US Expansion Active
            </div>
          </div>

          <button
            id="mobile-apply-btn"
            onClick={() => handleLinkClick('careers')}
            className="w-full text-center py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold uppercase text-sm rounded-lg hover:bg-zinc-805 dark:hover:bg-zinc-100 transition-colors"
          >
            Apply for positions
          </button>
        </div>
      )}
    </header>
  );
}
