import "server-only"
import { getGoogleSheetsClient, getSpreadsheetId } from "./client"
import type {
  SecurityUser,
  District,
  ICS,
  Farmer,
  Parcel,
  Training,
} from "./types"

async function getSheetTitleByGid(spreadsheetId: string, gid: number): Promise<string | null> {
  const sheets = getGoogleSheetsClient()
  const res = await sheets.spreadsheets.get({ spreadsheetId })
  const sheet = res.data.sheets?.find((s) => s.properties?.sheetId === gid)
  return sheet?.properties?.title || null
}

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
      
      // Normalize role: "admin" -> "administrator"
      if (obj.role === "admin") {
        obj.role = "administrator"
      }
      
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
  try {
    const spreadsheetId = getSpreadsheetId("security")
    const sheetName = process.env.SECURITY_SHEET_NAME || "email"
    
    if (!spreadsheetId) {
      throw new Error("SECURITY_SPREADSHEET_ID is not set in environment variables")
    }
    
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      throw new Error("Google Sheets API credentials are not configured. Please set GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, and GOOGLE_SHEETS_PROJECT_ID in .env file")
    }
    
    return await readSheetData<SecurityUser>(spreadsheetId, sheetName)
  } catch (error) {
    console.error("[SHEETS] Error getting security users:", error)
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<SecurityUser | null> {
  const users = await getSecurityUsers()
  // Case-insensitive email matching and trim whitespace
  const normalizedEmail = email.toLowerCase().trim()
  const user = users.find(
    (user) => user.email?.toLowerCase().trim() === normalizedEmail && user.status === "active"
  )
  
  if (!user) {
    console.log(`User not found or inactive. Email: ${email}, Available users:`, 
      users.map(u => ({ email: u.email, status: u.status })).slice(0, 5))
  }
  
  return user || null
}

// Master Data Spreadsheet Services
export async function getDistricts(): Promise<District[]> {
  const spreadsheetId = getSpreadsheetId("master-data")
  const gidStr = process.env.MASTER_DATA_SHEET_DISTRICT_GID
  if (gidStr && gidStr.trim().length > 0) {
    const gid = Number(gidStr)
    const title = await getSheetTitleByGid(spreadsheetId, gid)
    if (!title) {
      throw new Error(`Sheet with gid ${gid} not found in master data spreadsheet`)
    }
    return readSheetData<District>(spreadsheetId, title)
  }
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

