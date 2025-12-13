import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, FileText, GraduationCap, Wrench, ClipboardCheck, BarChart3, Bell, Calendar, Clock, DollarSign, Award, MapPin, Map, Shield, PackageX, Package, TrendingUp, Activity, AlertTriangle, Search, AlertCircle, LogOut, User, Settings, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
    { name: 'Fleet', href: '/fleet', icon: Truck },
    { name: 'Drivers', href: '/drivers', icon: Users },
    { name: 'Scheduling', href: '/scheduling', icon: Calendar },
    { name: 'Payroll', href: '/payroll', icon: DollarSign },
    { name: 'Dispatch', href: '/dispatch', icon: Map },
    { name: 'Safety', href: '/safety', icon: Shield },
    { name: 'Packages', href: '/packages', icon: PackageX },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
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
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
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
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active
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

        {/* Floworx Company Info Section */}
        <div className="px-4 py-4 mx-4 my-2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl shadow-lg relative overflow-hidden group">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-white mb-1">Powered by Floworx</h3>
                <p className="text-xs text-white/90 leading-relaxed">
                  Advanced logistics platform for modern delivery operations
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="text-xs text-white font-medium">Real-time</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-300" />
                  <span className="text-xs text-white font-medium">Secure</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-between">
              <p className="text-xs text-white/70">© 2025 Floworx Tech</p>
              <a
                href="https://www.floworx.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white font-medium hover:text-white/80 transition-colors flex items-center gap-1"
              >
                Visit Site
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Logout Button - Fixed at Bottom */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 px-3 py-2 rounded-lg text-md font-medium text-gray-700 bg-red-200 hover:bg-red-300 transition-all duration-300 w-full hover:shadow-lg"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-gray-800 group-hover:scale-125 group-hover:font-bold transition-all duration-300 origin-left">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header with User Profile */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {isDashboard && 'Dashboard'}
                {isFleetSection && 'Fleet Management'}
                {isDriversSection && 'Driver Management'}
                {isSchedulingSection && 'Scheduling & Attendance'}
                {isPayrollSection && 'Payroll & Incentives'}
                {isDispatchSection && 'Dispatch & Operations'}
                {isSafetySection && 'Safety & Compliance'}
                {isPackagesSection && 'Package Exceptions'}
                {isInventorySection && 'Inventory Management'}
                {isAnalyticsSection && 'Analytics & Reporting'}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">Welcome back, manage your operations</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">John Smith</p>
                  <p className="text-xs text-gray-500">DSP Manager</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${active
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

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
