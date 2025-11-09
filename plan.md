# Plan - MIS Google Spreadsheet Dashboard

## 1. Project Overview

### 1.1 Repository Information
- **GitHub Repository**: https://github.com/newlighteagle/mis-gs.git
- **Repository Name**: mis-gs
- **Owner**: newlighteagle

### 1.2 Teknologi Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui
- **Deployment**: Vercel
- **Data Source**: Google Sheets API
- **Authentication**: Email-based access control via Google Sheets

### 1.3 Tujuan
Membuat dashboard web untuk mengelola dan memvisualisasikan data dari beberapa Google Spreadsheet dengan sistem autentikasi berbasis email.

---

## 2. Data Source - Google Spreadsheets

### 2.1 Security Spreadsheet
**URL**: https://docs.google.com/spreadsheets/d/1smS6lOz8dGlzWq-ZlZxafU3-y8Ss4ugTlOFHib762L8

**Sheet: email**
| Column | Type | Description |
|--------|------|-------------|
| id | string | Unique identifier |
| status | enum | "active" atau "not-active" |
| name | string | Nama pengguna |
| email | string | Email pengguna |
| role | enum | "admin" atau "user" |
| notes | string | Catatan |
| module | string | Modul yang dapat diakses |

### 2.2 Master Data Spreadsheet
**URL**: https://docs.google.com/spreadsheets/d/1UoHRQpBWy0_QxxJ88tWxDNDbXNkQEsKYx3l1NqOt6og

#### Sheet: District
| Column | Type | Description |
|--------|------|-------------|
| DistrictCode | string | Kode district |
| DistrictName | string | Nama district |

#### Sheet: ICS
| Column | Type | Description |
|--------|------|-------------|
| DistrictCode | string | Kode district |
| DistrictName | string | Nama district |
| ICSCode | string | Kode ICS |
| ICSName | string | Nama ICS |
| ICSAbrv | string | Singkatan ICS |
| 3FID | string | 3F ID |
| isKPI | boolean | Flag KPI |

#### Sheet: Farmer
| Column | Type | Description |
|--------|------|-------------|
| ICSCode | string | Kode ICS |
| Status | string | Status petani |
| Name | string | Nama petani |
| FarmerID | string | ID petani |

#### Sheet: Parcel
| Column | Type | Description |
|--------|------|-------------|
| ICSCode | string | Kode ICS |
| Status | string | Status parcel |
| FarmerID | string | ID petani |
| ParcelID | string | ID parcel |
| Luas | number | Luas parcel |

#### Sheet: Training
| Column | Type | Description |
|--------|------|-------------|
| ICSCode | string | Kode ICS |
| FarmerID | string | ID petani |
| BMP | string | BMP data |
| PNC | string | PNC data |
| NKT | string | NKT data |
| MK | string | MK data |
| K3 | string | K3 data |
| GEDSI | string | GEDSI data |

---

## 3. Application Structure

### 3.1 Navigation Structure

```
Sidebar Navigation
├── Main Dashboard
│   ├── Main Data
│   └── KPI
├── Detail Dashboard
│   ├── Farmer
│   ├── Parcel
│   ├── Training
│   ├── BMP
│   ├── NKT
│   └── K3
└── Master Data
    ├── Farmer
    ├── Parcel
    ├── Training
    ├── BMP
    ├── NKT
    └── K3
```

### 3.2 Page Routes

```
/app
├── / (landing/dashboard)
├── /login
├── /main-dashboard
│   ├── /main-data
│   └── /kpi
├── /detail-dashboard
│   ├── /farmer
│   ├── /parcel
│   ├── /training
│   ├── /bmp
│   ├── /nkt
│   └── /k3
└── /master-data
    ├── /farmer
    ├── /parcel
    ├── /training
    ├── /bmp
    ├── /nkt
    └── /k3
```

---

## 4. Implementation Steps

### Phase 1: Project Setup
1. ✅ Initialize Next.js project with TypeScript
2. ✅ Initialize Git repository and connect to GitHub
3. ✅ Create `.env.example` file with spreadsheet configuration
4. ✅ Create `.gitignore` file
5. ✅ Install and configure shadcn/ui
6. ✅ Install sidebar-07 component: `npx shadcn@latest add sidebar-07`
7. ✅ Setup Google Sheets API integration
8. ✅ Configure environment variables (copy `.env.example` to `.env`)
9. ✅ Setup project structure and folder organization

### Phase 2: Authentication & Security
1. ✅ Implement email-based authentication
2. ✅ Create authentication middleware
3. ✅ Implement role-based access control (admin/user)
4. ✅ Create session management
5. ✅ Implement module-based access control

### Phase 3: Google Sheets Integration
1. ✅ Setup Google Sheets API client
2. ✅ Create service layer for reading Google Sheets
3. ✅ Implement caching mechanism for better performance
4. ✅ Create data models/types for each sheet
5. ✅ Implement error handling and retry logic

