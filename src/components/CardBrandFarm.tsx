"use client";

import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { BrandFarmItem, ModalData } from "@/lib/types";
import { splitBilingualName } from "@/lib/utils";

interface CardBrandFarmProps {
  item: BrandFarmItem;
  onOpenDetail: (data: ModalData) => void;
}

export const CardBrandFarm: React.FC<CardBrandFarmProps> = ({ item, onOpenDetail }) => {
  const { primary, secondary } = splitBilingualName(item.brandOrFarmName);

  const handleOpen = () => {
    onOpenDetail({
      title: primary,
      subTitle: secondary,
      region: item.region,
      prefecture: item.prefecture,
      description: `Part of the National 320+ Branded Beef Registry across Japan.\nClassification: ${item.typeNote || "Wagyu Brand / Farm"}\nRegion: ${item.region} - ${item.prefecture}`,
      badges: [
        { label: item.typeNote || "Wagyu Registry", variant: "stone" },
        ...(item.prefecture ? [{ label: item.prefecture, variant: "gold" as const }] : []),
      ],
      rawItem: item,
    });
  };

  return (
    <div 
      onClick={handleOpen}
      className="group relative flex flex-col justify-between bg-white/90 hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E0D8] hover:border-stone-400 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-[11px] font-mono font-bold text-stone-700">
            #{String(item.id || 0).padStart(3, "0")}
          </span>

          {item.typeNote && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium truncate max-w-[140px]">
              {item.typeNote}
            </span>
          )}
        </div>

        <h3 className="text-base font-serif font-bold text-sumi-900 group-hover:text-hanko-800 transition-colors leading-snug">
          {primary}
        </h3>
        {secondary && (
          <p className="text-xs text-stone-500 font-serif italic mt-0.5">
            {secondary}
          </p>
        )}

        {(item.region || item.prefecture) && (
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-2">
            <MapPin className="w-3.5 h-3.5 text-hanko-700 shrink-0" />
            <span className="truncate">
              {item.region} • {item.prefecture}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-end">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 group-hover:text-hanko-700 group-hover:translate-x-0.5 transition-all">
          View Info <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};