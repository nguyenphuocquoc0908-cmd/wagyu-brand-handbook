"use client";

import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { FarmItem, ModalData } from "@/lib/types";
import { extractLinks, splitBilingualName, truncateText } from "@/lib/utils";
import { LinkButtons } from "./LinkButtons";

interface CardFarmProps {
  item: FarmItem;
  onOpenDetail: (data: ModalData) => void;
}

export const CardFarm: React.FC<CardFarmProps> = ({ item, onOpenDetail }) => {
  const { primary, secondary } = splitBilingualName(item.farmName);
  const links = extractLinks(item.website);

  const handleOpen = () => {
    onOpenDetail({
      title: primary,
      subTitle: secondary,
      region: item.region,
      prefecture: item.prefecture,
      description: item.highlights,
      secondaryText: item.mainWagyuBrand ? `Featured Breeds & Brands:\n${item.mainWagyuBrand}` : undefined,
      address: item.address,
      links: links,
      badges: [
        { label: "Cattle Ranch (生産者・牧場)", variant: "green" },
        ...(item.region ? [{ label: item.region, variant: "stone" as const }] : []),
      ],
      rawItem: item,
    });
  };

  return (
    <div 
      onClick={handleOpen}
      className="group relative flex flex-col justify-between bg-white/90 hover:bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E0D8] hover:border-stone-400 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-matcha-700/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-bold text-emerald-800 tracking-wider">
            #{String(item.id || 0).padStart(3, "0")}
          </span>

          <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium">
            Ranch / Bokujo
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-sumi-900 group-hover:text-emerald-800 transition-colors leading-snug">
          {primary}
        </h3>
        {secondary && (
          <p className="text-xs text-stone-500 font-serif italic mt-0.5">
            {secondary}
          </p>
        )}

        {(item.region || item.prefecture) && (
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-2.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">
              {item.region} {item.region && item.prefecture ? "•" : ""} {item.prefecture}
            </span>
          </div>
        )}

        {item.highlights && (
          <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed font-sans">
            {truncateText(item.highlights, 160)}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
        <LinkButtons links={links} maxDisplay={2} />

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all shrink-0"
        >
          Details <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};