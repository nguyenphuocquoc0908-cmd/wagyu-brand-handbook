"use client";

import React from "react";
import { Search, X, RotateCw } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onRefresh,
  isLoading,
  totalResults,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Search Input Box */}
      <div className="relative flex-1 max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by brand, farm, prefecture (Hyogo, Miyazaki, Kobe, Ozaki...)"
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-stone-300 focus:border-sumi-900 focus:ring-1 focus:ring-sumi-900 text-sm text-stone-900 placeholder:text-stone-400 shadow-2xs transition-all outline-none font-sans"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Right Tools: Result Counter + Refresh Button */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <span className="text-xs text-stone-600 font-sans">
          Showing <strong className="text-sumi-900 font-mono">{totalResults}</strong> results
        </span>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700 shadow-2xs transition-all disabled:opacity-50"
          title="Refresh data from Google Sheets API"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-hanko-700" : "text-stone-500"}`} />
          <span>{isLoading ? "Syncing..." : "Refresh"}</span>
        </button>
      </div>
    </div>
  );
};