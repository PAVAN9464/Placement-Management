import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import StudentDashboard from './pages/Student/StudentDashboard';
import StudentProfilePage from './pages/Student/StudentProfilePage';
import EligibleCompaniesPage from './pages/Student/EligibleCompaniesPage';
import CompanyDetailsPage from './pages/Student/CompanyDetailsPage';
import MyApplicationsPage from './pages/Student/MyApplicationsPage';
import NotificationsPage from './pages/Student/NotificationsPage';
import CompanyDashboard from './pages/Company/CompanyDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route element={<MainLayout />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfilePage />} />
            <Route path="/student/companies" element={<EligibleCompaniesPage />} />
            <Route path="/student/companies/:id" element={<CompanyDetailsPage />} />
            <Route path="/student/applications" element={<MyApplicationsPage />} />
            <Route path="/student/notifications" element={<NotificationsPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['company']} />}>
          <Route element={<MainLayout />}>
            <Route path="/company" element={<CompanyDashboard />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
