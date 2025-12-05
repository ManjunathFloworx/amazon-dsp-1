import { useState } from 'react';
import { mockFleetUtilization, mockVehicles } from '../../data/mockData';
import type { FleetUtilization } from '../../types/fleet';
import { TrendingUp, Package, MapPin, Clock } from 'lucide-react';

export default function Utilization() {
  const [utilization] = useState<FleetUtilization[]>(mockFleetUtilization);

  const getVehicleDetails = (vehicleId: string) => {
    const vehicle = mockVehicles.find((v) => v.id === vehicleId);
    return vehicle || null;
  };

  const totalHours = utilization.reduce((sum, u) => sum + u.hoursUsed, 0);
  const totalMiles = utilization.reduce((sum, u) => sum + u.milesDelivered, 0);
  const totalPackages = utilization.reduce((sum, u) => sum + u.packagesDelivered, 0);
  const totalRoutes = utilization.reduce((sum, u) => sum + u.routesCompleted, 0);

  const avgUtilization = totalHours / utilization.length || 0;
  const utilizationRate = (avgUtilization / 10) * 100; // Assuming 10 hours is max

  const stats = [
    {
      label: 'Total Packages Delivered',
      value: totalPackages.toLocaleString(),
      color: 'bg-blue-50 text-blue-600',
      icon: Package,
      change: '+12.5%',
    },
    {
      label: 'Total Miles Driven',
      value: totalMiles.toLocaleString(),
      color: 'bg-green-50 text-green-600',
      icon: MapPin,
      change: '+8.3%',
    },
    {
      label: 'Routes Completed',
      value: totalRoutes,
      color: 'bg-purple-50 text-purple-600',
      icon: TrendingUp,
      change: '+15.2%',
    },
    {
      label: 'Avg Fleet Utilization',
      value: `${utilizationRate.toFixed(1)}%`,
      color: 'bg-orange-50 text-orange-600',
      icon: Clock,
      change: '+5.7%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fleet Utilization</h1>
        <p className="text-gray-600">Track vehicle usage and productivity metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Vehicle Utilization Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Vehicle Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Miles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Packages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Routes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Idle Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {utilization.map((record) => {
                const vehicle = getVehicleDetails(record.vehicleId);
                const efficiency = record.hoursUsed > 0
                  ? (record.packagesDelivered / record.hoursUsed).toFixed(1)
                  : '0';
                const utilizationPercent = ((record.hoursUsed / 10) * 100).toFixed(0);

                return (
                  <tr key={record.vehicleId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle?.model || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">{vehicle?.plate || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-900">
                          {record.hoursUsed.toFixed(1)} hrs
                        </div>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${utilizationPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.milesDelivered.toLocaleString()} mi
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.packagesDelivered.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.routesCompleted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${
                        record.idleTime > 1 ? 'text-red-600 font-medium' : 'text-gray-900'
                      }`}>
                        {record.idleTime.toFixed(1)} hrs
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600">
                          {efficiency} pkg/hr
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {utilization
              .sort((a, b) => b.packagesDelivered - a.packagesDelivered)
              .slice(0, 3)
              .map((record, index) => {
                const vehicle = getVehicleDetails(record.vehicleId);
                return (
                  <div key={record.vehicleId} className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    } font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{vehicle?.model}</p>
                      <p className="text-xs text-gray-500">{vehicle?.plate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {record.packagesDelivered} packages
                      </p>
                      <p className="text-xs text-gray-500">
                        {record.milesDelivered} miles
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Underutilized Vehicles */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Underutilized Vehicles</h3>
          <div className="space-y-4">
            {utilization
              .filter((record) => record.hoursUsed < 6)
              .map((record) => {
                const vehicle = getVehicleDetails(record.vehicleId);
                const utilizationPercent = ((record.hoursUsed / 10) * 100).toFixed(0);
                return (
                  <div key={record.vehicleId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{vehicle?.model}</p>
                        <p className="text-xs text-gray-500">{vehicle?.plate}</p>
                      </div>
                      <span className="text-sm font-medium text-orange-600">
                        {utilizationPercent}% utilized
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${utilizationPercent}%` }}
                      />
                    </div>
                    {record.hoursUsed === 0 && (
                      <p className="text-xs text-red-600">Vehicle not used today</p>
                    )}
                  </div>
                );
              })}
            {utilization.filter((record) => record.hoursUsed < 6).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                All vehicles are well-utilized
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
