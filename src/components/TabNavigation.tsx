"use client";

import React from "react";
import { WagyuDatasetType } from "@/lib/types";
import { Beef, Home, Building, BookMarked } from "lucide-react";

interface TabNavigationProps {
  activeTab: WagyuDatasetType;
  onChangeTab: (tab: WagyuDatasetType) => void;
  counts?: Partial<Record<WagyuDatasetType, number>>;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChangeTab, counts }) => {
  const tabs: { key: WagyuDatasetType; label: string; subLabel: string; icon: React.ReactNode }[] = [
    {
      key: "BRAND",
      label: "Wagyu Brands",
      subLabel: "和牛ブランド",
      icon: <Beef className="w-4 h-4" />,
    },
    {
      key: "FARM",
      label: "Farms & Ranches",
      subLabel: "生産者・牧場",
      icon: <Home className="w-4 h-4" />,
    },
    {
      key: "COMPANY",
      label: "Organizations",
      subLabel: "関係機関・団体",
      icon: <Building className="w-4 h-4" />,
    },
    {
      key: "BRAND&FARM",
      label: "National Directory",
      subLabel: "全国ブランド一覧",
      icon: <BookMarked className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = counts?.[tab.key];

          return (
            <button
              key={tab.key}
              onClick={() => onChangeTab(tab.key)}
              className={`group relative flex items-center gap-3 px-5 py-3.5 rounded-t-xl transition-all whitespace-nowrap text-left ${
                isActive
                  ? "bg-white text-sumi-900 shadow-subtle border-t-2 border-hanko-700 font-semibold"
                  : "text-stone-600 hover:text-sumi-900 hover:bg-white/50"
              }`}
            >
              <div className={`p-1.5 rounded-md ${isActive ? "text-hanko-700 bg-red-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                {tab.icon}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{tab.label}</span>
                  {typeof count === "number" && (
                    <span className={`text-xs px-2 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-700"
                    }`}>
                      {count}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-500 font-serif block">
                  {tab.subLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};