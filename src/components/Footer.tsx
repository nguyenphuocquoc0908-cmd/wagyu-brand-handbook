"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 bg-washi-100 border-t border-stone-200 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <span className="font-serif font-black text-xl text-sumi-900 tracking-tight block">
              WAGYU MASTER VN
            </span>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              Comprehensive Japanese Wagyu brand directory and cattle farm registry across all 47 prefectures in Japan.
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Directly synchronized with Google Sheets cloud database.
            </p>
          </div>

          {/* Column 2: Wagyu Philosophy */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-900 font-serif">
              Wagyu Philosophy (和牛の想い)
            </h4>
            <blockquote className="text-xs italic text-stone-600 border-l-2 border-hanko-700 pl-3 py-1 font-serif leading-relaxed">
              &ldquo;Respecting the life of every cattle, nurtured with pristine mountain waters, artisanal natural feed formulas, and sustainable circular farming.&rdquo;
            </blockquote>
          </div>

          {/* Column 3: Quality & Standards */}
          <div className="space-y-2 text-xs text-stone-600">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-900 font-serif">
              Standards & Certification
            </h4>
            <p>
              Japan Meat Grading Association (JMGA) • Geographical Indication Protection System (MAFF GI Act).
            </p>
            <p className="pt-2 text-[11px] text-stone-500">
              © {new Date().getFullYear()} Wagyu Master VN. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};