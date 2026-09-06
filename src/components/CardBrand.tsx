"use client";

import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { BrandItem, ModalData } from "@/lib/types";
import { extractLinks, splitBilingualName, truncateText } from "@/lib/utils";
import { LinkButtons } from "./LinkButtons";

interface CardBrandProps {
  item: BrandItem;
  onOpenDetail: (data: ModalData) => void;
}

export const CardBrand: React.FC<CardBrandProps> = ({ item, onOpenDetail }) => {
  const { primary, secondary } = splitBilingualName(item.brandName);
  const links = extractLinks(item.website);

  // STT color rule from Google Sheet:
  // Green font (STT 1-313) = Wagyu Brand
  // Red font (STT 314+) = F1 Brand
  const numId = Number(item.id);
  const isF1 = !isNaN(numId) && numId >= 314;

  const handleOpen = () => {
    onOpenDetail({
      title: primary,
      subTitle: secondary,
      region: item.region,
      prefecture: item.prefecture,
      description: item.description,
      links: links,
      badges: [
        {
          label: isF1 ? "F1 Brand (交雑ブランド)" : "Wagyu Brand (和牛ブランド)",
          variant: isF1 ? "red" : "green",
        },
        ...(item.prefecture ? [{ label: item.prefecture, variant: "stone" as const }] : []),
      ],
      rawItem: item,
    });
  };

  return (
    <div 
      onClick={handleOpen}
      className="group relative flex flex-col justify-between bg-white/90 hover:bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E0D8] hover:border-stone-400 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Accent Line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 transition-opacity opacity-0 group-hover:opacity-100 ${
          isF1 ? "bg-red-600" : "bg-emerald-600"
        }`} 
      />

      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Ear Tag badge style matching the STT color rule */}
          <span 
            className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-mono font-bold tracking-wider ${
              isF1 
                ? "bg-red-50 text-red-700 border-red-300"
                : "bg-emerald-50 text-emerald-800 border-emerald-300"
            }`}
          >
            #{String(item.id).padStart(3, "0")}
          </span>

          {/* F1 Brand vs Wagyu Brand based on STT color */}
          {isF1 ? (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-300 font-semibold">
              F1 Brand
            </span>
          ) : (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold">
              Wagyu Brand
            </span>
          )}
        </div>

        {/* Brand Name */}
        <h3 className="text-xl font-serif font-bold text-sumi-900 group-hover:text-hanko-800 transition-colors leading-snug">
          {primary}
        </h3>
        {secondary && (
          <p className="text-xs text-stone-500 font-serif italic mt-0.5">
            {secondary}
          </p>
        )}

        {/* Location */}
        {(item.region || item.prefecture) && (
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-2.5">
            <MapPin className="w-3.5 h-3.5 text-hanko-700 shrink-0" />
            <span className="truncate">
              {item.region} {item.region && item.prefecture ? "•" : ""} {item.prefecture}
            </span>
          </div>
        )}

        {/* Description Snippet */}
        {item.description && (
          <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed font-sans">
            {truncateText(item.description, 160)}
          </p>
        )}
      </div>

      {/* Footer / Links & Action */}
      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
        <LinkButtons links={links} maxDisplay={2} />

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 group-hover:text-hanko-700 group-hover:translate-x-0.5 transition-all shrink-0"
        >
          Details <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};