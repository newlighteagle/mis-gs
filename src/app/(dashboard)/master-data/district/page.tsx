import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { District } from "@/lib/google-sheets/types"
import { getDistricts } from "@/lib/google-sheets/services"
import { DistrictDataTable } from "./district-data-table-client"

export default async function DistrictMasterDataPage() {
  let districts: District[] = []
  let error: string | null = null

  try {
    districts = await getDistricts()
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load districts"
    console.error("Error loading districts:", err)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Master Data - District</h1>
        <p className="text-muted-foreground">
          Kelola data District dari Google Spreadsheet
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
          <CardTitle>District List</CardTitle>
          <CardDescription>
            Total: {districts.length} districts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {districts.length === 0 ? (
            <p className="text-muted-foreground">No districts found</p>
          ) : (
            <DistrictDataTable data={districts} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

