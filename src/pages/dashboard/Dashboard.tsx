import { TrendingUp, TrendingDown, Truck, Users, Package, AlertCircle, Star, Award } from 'lucide-react';
import { mockVehicles, mockDrivers, mockAlerts, mockDriverAlerts, mockFleetUtilization } from '../../data/mockData';

export default function Dashboard() {
  // Calculate stats
  const totalVehicles = mockVehicles.length;
  const activeVehicles = mockVehicles.filter(v => v.status === 'active').length;
  const vehiclesInMaintenance = mockVehicles.filter(v => v.status === 'maintenance').length;

  const totalDrivers = mockDrivers.length;
  const activeDrivers = mockDrivers.filter(d => d.status === 'active').length;
  const driversOnLeave = mockDrivers.filter(d => d.status === 'on_leave').length;

  const criticalAlerts = [...mockAlerts, ...mockDriverAlerts].filter(a => !a.resolved && a.severity === 'critical').length;
  const highAlerts = [...mockAlerts, ...mockDriverAlerts].filter(a => !a.resolved && a.severity === 'high').length;

  // Calculate today's utilization
  const todayUtilization = mockFleetUtilization.reduce((acc, u) => ({
    packages: acc.packages + u.packagesDelivered,
    miles: acc.miles + u.milesDelivered,
    routes: acc.routes + u.routesCompleted,
  }), { packages: 0, miles: 0, routes: 0 });

  const avgDriverScore = mockDrivers
    .filter(d => d.deliveryScore)
    .reduce((acc, d) => acc + (d.deliveryScore || 0), 0) / mockDrivers.filter(d => d.deliveryScore).length;

  const stats = [
    {
      label: 'Active Vehicles',
      value: activeVehicles,
      total: totalVehicles,
      icon: Truck,
      gradient: 'from-blue-400 to-blue-500',
      trend: '+2',
      trendPositive: true,
    },
    {
      label: 'Active Drivers',
      value: activeDrivers,
      total: totalDrivers,
      icon: Users,
      gradient: 'from-blue-400 to-blue-500',
      trend: '+3',
      trendPositive: true,
    },
    {
      label: "Today's Deliveries",
      value: todayUtilization.packages,
      icon: Package,
      gradient: 'from-blue-400 to-blue-500',
      trend: '+12%',
      trendPositive: true,
    },
    {
      label: 'Critical Alerts',
      value: criticalAlerts + highAlerts,
      icon: AlertCircle,
      gradient: 'from-blue-400 to-blue-500',
      trend: '-2',
      trendPositive: false,
    },
  ];

  const recentAlerts = [...mockAlerts, ...mockDriverAlerts]
    .filter(a => !a.resolved)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const topDrivers = [...mockDrivers]
    .filter(d => d.deliveryScore)
    .sort((a, b) => (b.deliveryScore || 0) - (a.deliveryScore || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .glass-card-dark {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gradient-border {
          position: relative;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5)) border-box;
          border: 2px solid transparent;
        }
      `}</style>

      {/* Quick Actions with Glassmorphism */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="group relative overflow-hidden glass-card p-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-600 font-medium">Quick Add</p>
              <p className="text-sm font-bold text-gray-900">New Vehicle</p>
            </div>
          </div>
        </button>

        <button className="group relative overflow-hidden glass-card p-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg group-hover:shadow-green-500/50 transition-shadow">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-600 font-medium">Quick Add</p>
              <p className="text-sm font-bold text-gray-900">New Driver</p>
            </div>
          </div>
        </button>

        <button className="group relative overflow-hidden glass-card p-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-600 font-medium">View</p>
              <p className="text-sm font-bold text-gray-900">Packages</p>
            </div>
          </div>
        </button>

        <button className="group relative overflow-hidden glass-card p-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg group-hover:shadow-red-500/50 transition-shadow">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-600 font-medium">View</p>
              <p className="text-sm font-bold text-gray-900">All Alerts</p>
            </div>
          </div>
        </button>
      </div>

      {/* Stats Grid with Beautiful Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trendPositive ? TrendingUp : TrendingDown;

          return (
            <div key={stat.label} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-90`}></div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>

              {/* Animated Circle */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              {/* Content */}
              <div className="relative p-6 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                    stat.trendPositive ? 'bg-white/20' : 'bg-black/20'
                  } backdrop-blur-sm border border-white/30`}>
                    <TrendIcon className="w-3.5 h-3.5" />
                    {stat.trend}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white/90 mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold drop-shadow-lg">{stat.value}</p>
                    {stat.total && (
                      <p className="text-lg text-white/80">/ {stat.total}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid with Glassmorphism */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Status */}
        <div className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Fleet Status</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Active</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{activeVehicles}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Maintenance</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{vehiclesInMaintenance}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Flagged</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {mockVehicles.filter(v => v.status === 'flagged').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Inactive</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {mockVehicles.filter(v => v.status === 'inactive').length}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Fleet Utilization</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(activeVehicles / totalVehicles) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {Math.round((activeVehicles / totalVehicles) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Driver Performance */}
        <div className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Driver Performance</h2>
          </div>
          <div className="space-y-3">
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Delivery Score</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{avgDriverScore.toFixed(1)}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-200/50 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Safety Score</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {(mockDrivers.filter(d => d.safetyScore).reduce((acc, d) => acc + (d.safetyScore || 0), 0) /
                    mockDrivers.filter(d => d.safetyScore).length).toFixed(1)}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/50 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Customer Rating</span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {(mockDrivers.filter(d => d.customerRating).reduce((acc, d) => acc + (d.customerRating || 0), 0) /
                      mockDrivers.filter(d => d.customerRating).length).toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200/50">
            <div className="text-sm font-semibold text-gray-700 mb-3">Driver Status</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-50/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-700">Active</span>
                </div>
                <span className="font-bold text-gray-900">{activeDrivers}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">On Leave</span>
                </div>
                <span className="font-bold text-gray-900">{driversOnLeave}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Training</span>
                </div>
                <span className="font-bold text-gray-900">
                  {mockDrivers.filter(d => d.mentorStatus === 'in_progress').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Operations */}
        <div className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Today's Operations</h2>
          </div>
          <div className="space-y-5">
            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Packages Delivered</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{todayUtilization.packages}</span>
              </div>
              <div className="relative h-3 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/50" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1.5 font-medium">Target: 1200 packages</p>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Miles Delivered</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{todayUtilization.miles}</span>
              </div>
              <div className="relative h-3 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-green-500/50" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1.5 font-medium">Target: 650 miles</p>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Routes Completed</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{todayUtilization.routes}</span>
              </div>
              <div className="relative h-3 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-500/50" style={{ width: '83%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1.5 font-medium">Target: 12 routes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Recent Alerts</h2>
            </div>
            <span className="px-3 py-1 bg-red-100/70 backdrop-blur-sm text-xs font-bold text-red-700 rounded-full border border-red-200/50">{recentAlerts.length} active</span>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="group relative overflow-hidden p-4 glass-card rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    alert.severity === 'critical' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                    alert.severity === 'high' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                    'bg-gradient-to-br from-yellow-500 to-yellow-600'
                  }`}>
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
                        alert.severity === 'critical' ? 'bg-red-100/70 text-red-700 border border-red-200/50' :
                        alert.severity === 'high' ? 'bg-orange-100/70 text-orange-700 border border-orange-200/50' :
                        'bg-yellow-100/70 text-yellow-700 border border-yellow-200/50'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-600 font-medium">
                        {alert.date.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Top Performers</h2>
          </div>
          <div className="space-y-3">
            {topDrivers.map((driver, index) => (
              <div key={driver.id} className="group relative overflow-hidden flex items-center gap-4 p-4 glass-card rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm shadow-lg ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                  'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                }`}>
                  {index + 1}
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{driver.firstName} {driver.lastName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium text-gray-600">Score: {driver.deliveryScore?.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs font-medium text-gray-600">{driver.totalDeliveries} deliveries</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100/70 backdrop-blur-sm rounded-full border border-yellow-200/50">
                  <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">{driver.customerRating}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
