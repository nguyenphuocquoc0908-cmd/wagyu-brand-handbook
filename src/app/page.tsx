"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { TabNavigation } from "@/components/TabNavigation";
import { RegionFilter } from "@/components/RegionFilter";
import { SearchBar } from "@/components/SearchBar";
import { CardBrand } from "@/components/CardBrand";
import { CardFarm } from "@/components/CardFarm";
import { CardCompany } from "@/components/CardCompany";
import { CardBrandFarm } from "@/components/CardBrandFarm";
import { DetailModal } from "@/components/DetailModal";
import { Footer } from "@/components/Footer";
import { fetchDataset } from "@/lib/api";
import { BrandItem, FarmItem, CompanyItem, BrandFarmItem, WagyuDatasetType, ModalData } from "@/lib/types";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<WagyuDatasetType>("BRAND");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tab datasets
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [farms, setFarms] = useState<FarmItem[]>([]);
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [brandFarms, setBrandFarms] = useState<BrandFarmItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load dataset
  const loadData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      if (activeTab === "BRAND") {
        const data = await fetchDataset<BrandItem>("BRAND", forceRefresh);
        setBrands(data);
      } else if (activeTab === "FARM") {
        const data = await fetchDataset<FarmItem>("FARM", forceRefresh);
        setFarms(data);
      } else if (activeTab === "COMPANY") {
        const data = await fetchDataset<CompanyItem>("COMPANY", forceRefresh);
        setCompanies(data);
      } else if (activeTab === "BRAND&FARM") {
        const data = await fetchDataset<BrandFarmItem>("BRAND&FARM", forceRefresh);
        setBrandFarms(data);
      }

      // Background preload other tabs for instant switching
      loadRemainingTabsInBackground(forceRefresh);
    } catch (err: any) {
      console.error("Data loading error:", err);
      setError(err.message || "Failed to connect to Google Sheets API.");
    } finally {
      setLoading(false);
    }
  };

  const loadRemainingTabsInBackground = async (forceRefresh = false) => {
    try {
      if (brands.length === 0 && activeTab !== "BRAND") {
        fetchDataset<BrandItem>("BRAND", forceRefresh).then(setBrands).catch(() => {});
      }
      if (farms.length === 0 && activeTab !== "FARM") {
        fetchDataset<FarmItem>("FARM", forceRefresh).then(setFarms).catch(() => {});
      }
      if (companies.length === 0 && activeTab !== "COMPANY") {
        fetchDataset<CompanyItem>("COMPANY", forceRefresh).then(setCompanies).catch(() => {});
      }
      if (brandFarms.length === 0 && activeTab !== "BRAND&FARM") {
        fetchDataset<BrandFarmItem>("BRAND&FARM", forceRefresh).then(setBrandFarms).catch(() => {});
      }
    } catch (e) {
      // ignore background errors
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  // Filtering by Region and Search Query
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const reg = selectedRegion.toLowerCase().trim();

    const matchRegion = (itemRegion?: string, itemPrefecture?: string) => {
      if (reg === "all") return true;
      const combined = `${itemRegion || ""} ${itemPrefecture || ""}`.toLowerCase();
      
      if (reg === "hokkaido") return combined.includes("hokkaido") || combined.includes("北海道");
      if (reg === "tohoku") return combined.includes("tohoku") || combined.includes("tōhoku") || combined.includes("東北");
      if (reg === "kanto") return combined.includes("kanto") || combined.includes("kantō") || combined.includes("関東");
      if (reg === "chubu") return combined.includes("chubu") || combined.includes("chūbu") || combined.includes("中部");
      if (reg === "kansai") return combined.includes("kansai") || combined.includes("kinki") || combined.includes("関西");
      if (reg === "chugoku") return combined.includes("chugoku") || combined.includes("chūgoku") || combined.includes("中国");
      if (reg === "shikoku") return combined.includes("shikoku") || combined.includes("四国");
      if (reg === "kyushu") return combined.includes("kyushu") || combined.includes("kyūshū") || combined.includes("okinawa") || combined.includes("九州");
      
      return combined.includes(reg);
    };

    if (activeTab === "BRAND") {
      return brands.filter((item) => {
        const matchesQuery = !q || [item.brandName, item.prefecture, item.region, item.description]
          .some((f) => f && String(f).toLowerCase().includes(q));
        return matchesQuery && matchRegion(item.region, item.prefecture);
      });
    }

    if (activeTab === "FARM") {
      return farms.filter((item) => {
        const matchesQuery = !q || [item.farmName, item.prefecture, item.region, item.highlights, item.mainWagyuBrand, item.address]
          .some((f) => f && String(f).toLowerCase().includes(q));
        return matchesQuery && matchRegion(item.region, item.prefecture);
      });
    }

    if (activeTab === "COMPANY") {
      return companies.filter((item) => {
        return !q || [item.name, item.roleAndFunction, item.info]
          .some((f) => f && String(f).toLowerCase().includes(q));
      });
    }

    if (activeTab === "BRAND&FARM") {
      return brandFarms.filter((item) => {
        const matchesQuery = !q || [item.brandOrFarmName, item.prefecture, item.region, item.typeNote]
          .some((f) => f && String(f).toLowerCase().includes(q));
        return matchesQuery && matchRegion(item.region, item.prefecture);
      });
    }

    return [];
  }, [activeTab, brands, farms, companies, brandFarms, searchQuery, selectedRegion]);

  const handleOpenDetail = (data: ModalData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery("");
        }}
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Database Section Anchor */}
      <div id="database-section">
        {/* Tab Navigation (BRAND, FARM, COMPANY, BRAND&FARM) */}
        <TabNavigation
          activeTab={activeTab}
          onChangeTab={(t) => {
            setActiveTab(t);
            setSearchQuery("");
          }}
          counts={{
            BRAND: brands.length || undefined,
            FARM: farms.length || undefined,
            COMPANY: companies.length || undefined,
            "BRAND&FARM": brandFarms.length || undefined,
          }}
        />

        {/* Main Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Controls Section: Search & Region Filter */}
          <div className="bg-white/70 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-subtle space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onRefresh={() => loadData(true)}
              isLoading={loading}
              totalResults={filteredData.length}
            />

            {/* Region filter applies to tabs with regional data */}
            {activeTab !== "COMPANY" && (
              <div className="pt-2 border-t border-stone-100">
                <RegionFilter
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                  availableRegions={[]}
                />
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-stone-500">
              <Loader2 className="w-8 h-8 animate-spin text-hanko-700" />
              <span className="text-sm font-serif">Syncing data from Google Sheets API...</span>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 shrink-0 text-red-600" />
                <div>
                  <p className="font-semibold text-sm">Unable to load data:</p>
                  <p className="text-xs text-red-700 mt-0.5">{error}</p>
                </div>
              </div>
              <button
                onClick={() => loadData(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredData.length === 0 && (
            <div className="py-20 text-center bg-white/50 rounded-2xl border border-dashed border-stone-300 p-8">
              <div className="inline-flex p-3 rounded-full bg-stone-100 text-stone-400 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-stone-800">
                No matching results found
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try searching with different keywords or reset region filter to &ldquo;All Regions&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("ALL");
                }}
                className="mt-4 px-4 py-1.5 rounded-full bg-stone-800 text-white text-xs font-medium hover:bg-stone-900"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Card Grid */}
          {!loading && !error && filteredData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeTab === "BRAND" &&
                (filteredData as BrandItem[]).map((item, idx) => (
                  <CardBrand key={idx} item={item} onOpenDetail={handleOpenDetail} />
                ))}

              {activeTab === "FARM" &&
                (filteredData as FarmItem[]).map((item, idx) => (
                  <CardFarm key={idx} item={item} onOpenDetail={handleOpenDetail} />
                ))}

              {activeTab === "COMPANY" &&
                (filteredData as CompanyItem[]).map((item, idx) => (
                  <CardCompany key={idx} item={item} onOpenDetail={handleOpenDetail} />
                ))}

              {activeTab === "BRAND&FARM" &&
                (filteredData as BrandFarmItem[]).map((item, idx) => (
                  <CardBrandFarm key={idx} item={item} onOpenDetail={handleOpenDetail} />
                ))}
            </div>
          )}
        </main>
      </div>

      {/* Detail Modal */}
      <DetailModal
        data={modalData}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}