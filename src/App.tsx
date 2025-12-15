import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/fleet/Layout';

// Auth
import Login from './pages/auth/Login';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';

// Fleet Management
import FleetOverview from './pages/fleet/FleetOverview';
import Maintenance from './pages/fleet/Maintenance';
import Inspections from './pages/fleet/Inspections';
import Utilization from './pages/fleet/Utilization';
import Alerts from './pages/fleet/Alerts';

// Driver Management
import DriverOverview from './pages/drivers/DriverOverview';
import Documents from './pages/drivers/Documents';
import Training from './pages/drivers/Training';

// Scheduling & Attendance
import ShiftScheduling from './pages/scheduling/ShiftScheduling';
import Attendance from './pages/scheduling/Attendance';
import RouteAssignment from './pages/scheduling/RouteAssignment';

// Payroll & Incentives
import PayrollManagement from './pages/payroll/PayrollManagement';
import Incentives from './pages/payroll/Incentives';

// Dispatch & Operations
import RouteMonitoring from './pages/dispatch/RouteMonitoring';
import RescueOperations from './pages/dispatch/RescueOperations';
import StationMetrics from './pages/dispatch/StationMetrics';

// Safety & Compliance
import IncidentReporting from './pages/safety/IncidentReporting';
import SafetyCoaching from './pages/safety/SafetyCoaching';
import ComplianceTracking from './pages/safety/ComplianceTracking';

// Package Exceptions
import RTSTracking from './pages/packages/RTSTracking';
import LostPackages from './pages/packages/LostPackages';

// Inventory Management
import AssetManagement from './pages/inventory/AssetManagement';
import DamageTracking from './pages/inventory/DamageTracking';

// Analytics & Reporting
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route - Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Fleet Management */}
          <Route path="/fleet" element={
            <ProtectedRoute>
              <Layout>
                <FleetOverview />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/fleet/utilization" element={
            <ProtectedRoute>
              <Layout>
                <Utilization />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/fleet/inspections" element={
            <ProtectedRoute>
              <Layout>
                <Inspections />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/fleet/maintenance" element={
            <ProtectedRoute>
              <Layout>
                <Maintenance />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/fleet/alerts" element={
            <ProtectedRoute>
              <Layout>
                <Alerts />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Driver Management */}
          <Route path="/drivers" element={
            <ProtectedRoute>
              <Layout>
                <DriverOverview />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/drivers/documents" element={
            <ProtectedRoute>
              <Layout>
                <Documents />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/drivers/training" element={
            <ProtectedRoute>
              <Layout>
                <Training />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Scheduling & Attendance */}
          <Route path="/scheduling" element={
            <ProtectedRoute>
              <Layout>
                <ShiftScheduling />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/scheduling/attendance" element={
            <ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/scheduling/routes" element={
            <ProtectedRoute>
              <Layout>
                <RouteAssignment />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Payroll & Incentives */}
          <Route path="/payroll" element={
            <ProtectedRoute>
              <Layout>
                <PayrollManagement />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/payroll/incentives" element={
            <ProtectedRoute>
              <Layout>
                <Incentives />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Dispatch & Operations */}
          <Route path="/dispatch" element={
            <ProtectedRoute>
              <Layout>
                <RouteMonitoring />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dispatch/rescue" element={
            <ProtectedRoute>
              <Layout>
                <RescueOperations />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dispatch/metrics" element={
            <ProtectedRoute>
              <Layout>
                <StationMetrics />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Safety & Compliance */}
          <Route path="/safety" element={
            <ProtectedRoute>
              <Layout>
                <IncidentReporting />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/safety/coaching" element={
            <ProtectedRoute>
              <Layout>
                <SafetyCoaching />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/safety/compliance" element={
            <ProtectedRoute>
              <Layout>
                <ComplianceTracking />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Package Exceptions */}
          <Route path="/packages" element={
            <ProtectedRoute>
              <Layout>
                <RTSTracking />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/packages/lost" element={
            <ProtectedRoute>
              <Layout>
                <LostPackages />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Inventory Management */}
          <Route path="/inventory" element={
            <ProtectedRoute>
              <Layout>
                <AssetManagement />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/inventory/damage" element={
            <ProtectedRoute>
              <Layout>
                <DamageTracking />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Analytics & Reporting */}
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout>
                <AnalyticsDashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
