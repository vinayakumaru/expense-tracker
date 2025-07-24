import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import AppBar from '@/components/AppBar';
import AppDrawer from '@/components/AppDrawer';
import { AuthProvider } from '@/hooks/useAuth';
import ProtectedRoute from '@/features/auth/ProtectedRoute';
import LoginPage from '@/features/auth/LoginPage';
import DashboardPage from '@/features/dashboard/DashboardPage';
import ExpensesPage from '@/features/expenses/pages/ExpensesPage';
import CalendarPage from '@/features/calendar/CalendarPage';
import ChatPage from '@/features/chat/ChatPage';
import ExportPage from '@/features/export/ExportPage';
import FinMithraAdvisor from './features/fin-mithra-advisor/FinMithraAdvisor';

export default function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex' }}>
        <AppBar />
        <AppDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh', overflow: 'auto' }}>
          <Toolbar /> {/* pushes content below app-bar */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/fin-mithra-advisor" element={<FinMithraAdvisor />} />
              <Route path="/export" element={<ExportPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Box>
      </Box>
    </AuthProvider>
  );
}