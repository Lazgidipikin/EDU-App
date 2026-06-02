# EDU App — School Management Platform

A centralized school management platform built with React, TypeScript, Firebase, and Vite. Features role-based access control (RBAC) with distinct experiences for **Administrators**, **Teachers**, **Parents**, and **Students**.

## Features

- **Dashboard** — Performance trends, attendance charts, AI predictions, and alerts (financial data admin-only)
- **Student Management** — Register, view, and manage student records (Admin + Teacher)
- **Grades** — Track CA, assignments, mid-term, and exam scores across terms (All roles)
- **Attendance** — Daily attendance tracking with present/absent/late status (Admin + Teacher + Parent)
- **Fees & Payments** — Full financial dashboard for admins, own-child view for parents (Admin + Parent)
- **Timetable** — Class schedules by day and period (All roles)
- **AI Predictions** — ML-powered student performance forecasting (Admin + Teacher + Parent)
- **Settings** — School configuration, AI engine, security & permissions (Admin only)
- **Role-Based Access Control** — Route-level and page-level guards ensuring data privacy

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Animations:** Motion (Framer Motion)
- **Auth & Database:** Firebase (Auth + Firestore)
- **Deployment:** Vercel
- **Icons:** Lucide React

## Run Locally

**Prerequisites:** Node.js 18+

1. Clone the repository:
   ```bash
   git clone https://github.com/Lazgidipikin/EDU-App.git
   cd EDU-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Firebase config (see `.env.example`)

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

The app is deployed on **Vercel** with automatic deployments on push to `main`.

- SPA routing is handled via `vercel.json` rewrites
- Build command: `npm run build`
- Output directory: `dist`

## Role Access Matrix

| Feature | Admin | Teacher | Parent | Student |
|---------|:-----:|:-------:|:------:|:-------:|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Dashboard (Financial Data) | ✅ | ❌ | ❌ | ❌ |
| Students | ✅ | ✅ | ❌ | ❌ |
| Grades | ✅ | ✅ | ✅ | ✅ |
| Attendance | ✅ | ✅ | ✅ | ❌ |
| Fees (Full View) | ✅ | ❌ | ❌ | ❌ |
| Fees (Own Child) | — | — | ✅ | — |
| Timetable | ✅ | ✅ | ✅ | ✅ |
| AI Predictions | ✅ | ✅ | ✅ | ❌ |
| Settings | ✅ | ❌ | ❌ | ❌ |
