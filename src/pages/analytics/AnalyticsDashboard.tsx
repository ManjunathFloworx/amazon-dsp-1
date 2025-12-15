import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Package, Shield, AlertCircle, Target } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

  const driverPerformance = {
    topPerformers: [
      { id: 'D015', name: 'Mike Thompson', otd: 99.2, sph: 18.5, score: 950, rank: 1 },
      { id: 'D023', name: 'Sarah Williams', otd: 98.1, sph: 17.8, score: 890, rank: 2 },
      { id: 'D042', name: 'Tom Jackson', otd: 96.5, sph: 16.2, score: 825, rank: 3 },
    ],
    averageOTD: 95.8,
    averageSPH: 16.1,
    averageScore: 845,
  };

  const rescueMetrics = {
    rescuesNeeded: 25,
    rescuesCompleted: 22,
    rescueRate: 10.4,
    avgPackagesRescued: 56,
    costPerRescue: 85,
    totalRescueCost: 2125,
    trend: 'declining',
  };

  const vehicleHealth = {
    totalVehicles: 48,
    operationalVehicles: 45,
    inMaintenance: 2,
    outOfService: 1,
    avgMaintenanceCost: 450,
    totalMaintenanceCost: 12650,
    upcomingMaintenance: 8,
  };

  const safetyMetrics = {
    fleetSafetyScore: 850,
    avgMentorScore: 845,
    accidents: 2,
    customerComplaints: 8,
    coachingSessions: 15,
    complianceRate: 94.5,
  };

  const financialData = {
    weeklyRevenue: 185000,
    weeklyPayroll: 52000,
    weeklyExpenses: 28500,
    profitMargin: 56.5,
    costPerPackage: 1.85,
    revenuePerPackage: 3.25,
    projectedMonthlyRevenue: 740000,
    projectedMonthlyProfit: 418100,
  };

  const operationalKPIs = {
    packagesDelivered: 42350,
    stopsCompleted: 38120,
    routesCompleted: 336,
    onTimeDelivery: 95.8,
    deliveryCompletion: 98.2,
    rtsPackages: 487,
    rtsRate: 1.15,
  };

  return (
    <div className="space-y-6">

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Target className="w-4 h-4" />
              On-Time Delivery
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{operationalKPIs.onTimeDelivery}%</div>
          <div className="text-sm text-green-600 mt-1">+2.3% from last week</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Package className="w-4 h-4" />
              Packages Delivered
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {operationalKPIs.packagesDelivered.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">{operationalKPIs.routesCompleted} routes completed</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Shield className="w-4 h-4" />
              Fleet Safety Score
            </div>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-700">{safetyMetrics.fleetSafetyScore}</div>
          <div className="text-sm text-blue-600 mt-1">Great tier</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <DollarSign className="w-4 h-4" />
              Profit Margin
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-700">{financialData.profitMargin}%</div>
          <div className="text-sm text-gray-600 mt-1">${financialData.weeklyRevenue.toLocaleString()} revenue</div>
        </div>
      </div>

      <div className="flex items-center justify-end">

        {/* Period Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('today')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${selectedPeriod === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            Today
          </button>
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${selectedPeriod === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${selectedPeriod === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Driver Performance */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Driver Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">OTD %</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">SPH</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {driverPerformance.topPerformers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${driver.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                          driver.rank === 2 ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                        }`}>
                        {driver.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{driver.name}</div>
                    <div className="text-sm text-gray-500">{driver.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${driver.otd}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{driver.otd}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.sph}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{driver.score}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Fantastic
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Fleet Avg OTD:</span>{' '}
              <span className="font-semibold text-gray-900">{driverPerformance.averageOTD}%</span>
            </div>
            <div>
              <span className="text-gray-600">Fleet Avg SPH:</span>{' '}
              <span className="font-semibold text-gray-900">{driverPerformance.averageSPH}</span>
            </div>
            <div>
              <span className="text-gray-600">Fleet Avg Score:</span>{' '}
              <span className="font-semibold text-gray-900">{driverPerformance.averageScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rescue Operations & Vehicle Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rescue Metrics */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Rescue Operations</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Rescue Rate</div>
                <div className="text-2xl font-bold text-orange-700">{rescueMetrics.rescueRate}%</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  Improving
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Completion Rate</div>
                <div className="text-2xl font-bold text-green-700">
                  {((rescueMetrics.rescuesCompleted / rescueMetrics.rescuesNeeded) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">{rescueMetrics.rescuesCompleted}/{rescueMetrics.rescuesNeeded}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Avg Packages Rescued</span>
                <span className="font-semibold text-gray-900">{rescueMetrics.avgPackagesRescued}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Cost Per Rescue</span>
                <span className="font-semibold text-red-700">${rescueMetrics.costPerRescue}</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
                <span className="text-gray-600 font-medium">Total Rescue Cost</span>
                <span className="font-bold text-red-700">${rescueMetrics.totalRescueCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Health */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Vehicle Health & Maintenance</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Operational</div>
                <div className="text-2xl font-bold text-green-700">{vehicleHealth.operationalVehicles}</div>
                <div className="text-xs text-gray-500 mt-1">of {vehicleHealth.totalVehicles}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">In Maintenance</div>
                <div className="text-2xl font-bold text-yellow-700">{vehicleHealth.inMaintenance}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Out of Service</div>
                <div className="text-2xl font-bold text-red-700">{vehicleHealth.outOfService}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Avg Maintenance Cost</span>
                <span className="font-semibold text-gray-900">${vehicleHealth.avgMaintenanceCost}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Upcoming Maintenance</span>
                <span className="font-semibold text-orange-700">{vehicleHealth.upcomingMaintenance} vehicles</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
                <span className="text-gray-600 font-medium">Total Maintenance Cost</span>
                <span className="font-bold text-gray-900">${vehicleHealth.totalMaintenanceCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-6">Financial Overview - This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-blue-200 text-sm mb-1">Weekly Revenue</div>
            <div className="text-3xl font-bold">${financialData.weeklyRevenue.toLocaleString()}</div>
            <div className="text-blue-200 text-sm mt-1">${financialData.revenuePerPackage}/package</div>
          </div>
          <div>
            <div className="text-blue-200 text-sm mb-1">Payroll</div>
            <div className="text-3xl font-bold">${financialData.weeklyPayroll.toLocaleString()}</div>
            <div className="text-blue-200 text-sm mt-1">{((financialData.weeklyPayroll / financialData.weeklyRevenue) * 100).toFixed(1)}% of revenue</div>
          </div>
          <div>
            <div className="text-blue-200 text-sm mb-1">Expenses</div>
            <div className="text-3xl font-bold">${financialData.weeklyExpenses.toLocaleString()}</div>
            <div className="text-blue-200 text-sm mt-1">{((financialData.weeklyExpenses / financialData.weeklyRevenue) * 100).toFixed(1)}% of revenue</div>
          </div>
          <div>
            <div className="text-blue-200 text-sm mb-1">Net Profit</div>
            <div className="text-3xl font-bold">
              ${(financialData.weeklyRevenue - financialData.weeklyPayroll - financialData.weeklyExpenses).toLocaleString()}
            </div>
            <div className="text-blue-200 text-sm mt-1">{financialData.profitMargin}% margin</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-blue-200 text-sm mb-1">Projected Monthly Revenue</div>
              <div className="text-2xl font-bold">${financialData.projectedMonthlyRevenue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1">Projected Monthly Profit</div>
              <div className="text-2xl font-bold text-green-300">${financialData.projectedMonthlyProfit.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Compliance Overview */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Safety & Compliance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Shield className="w-4 h-4" />
                Fleet Safety Score
              </div>
              <div className="text-3xl font-bold text-blue-700">{safetyMetrics.fleetSafetyScore}</div>
              <div className="text-sm text-blue-600 mt-1">Great Tier</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Users className="w-4 h-4" />
                Avg Mentor Score
              </div>
              <div className="text-3xl font-bold text-green-700">{safetyMetrics.avgMentorScore}</div>
              <div className="text-sm text-green-600 mt-1">Above target</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <AlertCircle className="w-4 h-4" />
                Accidents
              </div>
              <div className="text-3xl font-bold text-orange-700">{safetyMetrics.accidents}</div>
              <div className="text-sm text-gray-600 mt-1">This week</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Package className="w-4 h-4" />
                Customer Complaints
              </div>
              <div className="text-3xl font-bold text-gray-900">{safetyMetrics.customerComplaints}</div>
              <div className="text-sm text-gray-600 mt-1">0.02% rate</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Users className="w-4 h-4" />
                Coaching Sessions
              </div>
              <div className="text-3xl font-bold text-gray-900">{safetyMetrics.coachingSessions}</div>
              <div className="text-sm text-gray-600 mt-1">This week</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Target className="w-4 h-4" />
                Compliance Rate
              </div>
              <div className="text-3xl font-bold text-green-700">{safetyMetrics.complianceRate}%</div>
              <div className="text-sm text-green-600 mt-1">On target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <Package className="w-4 h-4" />
            Delivery Completion
          </div>
          <div className="text-3xl font-bold text-gray-900">{operationalKPIs.deliveryCompletion}%</div>
          <div className="text-sm text-gray-600 mt-1">
            {operationalKPIs.stopsCompleted.toLocaleString()} stops completed
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <AlertCircle className="w-4 h-4" />
            RTS Rate
          </div>
          <div className="text-3xl font-bold text-orange-700">{operationalKPIs.rtsRate}%</div>
          <div className="text-sm text-gray-600 mt-1">
            {operationalKPIs.rtsPackages} packages
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Cost Per Package
          </div>
          <div className="text-3xl font-bold text-gray-900">${financialData.costPerPackage}</div>
          <div className="text-sm text-green-600 mt-1">
            ${financialData.revenuePerPackage} revenue per package
          </div>
        </div>
      </div>
    </div>
  );
}
