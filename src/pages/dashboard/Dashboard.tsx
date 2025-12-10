import { TrendingUp, TrendingDown, Truck, Users, Package, AlertCircle, Star } from 'lucide-react';
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
      color: 'blue',
      trend: '+2',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
    },
    {
      label: 'Active Drivers',
      value: activeDrivers,
      total: totalDrivers,
      icon: Users,
      color: 'green',
      trend: '+3',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
    },
    {
      label: "Today's Deliveries",
      value: todayUtilization.packages,
      icon: Package,
      color: 'purple',
      trend: '+12%',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-600',
    },
    {
      label: 'Critical Alerts',
      value: criticalAlerts + highAlerts,
      icon: AlertCircle,
      color: 'red',
      trend: '-2',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      textColor: 'text-red-600',
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all group">
          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">Quick Add</p>
            <p className="text-sm font-semibold text-gray-900">New Vehicle</p>
          </div>
        </button>

        <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all group">
          <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">Quick Add</p>
            <p className="text-sm font-semibold text-gray-900">New Driver</p>
          </div>
        </button>

        <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all group">
          <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">View</p>
            <p className="text-sm font-semibold text-gray-900">Packages</p>
          </div>
        </button>

        <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-red-300 transition-all group">
          <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">View</p>
            <p className="text-sm font-semibold text-gray-900">All Alerts</p>
          </div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend.startsWith('+');
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;

          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {stat.total && (
                    <p className="text-sm text-gray-500">/ {stat.total}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fleet Status</h2>
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
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Driver Performance</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-600">Avg Delivery Score</span>
              <span className="text-lg font-bold text-blue-600">{avgDriverScore.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Avg Safety Score</span>
              <span className="text-lg font-bold text-green-600">
                {(mockDrivers.filter(d => d.safetyScore).reduce((acc, d) => acc + (d.safetyScore || 0), 0) /
                  mockDrivers.filter(d => d.safetyScore).length).toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-600">Avg Customer Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
                <span className="text-lg font-bold text-purple-600">
                  {(mockDrivers.filter(d => d.customerRating).reduce((acc, d) => acc + (d.customerRating || 0), 0) /
                    mockDrivers.filter(d => d.customerRating).length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Driver Status</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Active</span>
                <span className="font-semibold text-gray-900">{activeDrivers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">On Leave</span>
                <span className="font-semibold text-gray-900">{driversOnLeave}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Training</span>
                <span className="font-semibold text-gray-900">
                  {mockDrivers.filter(d => d.mentorStatus === 'in_progress').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Operations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Operations</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Packages Delivered</span>
                <span className="text-2xl font-bold text-gray-900">{todayUtilization.packages}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Target: 1200 packages</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Miles Delivered</span>
                <span className="text-2xl font-bold text-gray-900">{todayUtilization.miles}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Target: 650 miles</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Routes Completed</span>
                <span className="text-2xl font-bold text-gray-900">{todayUtilization.routes}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '83%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Target: 12 routes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <span className="text-xs text-gray-500">{recentAlerts.length} active</span>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <AlertCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  alert.severity === 'critical' ? 'text-red-600' :
                  alert.severity === 'high' ? 'text-orange-600' : 'text-yellow-600'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 line-clamp-2">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {alert.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h2>
          <div className="space-y-3">
            {topDrivers.map((driver, index) => (
              <div key={driver.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{driver.firstName} {driver.lastName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">Score: {driver.deliveryScore?.toFixed(1)}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{driver.totalDeliveries} deliveries</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">{driver.customerRating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
