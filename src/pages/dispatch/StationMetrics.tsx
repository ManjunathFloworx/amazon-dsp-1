import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Clock, Package, AlertCircle, CheckCircle2, Activity } from 'lucide-react';
import type { StationMetrics } from '../../types/dispatch';

export default function StationMetricsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  // Mock data
  const todayMetrics: StationMetrics = {
    date: new Date().toISOString(),
    totalRoutes: 48,
    onTimeDeparts: 42,
    lateDeparts: 6,
    averageDepartDelay: 12,
    onRoadDeliveryRate: 94.5,
    rtsPackages: 87,
    rtsPercentage: 1.8,
    rescuesNeeded: 5,
    rescuesCompleted: 4,
  };

  const weekMetrics: StationMetrics[] = [
    {
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      totalRoutes: 45,
      onTimeDeparts: 40,
      lateDeparts: 5,
      averageDepartDelay: 10,
      onRoadDeliveryRate: 95.2,
      rtsPackages: 72,
      rtsPercentage: 1.6,
      rescuesNeeded: 4,
      rescuesCompleted: 4,
    },
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      totalRoutes: 47,
      onTimeDeparts: 43,
      lateDeparts: 4,
      averageDepartDelay: 8,
      onRoadDeliveryRate: 96.1,
      rtsPackages: 65,
      rtsPercentage: 1.4,
      rescuesNeeded: 3,
      rescuesCompleted: 3,
    },
    {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      totalRoutes: 46,
      onTimeDeparts: 41,
      lateDeparts: 5,
      averageDepartDelay: 11,
      onRoadDeliveryRate: 94.8,
      rtsPackages: 78,
      rtsPercentage: 1.7,
      rescuesNeeded: 6,
      rescuesCompleted: 5,
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      totalRoutes: 48,
      onTimeDeparts: 44,
      lateDeparts: 4,
      averageDepartDelay: 9,
      onRoadDeliveryRate: 95.5,
      rtsPackages: 69,
      rtsPercentage: 1.5,
      rescuesNeeded: 4,
      rescuesCompleted: 4,
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      totalRoutes: 47,
      onTimeDeparts: 39,
      lateDeparts: 8,
      averageDepartDelay: 15,
      onRoadDeliveryRate: 93.2,
      rtsPackages: 95,
      rtsPercentage: 2.1,
      rescuesNeeded: 7,
      rescuesCompleted: 6,
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      totalRoutes: 49,
      onTimeDeparts: 45,
      lateDeparts: 4,
      averageDepartDelay: 7,
      onRoadDeliveryRate: 96.8,
      rtsPackages: 58,
      rtsPercentage: 1.2,
      rescuesNeeded: 2,
      rescuesCompleted: 2,
    },
    todayMetrics,
  ];

  const avgWeekMetrics = {
    onTimeDeparts: 87.5,
    onRoadDeliveryRate: 95.2,
    rtsPercentage: 1.6,
    rescueRate: 10.4,
  };

  const lateDeparts = [
    { routeId: 'R023', routeName: 'East Valley', driver: 'Sarah Johnson', scheduledTime: '08:00', actualTime: '08:22', delay: 22 },
    { routeId: 'R015', routeName: 'North Side', driver: 'Mike Thompson', scheduledTime: '07:45', actualTime: '08:15', delay: 30 },
    { routeId: 'R031', routeName: 'Downtown', driver: 'Chris Martinez', scheduledTime: '08:15', actualTime: '08:28', delay: 13 },
    { routeId: 'R042', routeName: 'West End', driver: 'Jessica Lee', scheduledTime: '08:00', actualTime: '08:09', delay: 9 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">

        {/* Period Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('today')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              selectedPeriod === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              selectedPeriod === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              selectedPeriod === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              On-Time Departs
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {selectedPeriod === 'today' ? todayMetrics.onTimeDeparts : Math.round(avgWeekMetrics.onTimeDeparts)}
            <span className="text-lg text-gray-500">/{selectedPeriod === 'today' ? todayMetrics.totalRoutes : 336}</span>
          </div>
          <div className="text-sm text-green-600 mt-1">
            {selectedPeriod === 'today'
              ? `${((todayMetrics.onTimeDeparts / todayMetrics.totalRoutes) * 100).toFixed(1)}%`
              : `${avgWeekMetrics.onTimeDeparts.toFixed(1)}%`
            }
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              Late Departs
            </div>
            <TrendingDown className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-700">{todayMetrics.lateDeparts}</div>
          <div className="text-sm text-gray-600 mt-1">Avg delay: {todayMetrics.averageDepartDelay} min</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              On-Road Delivery Rate
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {selectedPeriod === 'today' ? todayMetrics.onRoadDeliveryRate : avgWeekMetrics.onRoadDeliveryRate}%
          </div>
          <div className="text-sm text-green-600 mt-1">Above target 93%</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Package className="w-4 h-4" />
              RTS Packages
            </div>
            <BarChart3 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{todayMetrics.rtsPackages}</div>
          <div className="text-sm text-gray-600 mt-1">{todayMetrics.rtsPercentage}% of total</div>
        </div>
      </div>

      {/* Late Departures Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Late Departures Today</h2>
          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
            {lateDeparts.length} routes
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Scheduled</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Delay</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lateDeparts.map((depart) => (
                <tr key={depart.routeId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{depart.routeName}</div>
                    <div className="text-sm text-gray-500">{depart.routeId}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{depart.driver}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{depart.scheduledTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{depart.actualTime}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        depart.delay > 20
                          ? 'bg-red-100 text-red-700'
                          : depart.delay > 10
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      +{depart.delay} min
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      On Route
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Trend */}
      {selectedPeriod === 'week' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Performance Trend</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Routes</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">On-Time %</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Delivery Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">RTS</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rescues</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {weekMetrics.map((day, index) => {
                  const onTimePercent = (day.onTimeDeparts / day.totalRoutes) * 100;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{day.totalRoutes}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className={`h-2 rounded-full ${
                                onTimePercent >= 90 ? 'bg-green-600' : onTimePercent >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                              }`}
                              style={{ width: `${onTimePercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{onTimePercent.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{day.onRoadDeliveryRate}%</td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{day.rtsPackages}</span>
                        <span className="text-xs text-gray-500 ml-1">({day.rtsPercentage}%)</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {day.rescuesCompleted}/{day.rescuesNeeded}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rescue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <Activity className="w-4 h-4" />
            Rescues Needed
          </div>
          <div className="text-3xl font-bold text-gray-900">{todayMetrics.rescuesNeeded}</div>
          <div className="text-sm text-gray-600 mt-1">
            {selectedPeriod === 'today' ? 'Today' : `Avg ${avgWeekMetrics.rescueRate}% of routes`}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            Rescues Completed
          </div>
          <div className="text-3xl font-bold text-green-700">{todayMetrics.rescuesCompleted}</div>
          <div className="text-sm text-green-600 mt-1">
            {((todayMetrics.rescuesCompleted / todayMetrics.rescuesNeeded) * 100).toFixed(0)}% completion rate
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <AlertCircle className="w-4 h-4" />
            Pending Rescues
          </div>
          <div className="text-3xl font-bold text-orange-700">
            {todayMetrics.rescuesNeeded - todayMetrics.rescuesCompleted}
          </div>
          <div className="text-sm text-orange-600 mt-1">Needs immediate attention</div>
        </div>
      </div>
    </div>
  );
}
