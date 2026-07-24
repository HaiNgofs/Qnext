/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowDown, Flame, DollarSign, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
interface HeroProps {
  onLearnMore: () => void;
  onExploreCareers: () => void;
}

export default function Hero({ onLearnMore, onExploreCareers }: HeroProps) {
  // Mini campaign scenario simulation variables
  const [productCost, setProductCost] = useState(6.50);
  const [sellingPrice, setSellingPrice] = useState(24.99);
  const [adSpend, setAdSpend] = useState(8.00);
  const [shippingCost, setShippingCost] = useState(4.50);
  
  // Formulas
  const tiktokShopFee = parseFloat((sellingPrice * 0.08).toFixed(2)); // TikTok standard US fee
  const revenue = sellingPrice;
  const totalCost = parseFloat((productCost + adSpend + shippingCost + tiktokShopFee).toFixed(2));
  const netProfit = parseFloat((revenue - totalCost).toFixed(2));
  const marginPercentage = ((netProfit / revenue) * 100).toFixed(0);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background soft modern layout details */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-100/30 dark:bg-blue-950/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-150/20 dark:bg-indigo-950/5 rounded-full blur-[100px]" />
        {/* Fine grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            Empowering US Social Commerce from Asia
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-slate-900 dark:text-white leading-[1.05] max-w-xl">
            Designing the Next Era of Borderless <span className="text-blue-600 dark:text-blue-400 font-black">E-Commerce.</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
            Qnext is a high-velocity cross-border commerce enterprise. Operating from our Singapore headquarters and Hanoi operational hub, we scale Print-on-Demand and Dropshipping direct to millions of US consumers via Facebook Ads, TikTok Ads, and TikTok Shop.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md">
            <button
              id="hero-explore-btn"
              onClick={onExploreCareers}
              className="flex-1 text-center py-4 px-6 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white font-bold uppercase text-xs tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 cursor-pointer"
            >
              Contact Us
            </button>
            <button
              id="hero-learn-btn"
              onClick={onLearnMore}
              className="flex-1 text-center py-4 px-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
            >
              Our Business Areas
            </button>
          </div>

          {/* Core Highlights styled as bento stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 max-w-lg">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
              <span className="block text-xl font-bold font-sans text-blue-600 dark:text-blue-400">US Market</span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-mono">Tuned Focus</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
              <span className="block text-xl font-bold font-sans text-slate-905 dark:text-slate-100">HQ SG</span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-mono">Singapore Pte</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
              <span className="block text-xl font-bold font-sans text-teal-605 dark:text-teal-400 font-black">Active</span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-mono">Expansion Hub</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive E-commerce Economics interactive card */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative">
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 px-2 py-1 rounded text-[10px] font-bold font-mono border border-blue-100 dark:border-blue-950">
              <Sparkles className="w-3 h-3" />
              Interactive Model
            </div>

            <div className="mb-6">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Cross-Border Economy Calculator
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                Drag settings to simulate order margins driving our POD & Dropshipping US store architectures:
              </p>
            </div>

            <div className="space-y-4">
              {/* Selling Price */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">US Selling Price (Retail)</span>
                  <span className="text-blue-600 dark:text-blue-450 font-mono font-bold">${sellingPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="0.5"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 dark:accent-blue-400 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Product Sourcing Cost */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">POD/Dropshipping Product Cost</span>
                  <span className="text-slate-900 dark:text-white font-mono font-semibold">${productCost.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="0.5"
                  value={productCost}
                  onChange={(e) => setProductCost(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 dark:accent-blue-400 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Shipping Weight and Logistics */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">International Express Shipping</span>
                  <span className="text-slate-900 dark:text-white font-mono font-semibold">${shippingCost.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.25"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 dark:accent-blue-400 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Ad Spend Acq */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Meta/TikTok Ad Acquisition Cost (CAC)</span>
                  <span className="text-slate-900 dark:text-white font-mono font-semibold">${adSpend.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="25"
                  step="0.50"
                  value={adSpend}
                  onChange={(e) => setAdSpend(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 dark:accent-blue-400 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Calculations and outcome panel */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl">
              <div className="flex justify-between text-xs text-slate-550 font-mono">
                <span>Revenue:</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">${revenue.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-xs text-slate-550 font-mono">
                <span>Sum Costs (Product+CAC+Shipping):</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">${(productCost + adSpend + shippingCost).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-slate-550 font-mono border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span>TikTok Shop platform Fee (8%):</span>
                <span className="text-slate-850 dark:text-slate-200 font-semibold">${tiktokShopFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <div>
                  <span className="block text-xs font-bold text-slate-900 dark:text-slate-100 uppercase">Est. NET Profit</span>
                  <span className="text-[10px] text-slate-400 font-mono">Per Individual Order</span>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-black font-mono ${netProfit >= 5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                    ${netProfit.toFixed(2)}
                  </span>
                  <span className={`block text-xs font-bold font-mono ${netProfit >= 5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                    {marginPercentage}% Net Margin
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live order notifications element */}
            <div className="mt-4 flex items-center gap-3 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-950/50 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-300 font-sans shadow-xs">
              <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>
                <strong>High Margin Model:</strong> Over 150,000 satisfied buyers prove this scaling metric cycle. Excellent for Qnext performance teams!
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors" onClick={onLearnMore}>
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Discover</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
