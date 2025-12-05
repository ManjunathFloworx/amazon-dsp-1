import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, FileText, GraduationCap, Wrench, ClipboardCheck, BarChart3, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [fleetExpanded, setFleetExpanded] = useState(true);
  const [driversExpanded, setDriversExpanded] = useState(true);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  ];

  const fleetNav = [
    { name: 'Fleet Overview', href: '/fleet', icon: Truck },
    { name: 'Maintenance', href: '/fleet/maintenance', icon: Wrench },
    { name: 'Inspections', href: '/fleet/inspections', icon: ClipboardCheck },
    { name: 'Utilization', href: '/fleet/utilization', icon: BarChart3 },
    { name: 'Alerts', href: '/fleet/alerts', icon: Bell },
  ];

  const driverNav = [
    { name: 'Overview', href: '/drivers', icon: Users },
    { name: 'Documents', href: '/drivers/documents', icon: FileText },
    { name: 'Training', href: '/drivers/training', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Amazon DSP</h1>
              <p className="text-xs text-gray-500">DSP-12345</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {/* Main Navigation */}
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}

            {/* Fleet Management Section */}
            <div className="pt-4">
              <button
                onClick={() => setFleetExpanded(!fleetExpanded)}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>Fleet Management</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${fleetExpanded ? 'rotate-180' : ''}`} />
              </button>
              {fleetExpanded && (
                <div className="mt-1 space-y-1">
                  {fleetNav.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Driver Management Section */}
            <div className="pt-4">
              <button
                onClick={() => setDriversExpanded(!driversExpanded)}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>Driver Management</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${driversExpanded ? 'rotate-180' : ''}`} />
              </button>
              {driversExpanded && (
                <div className="mt-1 space-y-1">
                  {driverNav.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
