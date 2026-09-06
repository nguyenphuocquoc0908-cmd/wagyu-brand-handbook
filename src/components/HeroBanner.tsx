"use client";

import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      {/* Banner Container */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-300 bg-washi-100">
        {/* Wagyu Master Bull with Golden Moon */}
        <Image
          src="/images/wagyu-master-hero.jpg"
          alt="Wagyu Master Vietnam - 和の達人"
          fill
          priority
          className="object-cover object-center sm:object-right-center"
        />

        {/* Subtle Gradient Overlay for enhanced legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent sm:bg-gradient-to-r sm:from-black/80 sm:via-black/35 sm:to-transparent" />

        {/* Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12 z-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-serif tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-hanko-600 animate-pulse" />
            WAGYU MASTER VIETNAM • 和の達人
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-lg">
            Explore 360+ Prestigious Wagyu Brands & Ranches in Japan
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-stone-200 mt-2.5 max-w-xl font-sans drop-shadow leading-relaxed">
            Trace origins, official JMGA meat grading standards (A4, A5, BMS 6-12), breeding practices, and brand cattle distribution across Japan.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 pt-4 border-t border-white/20 text-white">
            <div>
              <span className="text-lg sm:text-2xl font-serif font-bold text-amber-300">363+</span>
              <span className="text-[11px] sm:text-xs text-stone-300 block font-sans">Wagyu Brands</span>
            </div>
            <div className="w-px h-7 bg-white/25" />
            <div>
              <span className="text-lg sm:text-2xl font-serif font-bold text-amber-300">149+</span>
              <span className="text-[11px] sm:text-xs text-stone-300 block font-sans">Certified Ranches</span>
            </div>
            <div className="w-px h-7 bg-white/25" />
            <div>
              <span className="text-lg sm:text-2xl font-serif font-bold text-amber-300">47</span>
              <span className="text-[11px] sm:text-xs text-stone-300 block font-sans">Prefectures Nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};