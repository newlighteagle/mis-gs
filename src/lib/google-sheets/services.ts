import { getGoogleSheetsClient, getSpreadsheetId } from "./client"
import type {
  SecurityUser,
  District,
  ICS,
  Farmer,
  Parcel,
  Training,
} from "./types"

// Generic function to read data from Google Sheets
async function readSheetData<T>(
  spreadsheetId: string,
  sheetName: string,
  range?: string
): Promise<T[]> {
  try {
    const sheets = getGoogleSheetsClient()
    const rangeToRead = range || `${sheetName}!A:Z`

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: rangeToRead,
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      return []
    }

    // First row is headers
    const headers = rows[0] as string[]
    const data: T[] = []

    // Convert rows to objects
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const obj: any = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || ""
      })
      data.push(obj as T)
    }

    return data
  } catch (error) {
    console.error(`Error reading sheet ${sheetName}:`, error)
    throw error
  }
}

// Security Spreadsheet Services
export async function getSecurityUsers(): Promise<SecurityUser[]> {
  const spreadsheetId = getSpreadsheetId("security")
  const sheetName = process.env.SECURITY_SHEET_NAME || "email"
  return readSheetData<SecurityUser>(spreadsheetId, sheetName)
}

export async function getUserByEmail(email: string): Promise<SecurityUser | null> {
  const users = await getSecurityUsers()
  return users.find((user) => user.email === email && user.status === "active") || null
}

// Master Data Spreadsheet Services
export async function getDistricts(): Promise<District[]> {
  const spreadsheetId = getSpreadsheetId("master-data")
  const sheetName = process.env.MASTER_DATA_SHEET_DISTRICT || "District"
  return readSheetData<District>(spreadsheetId, sheetName)
}

export async function getICS(): Promise<ICS[]> {
  const spreadsheetId = getSpreadsheetId("master-data")
  const sheetName = process.env.MASTER_DATA_SHEET_ICS || "ICS"
  return readSheetData<ICS>(spreadsheetId, sheetName)
}

export async function getFarmers(): Promise<Farmer[]> {
  const spreadsheetId = getSpreadsheetId("master-data")
  const sheetName = process.env.MASTER_DATA_SHEET_FARMER || "Farmer"
  return readSheetData<Farmer>(spreadsheetId, sheetName)
}

export async function getParcels(): Promise<Parcel[]> {
  const spreadsheetId = getSpreadsheetId("master-data")
  const sheetName = process.env.MASTER_DATA_SHEET_PARCEL || "Parcel"
  return readSheetData<Parcel>(spreadsheetId, sheetName)
}

export async function getTrainings(): Promise<Training[]> {
  const spreadsheetId = getSpreadsheetId("master-data")
  const sheetName = process.env.MASTER_DATA_SHEET_TRAINING || "Training"
  return readSheetData<Training>(spreadsheetId, sheetName)
}

// Helper functions for filtered data
export async function getFarmersByICS(icsCode: string): Promise<Farmer[]> {
  const farmers = await getFarmers()
  return farmers.filter((farmer) => farmer.ICSCode === icsCode)
}

export async function getParcelsByFarmer(farmerID: string): Promise<Parcel[]> {
  const parcels = await getParcels()
  return parcels.filter((parcel) => parcel.FarmerID === farmerID)
}

export async function getTrainingsByFarmer(farmerID: string): Promise<Training[]> {
  const trainings = await getTrainings()
  return trainings.filter((training) => training.FarmerID === farmerID)
}

