"use client";

import React from "react";
import { Instagram, Globe, Youtube, FileText, ExternalLink } from "lucide-react";
import { ExtractedLink } from "@/lib/types";

interface LinkButtonsProps {
  links: ExtractedLink[];
  maxDisplay?: number;
  className?: string;
}

export const LinkButtons: React.FC<LinkButtonsProps> = ({ links, maxDisplay = 3, className = "" }) => {
  if (!links || links.length === 0) return null;

  const displayLinks = links.slice(0, maxDisplay);

  const getIcon = (type: ExtractedLink["type"]) => {
    switch (type) {
      case "instagram":
        return <Instagram className="w-3.5 h-3.5 text-pink-600" />;
      case "youtube":
        return <Youtube className="w-3.5 h-3.5 text-red-600" />;
      case "pdf":
        return <FileText className="w-3.5 h-3.5 text-amber-700" />;
      case "website":
      default:
        return <Globe className="w-3.5 h-3.5 text-stone-700" />;
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {displayLinks.map((item, idx) => (
        <a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100/90 hover:bg-stone-200/90 text-stone-800 text-xs font-medium transition-all duration-200 border border-stone-200/80 shadow-2xs hover:shadow-xs"
          title={item.url}
        >
          {getIcon(item.type)}
          <span className="truncate max-w-[110px]">{item.label}</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-40 ml-0.5" />
        </a>
      ))}
      {links.length > maxDisplay && (
        <span className="text-[11px] text-stone-500 font-medium px-1">
          +{links.length - maxDisplay} links
        </span>
      )}
    </div>
  );
};