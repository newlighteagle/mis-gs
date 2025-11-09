import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getICS } from "@/lib/google-sheets/services"
import type { ICS } from "@/lib/google-sheets/types"

export default async function ICSMasterDataPage() {
  let icsList: ICS[] = []
  let error: string | null = null

  try {
    icsList = await getICS()
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load ICS"
    console.error("Error loading ICS:", err)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Master Data - ICS</h1>
        <p className="text-muted-foreground">
          Kelola data ICS dari Google Spreadsheet
        </p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">
              Error: {error}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>ICS List</CardTitle>
          <CardDescription>
            Total: {icsList.length} ICS
          </CardDescription>
        </CardHeader>
        <CardContent>
          {icsList.length === 0 ? (
            <p className="text-muted-foreground">No ICS found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">District Code</th>
                    <th className="text-left p-2 font-semibold">District Name</th>
                    <th className="text-left p-2 font-semibold">ICS Code</th>
                    <th className="text-left p-2 font-semibold">ICS Name</th>
                    <th className="text-left p-2 font-semibold">ICS Abrv</th>
                    <th className="text-left p-2 font-semibold">3F ID</th>
                    <th className="text-left p-2 font-semibold">isKPI</th>
                  </tr>
                </thead>
                <tbody>
                  {icsList.map((ics, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">{ics.DistrictCode || "-"}</td>
                      <td className="p-2">{ics.DistrictName || "-"}</td>
                      <td className="p-2">{ics.ICSCode || "-"}</td>
                      <td className="p-2">{ics.ICSName || "-"}</td>
                      <td className="p-2">{ics.ICSAbrv || "-"}</td>
                      <td className="p-2">{ics["3FID"] || "-"}</td>
                      <td className="p-2">
                        {ics.isKPI === true || ics.isKPI === "TRUE" || ics.isKPI === "true" ? (
                          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Yes</span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

