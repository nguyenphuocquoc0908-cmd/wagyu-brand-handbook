"use client";

import React from "react";
import { Filter } from "lucide-react";

interface RegionFilterProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  availableRegions: string[];
}

export const RegionFilter: React.FC<RegionFilterProps> = ({
  selectedRegion,
  onSelectRegion,
}) => {
  const regions = [
    { key: "ALL", label: "All Regions", jp: "全国" },
    { key: "Hokkaido", label: "Hokkaidō", jp: "北海道" },
    { key: "Tohoku", label: "Tōhoku", jp: "東北" },
    { key: "Kanto", label: "Kantō", jp: "関東" },
    { key: "Chubu", label: "Chūbu", jp: "中部" },
    { key: "Kansai", label: "Kansai / Kinki", jp: "関西" },
    { key: "Chugoku", label: "Chūgoku", jp: "中国" },
    { key: "Shikoku", label: "Shikoku", jp: "四国" },
    { key: "Kyushu", label: "Kyūshū・Okinawa", jp: "九州" },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
      <div className="flex items-center gap-1 text-xs text-stone-600 font-serif pl-1 pr-2 shrink-0">
        <Filter className="w-3.5 h-3.5 text-hanko-700" />
        <span>Region:</span>
      </div>

      {regions.map((r) => {
        const isSelected = selectedRegion.toLowerCase() === r.key.toLowerCase();

        return (
          <button
            key={r.key}
            onClick={() => onSelectRegion(r.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap border ${
              isSelected
                ? "bg-sumi-900 text-white border-sumi-900 shadow-2xs font-medium"
                : "bg-white/80 hover:bg-white text-stone-700 border-stone-200/90 hover:border-stone-400"
            }`}
          >
            <span>{r.label}</span>
            <span className={`text-[10px] font-serif ${isSelected ? "text-stone-300" : "text-stone-500"}`}>
              {r.jp}
            </span>
          </button>
        );
      })}
    </div>
  );
};