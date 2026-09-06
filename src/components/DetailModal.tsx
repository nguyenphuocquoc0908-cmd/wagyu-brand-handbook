"use client";

import React, { useEffect } from "react";
import { X, MapPin, Globe, Instagram, Youtube, FileText, ExternalLink } from "lucide-react";
import { ModalData } from "@/lib/types";

interface DetailModalProps {
  data: ModalData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ data, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-washi-50 rounded-2xl border border-stone-300 shadow-2xl z-10 flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 bg-washi-50/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-hanko-700" />
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-500">
              Wagyu Dossier Details
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Badges */}
          <div>
            {data.badges && data.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {data.badges.map((b, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium tracking-wide ${
                      b.variant === "red"
                        ? "bg-red-50 text-red-700 border border-red-300"
                        : b.variant === "gold"
                        ? "bg-amber-50 text-eartag-700 border border-amber-300"
                        : b.variant === "green"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                        : "bg-stone-100 text-stone-700 border border-stone-200"
                    }`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sumi-900 tracking-tight leading-snug">
              {data.title}
            </h2>
            {data.subTitle && (
              <p className="text-sm sm:text-base text-stone-600 mt-1 font-serif italic">
                {data.subTitle}
              </p>
            )}

            {(data.region || data.prefecture) && (
              <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm text-stone-600">
                <MapPin className="w-4 h-4 text-hanko-700 shrink-0" />
                <span>
                  {data.region ? `Region: ${data.region}` : ""} 
                  {data.region && data.prefecture ? " • " : ""}
                  {data.prefecture ? `Prefecture: ${data.prefecture}` : ""}
                </span>
              </div>
            )}
          </div>

          <hr className="border-stone-200" />

          {/* Description Section */}
          {data.description && (
            <div>
              <h3 className="text-xs uppercase font-semibold text-stone-400 tracking-wider mb-2">
                Information & Husbandry Standards
              </h3>
              <div className="bg-white/80 rounded-xl p-4 sm:p-5 border border-stone-200/80 text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-line font-sans">
                {data.description}
              </div>
            </div>
          )}

          {/* Secondary Info / Special Notes */}
          {data.secondaryText && (
            <div>
              <h3 className="text-xs uppercase font-semibold text-stone-400 tracking-wider mb-2">
                Special Characteristics & Production Notes
              </h3>
              <div className="bg-stone-100/70 rounded-xl p-4 border border-stone-200/60 text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {data.secondaryText}
              </div>
            </div>
          )}

          {/* Address if available */}
          {data.address && (
            <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-4 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
                  Ranch / Facility Location
                </span>
                <p className="text-sm text-stone-800 mt-0.5">{data.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-900 font-semibold mt-2 hover:underline"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Links Section */}
          {data.links && data.links.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-semibold text-stone-400 tracking-wider mb-3">
                Official Media & Reference Links
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-stone-100 border border-stone-200/90 text-stone-800 text-sm font-medium transition-all group shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {link.type === "instagram" && <Instagram className="w-4 h-4 text-pink-600 shrink-0" />}
                      {link.type === "youtube" && <Youtube className="w-4 h-4 text-red-600 shrink-0" />}
                      {link.type === "pdf" && <FileText className="w-4 h-4 text-amber-700 shrink-0" />}
                      {link.type === "website" && <Globe className="w-4 h-4 text-stone-700 shrink-0" />}
                      <span className="truncate">{link.label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-800 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-washi-100 px-6 py-4 border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-800 hover:bg-stone-900 text-white text-sm font-medium transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};