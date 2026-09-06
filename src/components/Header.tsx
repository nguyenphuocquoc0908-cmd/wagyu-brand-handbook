"use client";

import React, { useState } from "react";
import { Home, Beef, Factory, Building, BookMarked, Menu, X } from "lucide-react";
import { WagyuDatasetType } from "@/lib/types";

interface HeaderProps {
  activeTab?: WagyuDatasetType;
  onSelectTab?: (tab: WagyuDatasetType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab = "BRAND", onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 5 navigation items as requested
  const navItems = [
    {
      id: "HOME",
      text: "ホーム",
      label: "Home",
      icon: <Home className="w-3.5 h-3.5" />,
      tab: null,
    },
    {
      id: "BRAND",
      text: "和牛ブランド",
      label: "Wagyu Brands",
      icon: <Beef className="w-3.5 h-3.5" />,
      tab: "BRAND" as WagyuDatasetType,
    },
    {
      id: "FARM",
      text: "生産者・牧場",
      label: "Farms & Ranches",
      icon: <Factory className="w-3.5 h-3.5" />,
      tab: "FARM" as WagyuDatasetType,
    },
    {
      id: "COMPANY",
      text: "関係機関・団体",
      label: "Organizations",
      icon: <Building className="w-3.5 h-3.5" />,
      tab: "COMPANY" as WagyuDatasetType,
    },
    {
      id: "BRAND_FARM",
      text: "全国ブランド一覧",
      label: "National Directory",
      icon: <BookMarked className="w-3.5 h-3.5" />,
      tab: "BRAND&FARM" as WagyuDatasetType,
    },
  ];

  const handleNavClick = (tab: WagyuDatasetType | null) => {
    if (tab) {
      if (onSelectTab) onSelectTab(tab);
      const target = document.getElementById("database-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-washi-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Logo area without circular stamp as requested */}
        <div 
          onClick={() => handleNavClick(null)}
          className="flex flex-col cursor-pointer group select-none py-1"
        >
          <span className="text-xl sm:text-2xl font-serif font-black text-sumi-900 tracking-tight leading-tight group-hover:text-hanko-800 transition-colors">
            WAGYU MASTER VN
          </span>
          <span className="text-xs font-semibold text-stone-600 font-sans tracking-wide mt-0.5">
            Japan&apos;s No.1 Wagyu Company
          </span>
        </div>

        {/* Desktop Vertical Menu */}
        <nav className="hidden lg:flex items-center h-full">
          {navItems.map((item) => {
            const isActive = item.tab ? activeTab === item.tab : false;

            return (
              <div
                key={item.id}
                onClick={() => handleNavClick(item.tab)}
                className={`group relative flex flex-col items-center justify-center px-4 h-full border-r border-stone-200 first:border-l transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/90 border-b-2 border-b-hanko-700 shadow-2xs"
                    : "hover:bg-stone-100/70"
                }`}
              >
                <div
                  className={`transition-colors mb-1.5 ${
                    isActive ? "text-hanko-700" : "text-stone-400 group-hover:text-hanko-700"
                  }`}
                >
                  {item.icon}
                </div>

                {/* Japanese Vertical Writing */}
                <span
                  className={`text-xs font-serif tracking-widest [writing-mode:vertical-rl] select-none py-1 transition-colors ${
                    isActive
                      ? "text-hanko-800 font-bold"
                      : "text-stone-800 group-hover:text-sumi-900 font-medium"
                  }`}
                >
                  {item.text}
                </span>

                {/* English Subtitle on Hover */}
                <span className="absolute bottom-1 text-[9px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-sans">
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-washi-50 border-b border-stone-200 px-4 pt-2 pb-5 space-y-1 animate-fade-in">
          {navItems.map((item) => {
            const isActive = item.tab ? activeTab === item.tab : false;

            return (
              <div
                key={item.id}
                onClick={() => handleNavClick(item.tab)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-serif cursor-pointer transition-colors ${
                  isActive
                    ? "bg-white text-hanko-800 font-bold shadow-2xs border border-stone-200"
                    : "hover:bg-stone-200/60 text-stone-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-hanko-700" : "text-stone-500"}>
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </div>
                <span className="text-xs text-stone-500 font-sans">{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};