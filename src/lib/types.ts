export interface BrandItem {
  id: number | string;
  prefecture: string;
  region: string;
  brandName: string;
  description: string;
  website: string;
  isF1: boolean;
}

export interface FarmItem {
  id: number | string;
  farmName: string;
  region: string;
  prefecture: string;
  mainWagyuBrand: string;
  highlights: string;
  address: string;
  website: string;
  info: string;
}

export interface CompanyItem {
  id: number | string;
  name: string;
  website: string;
  info: string;
  roleAndFunction: string;
}

export interface BrandFarmItem {
  rowGroup: string;
  colGroup: string;
  id: number | string;
  brandOrFarmName: string;
  region: string;
  prefecture: string;
  typeNote: string;
}

export type WagyuDatasetType = 'BRAND' | 'FARM' | 'COMPANY' | 'BRAND&FARM';

export interface ExtractedLink {
  url: string;
  type: 'instagram' | 'website' | 'youtube' | 'facebook' | 'pdf' | 'other';
  label: string;
}

export interface ModalData {
  title: string;
  subTitle?: string;
  region?: string;
  prefecture?: string;
  description?: string;
  secondaryText?: string;
  address?: string;
  links?: ExtractedLink[];
  badges?: { label: string; variant: 'red' | 'gold' | 'green' | 'stone' }[];
  rawItem?: any;
}