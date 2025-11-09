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
    return process.env.SECURITY_SPREADSHEET_ID || ""
  }
  return process.env.MASTER_DATA_SPREADSHEET_ID || ""
}

