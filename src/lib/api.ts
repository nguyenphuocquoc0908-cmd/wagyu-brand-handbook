import { BrandItem, FarmItem, CompanyItem, BrandFarmItem, WagyuDatasetType } from "./types";

export const API_BASE_URL = "https://script.google.com/macros/s/AKfycbxsZYB_ly5L3VmKmAWQfOduPBarTnrRwNng4lgkx5zUnZjcyoljaxykEH6LblauKVrR/exec";

// In-memory cache for instant tab switching
const clientCache: Partial<Record<WagyuDatasetType, any[]>> = {};

export async function fetchDataset<T>(sheet: WagyuDatasetType, forceRefresh = false): Promise<T[]> {
  if (!forceRefresh && clientCache[sheet]) {
    return clientCache[sheet] as T[];
  }

  try {
    const encodedSheet = encodeURIComponent(sheet);
    const url = `${API_BASE_URL}?sheet=${encodedSheet}${forceRefresh ? "&nocache=1" : ""}`;
    
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status} from API`);
    }

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) {
      throw new Error(json.error || "Invalid response from API");
    }

    // Filter out header echoes
    const cleanedData = json.data.filter((item: any) => {
      if (item.prefecture && String(item.prefecture).includes("Tỉnh xuất xứ")) return false;
      if (item.farmName && String(item.farmName).includes("TRANG TRẠI")) return false;
      if (item.name && String(item.name).includes("CÁC ĐƠN VỊ")) return false;
      if (item.brandOrFarmName && String(item.brandOrFarmName).includes("Tên thương hiệu")) return false;
      return item.brandName || item.farmName || item.name || item.brandOrFarmName;
    }).map((item: any) => {
      // Calculate isF1 strictly based on sheet STT color rule:
      // Green numbers (STT 1-313) = Wagyu Brand
      // Red numbers (STT 314+) = F1 Brand
      if (sheet === "BRAND") {
        const numId = Number(item.id);
        item.isF1 = !isNaN(numId) && numId >= 314;
      }
      return item;
    });

    clientCache[sheet] = cleanedData;
    return cleanedData as T[];
  } catch (err) {
    console.error(`Error loading sheet ${sheet}:`, err);
    throw err;
  }
}