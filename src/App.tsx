import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/fleet/Layout';

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
      <Layout>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Fleet Management */}
          <Route path="/fleet" element={<FleetOverview />} />
          <Route path="/fleet/maintenance" element={<Maintenance />} />
          <Route path="/fleet/inspections" element={<Inspections />} />
          <Route path="/fleet/utilization" element={<Utilization />} />
          <Route path="/fleet/alerts" element={<Alerts />} />

          {/* Driver Management */}
          <Route path="/drivers" element={<DriverOverview />} />
          <Route path="/drivers/documents" element={<Documents />} />
          <Route path="/drivers/training" element={<Training />} />

          {/* Scheduling & Attendance */}
          <Route path="/scheduling" element={<ShiftScheduling />} />
          <Route path="/scheduling/attendance" element={<Attendance />} />
          <Route path="/scheduling/routes" element={<RouteAssignment />} />

          {/* Payroll & Incentives */}
          <Route path="/payroll" element={<PayrollManagement />} />
          <Route path="/payroll/incentives" element={<Incentives />} />

          {/* Dispatch & Operations */}
          <Route path="/dispatch" element={<RouteMonitoring />} />
          <Route path="/dispatch/rescue" element={<RescueOperations />} />
          <Route path="/dispatch/metrics" element={<StationMetrics />} />

          {/* Safety & Compliance */}
          <Route path="/safety" element={<IncidentReporting />} />
          <Route path="/safety/coaching" element={<SafetyCoaching />} />
          <Route path="/safety/compliance" element={<ComplianceTracking />} />

          {/* Package Exceptions */}
          <Route path="/packages" element={<RTSTracking />} />
          <Route path="/packages/lost" element={<LostPackages />} />

          {/* Inventory Management */}
          <Route path="/inventory" element={<AssetManagement />} />
          <Route path="/inventory/damage" element={<DamageTracking />} />

          {/* Analytics & Reporting */}
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
