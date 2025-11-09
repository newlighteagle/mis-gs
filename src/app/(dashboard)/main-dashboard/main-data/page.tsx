import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MainDataPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Main Data</h1>
        <p className="text-muted-foreground">
          Overview data utama dari Google Spreadsheet
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Farmers</CardTitle>
            <CardDescription>Jumlah total petani</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Parcels</CardTitle>
            <CardDescription>Jumlah total parcel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Area</CardTitle>
            <CardDescription>Total luas area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active ICS</CardTitle>
            <CardDescription>Jumlah ICS aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
          <CardDescription>Data akan ditampilkan di sini</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Data table akan diimplementasikan selanjutnya</p>
        </CardContent>
      </Card>
    </div>
  )
}