### Phase 4: UI Components
1. ✅ Setup sidebar navigation (sidebar-07)
2. ✅ Create layout with sidebar
3. ✅ Create dashboard components
4. ✅ Create data table components
5. ✅ Create KPI cards/components
6. ✅ Create filter and search components
7. ✅ Implement responsive design

### Phase 5: Main Dashboard
1. ✅ Create Main Data page
2. ✅ Create KPI dashboard page
3. ✅ Implement data visualization (charts, graphs)
4. ✅ Add filters and search functionality

### Phase 6: Detail Dashboard Pages
1. ✅ Create Farmer detail page
2. ✅ Create Parcel detail page
3. ✅ Create Training detail page
4. ✅ Create BMP detail page
5. ✅ Create NKT detail page
6. ✅ Create K3 detail page

### Phase 7: Master Data Pages
1. ✅ Create Farmer master data page
2. ✅ Create Parcel master data page
3. ✅ Create Training master data page
4. ✅ Create BMP master data page
5. ✅ Create NKT master data page
6. ✅ Create K3 master data page

### Phase 8: Advanced Features
1. ✅ Implement data filtering and sorting
2. ✅ Add export functionality (CSV, Excel)
3. ✅ Implement pagination
4. ✅ Add search functionality
5. ✅ Implement data refresh mechanism
6. ✅ Add loading states and error handling

### Phase 9: Testing & Optimization
1. ✅ Test authentication flow
2. ✅ Test data fetching from Google Sheets
3. ✅ Optimize performance (caching, lazy loading)
4. ✅ Test responsive design
5. ✅ Test role-based access control

### Phase 10: Deployment
1. ✅ Setup Vercel project
2. ✅ Configure environment variables in Vercel
3. ✅ Setup Google Sheets API credentials
4. ✅ Deploy to Vercel
5. ✅ Test production deployment
6. ✅ Setup monitoring and error tracking

---

## 5. Technical Specifications

### 5.1 Google Sheets API Setup
- Create Google Cloud Project
- Enable Google Sheets API
- Create Service Account
- Share spreadsheets with service account email
- Store credentials securely (environment variables)

### 5.2 Authentication Flow
1. User enters email
2. System checks email in Security spreadsheet
3. Verify status is "active"
4. Check role and module access
5. Create session
6. Redirect to dashboard based on role/module

### 5.3 Data Fetching Strategy
- Use server-side fetching (Next.js Server Components)
- Implement caching with revalidation
- Use React Query/SWR for client-side data management
- Implement incremental static regeneration (ISR) where applicable

### 5.4 State Management
- Server state: React Query or SWR
- Client state: React Context or Zustand (if needed)
- Form state: React Hook Form

### 5.5 UI/UX Considerations
- Responsive design (mobile, tablet, desktop)
- Loading states for all data fetching
- Error boundaries
- Toast notifications for user feedback
- Accessible components (ARIA labels)

---

## 6. Folder Structure

```
/mis-google-spreadsheet
├── /app
│   ├── /(auth)
│   │   └── /login
│   ├── /(dashboard)
│   │   ├── layout.tsx (with sidebar)
│   │   ├── /main-dashboard
│   │   │   ├── /main-data
│   │   │   └── /kpi
│   │   ├── /detail-dashboard
│   │   │   ├── /farmer
│   │   │   ├── /parcel
│   │   │   ├── /training
│   │   │   ├── /bmp
│   │   │   ├── /nkt
│   │   │   └── /k3
│   │   └── /master-data
│   │       ├── /farmer
│   │       ├── /parcel
│   │       ├── /training
│   │       ├── /bmp
│   │       ├── /nkt
│   │       └── /k3
│   └── layout.tsx
├── /components
│   ├── /ui (shadcn components)
│   ├── /sidebar
│   ├── /dashboard
│   ├── /tables
│   └── /charts
├── /lib
│   ├── /google-sheets
│   │   ├── client.ts
│   │   ├── services.ts
│   │   └── types.ts
│   ├── /auth
│   │   ├── auth.ts
│   │   └── middleware.ts
│   └── /utils
├── /types
│   ├── security.ts
│   ├── master-data.ts
│   └── index.ts
├── /hooks
├── /constants
└── /public
```

---

## 7. Environment Variables

File `.env.example` berisi template untuk environment variables. Copy ke `.env` dan isi dengan nilai yang sesuai.

