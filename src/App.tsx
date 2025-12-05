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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
