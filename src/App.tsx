/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Pillars from './components/Pillars';
import BusinessModel from './components/BusinessModel';
import Activities from './components/Activities';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll navigate helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Section Observer to highlight active link
  useEffect(() => {
    const sections = ['hero', 'about', 'pillars', 'services', 'milestones', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset tolerance trigger

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 tracking-normal selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950">
      
      {/* Sticky header navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main body elements */}
      <main className="relative">
        
        {/* Interactive Hero section */}
        <Hero 
          onLearnMore={() => handleNavigate('about')} 
          onExploreCareers={() => handleNavigate('contact')} 
        />

        {/* Company profile and dynamic numbers */}
        <About />

        {/* Pillars: Vision, Mission & Culture */}
        <Pillars />

        {/* Business areas: POD / Dropshipping / TikTok Shop US */}
        <BusinessModel />

        {/* Highlighted Summits & Milestones list */}
        <Activities />

        {/* Dynamic partners matching, Office maps and Inquiry messaging form */}
        <ContactSection />

      </main>

      {/* Corporate bottom footer */}
      <Footer onNavigate={handleNavigate} />
      
    </div>
  );
}