```env
# Google Sheets API Configuration
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_PROJECT_ID=

# Google Spreadsheet URLs and IDs
# Security Spreadsheet - untuk authentication dan authorization
SECURITY_SPREADSHEET_URL=https://docs.google.com/spreadsheets/d/1smS6lOz8dGlzWq-ZlZxafU3-y8Ss4ugTlOFHib762L8
SECURITY_SPREADSHEET_ID=1smS6lOz8dGlzWq-ZlZxafU3-y8Ss4ugTlOFHib762L8
SECURITY_SHEET_NAME=email

# Master Data Spreadsheet - untuk data utama
MASTER_DATA_SPREADSHEET_URL=https://docs.google.com/spreadsheets/d/1UoHRQpBWy0_QxxJ88tWxDNDbXNkQEsKYx3l1NqOt6og
MASTER_DATA_SPREADSHEET_ID=1UoHRQpBWy0_QxxJ88tWxDNDbXNkQEsKYx3l1NqOt6og

# Master Data Sheet Names
MASTER_DATA_SHEET_DISTRICT=District
MASTER_DATA_SHEET_ICS=ICS
MASTER_DATA_SHEET_FARMER=Farmer
MASTER_DATA_SHEET_PARCEL=Parcel
MASTER_DATA_SHEET_TRAINING=Training

# Authentication Configuration
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Application Configuration
APP_URL=http://localhost:3000
NODE_ENV=development

# Cache Configuration (optional)
CACHE_TTL=3600
ENABLE_CACHE=true
```

### 7.1 Spreadsheet Configuration

#### Security Spreadsheet
- **URL**: `SECURITY_SPREADSHEET_URL`
- **ID**: `SECURITY_SPREADSHEET_ID`
- **Sheet Name**: `SECURITY_SHEET_NAME` (default: "email")
- **Purpose**: Menyimpan daftar email yang dapat mengakses aplikasi beserta role dan module access

#### Master Data Spreadsheet
- **URL**: `MASTER_DATA_SPREADSHEET_URL`
- **ID**: `MASTER_DATA_SPREADSHEET_ID`
- **Sheet Names**:
  - `MASTER_DATA_SHEET_DISTRICT` (default: "District")
  - `MASTER_DATA_SHEET_ICS` (default: "ICS")
  - `MASTER_DATA_SHEET_FARMER` (default: "Farmer")
  - `MASTER_DATA_SHEET_PARCEL` (default: "Parcel")
  - `MASTER_DATA_SHEET_TRAINING` (default: "Training")
- **Purpose**: Menyimpan semua data master dan operational data

---

## 8. Dependencies

### Core
- next: ^14.0.0
- react: ^18.0.0
- typescript: ^5.0.0

### UI
- @radix-ui/* (via shadcn/ui)
- tailwindcss
- lucide-react

### Google Sheets
- googleapis: ^latest

### Data Management
- @tanstack/react-query: ^latest
- zod: ^latest (for validation)

### Forms
- react-hook-form: ^latest
- @hookform/resolvers: ^latest

### Utilities
- date-fns: ^latest
- clsx: ^latest
- tailwind-merge: ^latest

---

## 9. Security Considerations

1. **API Keys**: Store in environment variables, never commit to repository
2. **Authentication**: Verify email and status on every request
3. **Role-Based Access**: Check user role before rendering protected content
4. **Module Access**: Verify user has access to specific module
5. **Rate Limiting**: Implement rate limiting for API calls
6. **Input Validation**: Validate all user inputs
7. **CORS**: Configure CORS properly
8. **HTTPS**: Use HTTPS in production

---

## 10. Performance Optimization

1. **Caching**: Implement caching for Google Sheets data
2. **Lazy Loading**: Lazy load components and routes
3. **Image Optimization**: Use Next.js Image component
4. **Code Splitting**: Automatic code splitting with Next.js
5. **Server Components**: Use Server Components for data fetching
6. **Incremental Static Regeneration**: Use ISR for static pages with dynamic data

---

## 11. Testing Strategy

1. **Unit Tests**: Test utility functions and services
2. **Integration Tests**: Test Google Sheets integration
3. **E2E Tests**: Test critical user flows
4. **Accessibility Tests**: Ensure components are accessible

---

## 12. Repository Setup

```bash
# Initialize Git repository
git init
git add .
git commit -m "Initial commit: Project setup with plan.md"

# Connect to remote repository
git remote add origin https://github.com/newlighteagle/mis-gs.git
git branch -M main
git push -u origin main
```

## 13. Deployment Checklist

- [ ] Git repository initialized and connected to GitHub
- [ ] Environment variables configured in Vercel
- [ ] Google Sheets API credentials set up
- [ ] Spreadsheets shared with service account
- [ ] Domain configured (if custom domain)
- [ ] SSL certificate enabled
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Performance monitoring enabled

---

## 14. Future Enhancements

1. Real-time data updates (WebSockets or polling)
2. Data export functionality (CSV, Excel, PDF)
3. Advanced filtering and search
4. Data visualization charts (Chart.js, Recharts)
5. User preferences and settings
6. Audit log for data changes
7. Bulk operations
8. Data validation and error reporting
9. Mobile app (React Native)
10. Offline support (PWA)

---

## 15. Notes

- Ensure Google Sheets are publicly readable or shared with service account
- Consider implementing data synchronization schedule
- Plan for handling large datasets (pagination, virtualization)
- Consider implementing data backup mechanism
- Plan for handling Google Sheets API rate limits

---

**Last Updated**: 2024
**Status**: Planning Phase

