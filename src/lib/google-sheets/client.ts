import "server-only"
import { google } from "googleapis"

// Initialize Google Sheets API client
export function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })

  const sheets = google.sheets({ version: "v4", auth })
  return sheets
}

// Get spreadsheet ID from environment variables
export function getSpreadsheetId(type: "security" | "master-data"): string {
  if (type === "security") {
    if (process.env.SECURITY_SPREADSHEET_ID && process.env.SECURITY_SPREADSHEET_ID.length > 0) {
      return process.env.SECURITY_SPREADSHEET_ID
    }
    const url = process.env.SECURITY_SPREADSHEET_URL || ""
    const match = url.match(/\/spreadsheets\/d\/([^/]+)/)
    return match ? match[1] : ""
  }

  if (process.env.MASTER_DATA_SPREADSHEET_ID && process.env.MASTER_DATA_SPREADSHEET_ID.length > 0) {
    return process.env.MASTER_DATA_SPREADSHEET_ID
  }
  const url = process.env.MASTER_DATA_SPREADSHEET_URL || ""
  const match = url.match(/\/spreadsheets\/d\/([^/]+)/)
  return match ? match[1] : ""
}

