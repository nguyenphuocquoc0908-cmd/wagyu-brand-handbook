"use client";

import React from "react";
import { Building2, ArrowRight, ShieldCheck } from "lucide-react";
import { CompanyItem, ModalData } from "@/lib/types";
import { extractLinks, splitBilingualName, truncateText } from "@/lib/utils";
import { LinkButtons } from "./LinkButtons";

interface CardCompanyProps {
  item: CompanyItem;
  onOpenDetail: (data: ModalData) => void;
}

export const CardCompany: React.FC<CardCompanyProps> = ({ item, onOpenDetail }) => {
  const { primary, secondary } = splitBilingualName(item.name);
  const links = extractLinks(item.website);

  const handleOpen = () => {
    onOpenDetail({
      title: primary,
      subTitle: secondary,
      description: item.roleAndFunction || item.info,
      secondaryText: item.info !== item.roleAndFunction ? item.info : undefined,
      links: links,
      badges: [
        { label: "Official Organization (関係機関・団体)", variant: "gold" },
      ],
      rawItem: item,
    });
  };

  return (
    <div 
      onClick={handleOpen}
      className="group relative flex flex-col justify-between bg-white/90 hover:bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E0D8] hover:border-stone-400 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-100 border border-stone-300 text-[11px] font-mono font-bold text-stone-800">
            #{String(item.id || 0).padStart(2, "0")}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-medium">
            <ShieldCheck className="w-3 h-3 text-amber-700" />
            Official Body
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-sumi-900 group-hover:text-amber-900 transition-colors leading-snug">
          {primary}
        </h3>
        {secondary && (
          <p className="text-xs text-stone-500 font-serif italic mt-1">
            {secondary}
          </p>
        )}

        {(item.roleAndFunction || item.info) && (
          <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed font-sans">
            {truncateText(item.roleAndFunction || item.info, 160)}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
        <LinkButtons links={links} maxDisplay={2} />

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all shrink-0"
        >
          Details <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};