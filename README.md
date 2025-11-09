# MIS Google Spreadsheet Dashboard

Dashboard web untuk mengelola dan memvisualisasikan data dari Google Spreadsheet menggunakan Next.js, TypeScript, dan shadcn/ui.

## 🚀 Fitur

- **Authentication**: Email-based authentication menggunakan Google Spreadsheet
- **Role-Based Access Control**: Admin dan User roles
- **Dashboard**: Main Dashboard dengan KPI dan Main Data
- **Detail Dashboard**: Farmer, Parcel, Training, BMP, NKT, K3
- **Master Data**: Management untuk semua data master
- **Google Sheets Integration**: Real-time data dari Google Spreadsheet

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Google Cloud Project dengan Google Sheets API enabled
- Service Account dengan credentials

## 🛠️ Installation

1. Clone repository:
```bash
git clone https://github.com/newlighteagle/mis-gs.git
cd mis-gs
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

4. Fill in `.env` file dengan credentials Anda:
   - `GOOGLE_SHEETS_CLIENT_EMAIL`: Service account email
   - `GOOGLE_SHEETS_PRIVATE_KEY`: Service account private key
   - `GOOGLE_SHEETS_PROJECT_ID`: Google Cloud project ID
   - `NEXTAUTH_SECRET`: Secret untuk authentication
   - Spreadsheet IDs sudah diisi

5. Share Google Spreadsheets dengan service account email:
   - Security Spreadsheet: `1smS6lOz8dGlzWq-ZlZxafU3-y8Ss4ugTlOFHib762L8`
   - Master Data Spreadsheet: `1UoHRQpBWy0_QxxJ88tWxDNDbXNkQEsKYx3l1NqOt6og`

6. Run development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
/mis-google-spreadsheet
├── /src
│   ├── /app              # Next.js App Router
│   ├── /components       # React components
│   │   └── /ui          # shadcn/ui components
│   ├── /lib             # Utilities and services
│   │   ├── /google-sheets  # Google Sheets integration
│   │   └── /auth        # Authentication
│   ├── /types           # TypeScript types
│   └── /hooks           # Custom React hooks
├── /public              # Static files
├── .env.example         # Environment variables template
├── plan.md             # Project plan and documentation
└── README.md           # This file
```

## 🔧 Configuration

### Google Sheets Setup

1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account
4. Download credentials JSON
5. Extract client_email, private_key, dan project_id
6. Share spreadsheets dengan service account email

### Environment Variables

Lihat `.env.example` untuk daftar lengkap environment variables.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel

1. Push code ke GitHub
2. Import project di Vercel
3. Add environment variables di Vercel dashboard
4. Deploy

## 📄 License

ISC

## 👤 Author

newlighteagle

## 🔗 Links

- [GitHub Repository](https://github.com/newlighteagle/mis-gs)
- [Project Plan](./plan.md)

