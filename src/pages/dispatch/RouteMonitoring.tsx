import { Map, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { DriverLocation } from '../../types/dispatch';

export default function RouteMonitoring() {
  // Mock data
  const drivers: DriverLocation[] = [
    {
      driverId: 'D001',
      driverName: 'John Smith',
      latitude: 37.7749,
      longitude: -122.4194,
      routeId: 'R001',
      routeName: 'Downtown Zone A',
      status: 'on-route',
      completionPercentage: 65,
      packagesRemaining: 45,
      stopsRemaining: 38,
      lastUpdate: new Date().toISOString(),
      speed: 25,
      estimatedCompletion: '16:30',
    },
    {
      driverId: 'D002',
      driverName: 'Sarah Johnson',
      latitude: 37.7849,
      longitude: -122.4094,
      routeId: 'R002',
      routeName: 'Suburbs Zone B',
      status: 'stalled',
      completionPercentage: 42,
      packagesRemaining: 78,
      stopsRemaining: 65,
      lastUpdate: new Date(Date.now() - 1800000).toISOString(),
      speed: 0,
      estimatedCompletion: '19:45',
    },
    {
      driverId: 'D003',
      driverName: 'Mike Davis',
      latitude: 37.7649,
      longitude: -122.4294,
      routeId: 'R003',
      routeName: 'Industrial Park',
      status: 'zero-movement',
      completionPercentage: 28,
      packagesRemaining: 92,
      stopsRemaining: 81,
      lastUpdate: new Date(Date.now() - 3600000).toISOString(),
      speed: 0,
      estimatedCompletion: '21:00',
    },
  ];

  const stats = {
    totalDrivers: 45,
    onRoute: 38,
    stalled: 5,
    zeroMovement: 2,
    avgCompletion: 58,
  };

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Activity className="w-4 h-4" />
            Total Drivers
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalDrivers}</div>
        </div>

        <div className="bg-green-50 border-green-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
            <CheckCircle className="w-4 h-4" />
            On Route
          </div>
          <div className="text-2xl font-bold text-green-700">{stats.onRoute}</div>
        </div>

        <div className="bg-orange-50 border-orange-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-orange-700 text-sm mb-1">
            <Clock className="w-4 h-4" />
            Stalled
          </div>
          <div className="text-2xl font-bold text-orange-700">{stats.stalled}</div>
        </div>

        <div className="bg-red-50 border-red-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-red-700 text-sm mb-1">
            <AlertTriangle className="w-4 h-4" />
            Zero Movement
          </div>
          <div className="text-2xl font-bold text-red-700">{stats.zeroMovement}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Activity className="w-4 h-4" />
            Avg Completion
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.avgCompletion}%</div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 h-96 flex items-center justify-center border-b border-gray-200">
          <div className="text-center">
            <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Map View</p>
            <p className="text-sm text-gray-500 mt-1">
              Integrate with Google Maps API to show real-time driver locations
            </p>
          </div>
        </div>
      </div>

      {/* Driver List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Drivers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Route
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Remaining
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Speed
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Last Update
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  ETA
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.map((driver) => (
                <tr key={driver.driverId} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{driver.driverName}</div>
                    <div className="text-sm text-gray-500">{driver.driverId}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{driver.routeName}</div>
                    <div className="text-xs text-gray-500">{driver.routeId}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                        <div
                          className={`h-2 rounded-full ${
                            driver.completionPercentage > 70
                              ? 'bg-green-600'
                              : driver.completionPercentage > 40
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                          }`}
                          style={{ width: `${driver.completionPercentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {driver.completionPercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{driver.packagesRemaining} pkgs</div>
                    <div className="text-xs text-gray-500">{driver.stopsRemaining} stops</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{driver.speed} mph</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(driver.lastUpdate).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        driver.status === 'on-route'
                          ? 'bg-green-100 text-green-700'
                          : driver.status === 'stalled'
                            ? 'bg-orange-100 text-orange-700'
                            : driver.status === 'zero-movement'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {driver.status === 'on-route' && <CheckCircle className="w-3 h-3" />}
                      {driver.status === 'stalled' && <Clock className="w-3 h-3" />}
                      {driver.status === 'zero-movement' && <AlertTriangle className="w-3 h-3" />}
                      {driver.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{driver.estimatedCompletion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
