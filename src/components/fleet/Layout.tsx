import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, FileText, GraduationCap, Wrench, ClipboardCheck, BarChart3, Bell, Calendar, Clock, DollarSign, Award, MapPin, Map, Shield, PackageX, Package, TrendingUp, Activity, AlertTriangle, Search, AlertCircle } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isDashboard = location.pathname === '/';
  const isFleetSection = location.pathname.startsWith('/fleet');
  const isDriversSection = location.pathname.startsWith('/drivers');
  const isSchedulingSection = location.pathname.startsWith('/scheduling');
  const isPayrollSection = location.pathname.startsWith('/payroll');
  const isDispatchSection = location.pathname.startsWith('/dispatch');
  const isSafetySection = location.pathname.startsWith('/safety');
  const isPackagesSection = location.pathname.startsWith('/packages');
  const isInventorySection = location.pathname.startsWith('/inventory');
  const isAnalyticsSection = location.pathname.startsWith('/analytics');

  // Sidebar main sections
  const sidebarSections = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Fleet Management', href: '/fleet', icon: Truck },
    { name: 'Driver Management', href: '/drivers', icon: Users },
    { name: 'Scheduling & Attendance', href: '/scheduling', icon: Calendar },
    { name: 'Payroll & Incentives', href: '/payroll', icon: DollarSign },
    { name: 'Dispatch & Operations', href: '/dispatch', icon: Map },
    { name: 'Safety & Compliance', href: '/safety', icon: Shield },
    { name: 'Package Exceptions', href: '/packages', icon: PackageX },
    { name: 'Inventory Management', href: '/inventory', icon: Package },
    { name: 'Analytics & Reporting', href: '/analytics', icon: TrendingUp },
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

  const schedulingNav = [
    { name: 'Shift Scheduling', href: '/scheduling', icon: Calendar },
    { name: 'Attendance', href: '/scheduling/attendance', icon: Clock },
    { name: 'Route Assignment', href: '/scheduling/routes', icon: MapPin },
  ];

  const payrollNav = [
    { name: 'Payroll', href: '/payroll', icon: DollarSign },
    { name: 'Incentives', href: '/payroll/incentives', icon: Award },
  ];

  const dispatchNav = [
    { name: 'Route Monitoring', href: '/dispatch', icon: Map },
    { name: 'Rescue Operations', href: '/dispatch/rescue', icon: Activity },
    { name: 'Station Metrics', href: '/dispatch/metrics', icon: BarChart3 },
  ];

  const safetyNav = [
    { name: 'Incident Reporting', href: '/safety', icon: AlertTriangle },
    { name: 'Safety Coaching', href: '/safety/coaching', icon: GraduationCap },
    { name: 'Compliance Tracking', href: '/safety/compliance', icon: Shield },
  ];

  const packagesNav = [
    { name: 'RTS Tracking', href: '/packages', icon: PackageX },
    { name: 'Lost Packages', href: '/packages/lost', icon: Search },
  ];

  const inventoryNav = [
    { name: 'Asset Management', href: '/inventory', icon: Package },
    { name: 'Damage Tracking', href: '/inventory/damage', icon: AlertCircle },
  ];

  const analyticsNav = [
    { name: 'Analytics Dashboard', href: '/analytics', icon: TrendingUp },
  ];

  const currentNavItems = isFleetSection
    ? fleetNav
    : isDriversSection
      ? driverNav
      : isSchedulingSection
        ? schedulingNav
        : isPayrollSection
          ? payrollNav
          : isDispatchSection
            ? dispatchNav
            : isSafetySection
              ? safetyNav
              : isPackagesSection
                ? packagesNav
                : isInventorySection
                  ? inventoryNav
                  : isAnalyticsSection
                    ? analyticsNav
                    : [];

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
            {sidebarSections.map((item) => {
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
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar - Only show when not on Dashboard */}
        {!isDashboard && (
          <div className="bg-white border-b border-gray-200">
            <div className="flex items-center gap-1 px-6 overflow-x-auto">
              {currentNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      active
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
