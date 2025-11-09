// Types for Google Sheets data

export interface SecurityUser {
  id: string
  status: "active" | "not-active"
  name: string
  email: string
  role: "admin" | "user"
  notes?: string
  module?: string
}

export interface District {
  DistrictCode: string
  DistrictName: string
}

export interface ICS {
  DistrictCode: string
  DistrictName: string
  ICSCode: string
  ICSName: string
  ICSAbrv: string
  "3FID": string
  isKPI: boolean | string
}

export interface Farmer {
  ICSCode: string
  Status: string
  Name: string
  FarmerID: string
}

export interface Parcel {
  ICSCode: string
  Status: string
  FarmerID: string
  ParcelID: string
  Luas: number | string
}

export interface Training {
  ICSCode: string
  FarmerID: string
  BMP: string
  PNC: string
  NKT: string
  MK: string
  K3: string
  GEDSI: string
}

