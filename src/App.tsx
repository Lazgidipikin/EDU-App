import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RoleGuard } from './components/RoleGuard';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Students } from './pages/Students';
import { AIPredictionPage } from './pages/AIPrediction';
import { Fees } from './pages/Fees';
import { AttendancePage } from './pages/Attendance';
import { Grades } from './pages/Grades';
import { Timetable } from './pages/Timetable';
import { Settings } from './pages/Settings';
import { FirebaseProvider, useFirebase } from './contexts/FirebaseContext';

function AppRoutes() {
  const { user, userProfile, loading } = useFirebase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout userRole={userProfile?.role || 'student'}>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Admin + Teacher only */}
        <Route
          path="/students"
          element={
            <RoleGuard allowedRoles={['admin', 'teacher']}>
              <Students />
            </RoleGuard>
          }
        />

        {/* All roles */}
        <Route path="/grades" element={<Grades />} />

        {/* Admin + Teacher + Parent only (no students) */}
        <Route
          path="/attendance"
          element={
            <RoleGuard allowedRoles={['admin', 'teacher', 'parent']}>
              <AttendancePage />
            </RoleGuard>
          }
        />

        {/* Admin + Parent only */}
        <Route
          path="/fees"
          element={
            <RoleGuard allowedRoles={['admin', 'parent']}>
              <Fees />
            </RoleGuard>
          }
        />

        {/* All roles */}
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/ai-prediction" element={<AIPredictionPage />} />
        <Route path="/notifications" element={<div className="p-8">Notifications & Communication</div>} />

        {/* Admin only */}
        <Route
          path="/settings"
          element={
            <RoleGuard allowedRoles={['admin']}>
              <Settings />
            </RoleGuard>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <AppRoutes />
      </Router>
    </FirebaseProvider>
  );
}
