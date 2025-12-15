import { useState } from 'react';
import {
  Award,
  TrendingUp,
  Trophy,
  Shield,
  Clock,
  Users,
  DollarSign,
  Plus,
} from 'lucide-react';
import type { Incentive, IncentiveRule } from '../../types/payroll';

export default function Incentives() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data
  const incentives: Incentive[] = [
    {
      id: 'I001',
      driverId: 'D001',
      driverName: 'John Smith',
      type: 'on-time-departure',
      date: '2024-12-05',
      amount: 25,
      description: 'Departed on time for morning route',
      shiftId: 'S001',
      routeId: 'R001',
      metricValue: 100,
    },
    {
      id: 'I002',
      driverId: 'D002',
      driverName: 'Sarah Johnson',
      type: 'safety-bonus',
      date: '2024-12-05',
      amount: 50,
      description: 'Maintained 100 Mentor score for 30 days',
      metricValue: 100,
    },
    {
      id: 'I003',
      driverId: 'D003',
      driverName: 'Mike Davis',
      type: 'rescue-route',
      date: '2024-12-05',
      amount: 35,
      description: 'Completed rescue route for Zone B',
      shiftId: 'S005',
      routeId: 'R005',
    },
    {
      id: 'I004',
      driverId: 'D001',
      driverName: 'John Smith',
      type: 'performance-bonus',
      date: '2024-12-04',
      amount: 40,
      description: 'Delivered 250+ packages with 0 issues',
      metricValue: 267,
    },
  ];

  const incentiveRules: IncentiveRule[] = [
    {
      id: 'IR001',
      type: 'on-time-departure',
      name: 'On-Time Departure',
      description: 'Bonus for departing within scheduled time window',
      amount: 25,
      isActive: true,
      conditions: {
        onTimeDepartureThreshold: 5,
      },
    },
    {
      id: 'IR002',
      type: 'safety-bonus',
      name: 'Safety Bonus',
      description: 'Bonus for maintaining high Mentor score',
      amount: 50,
      isActive: true,
      conditions: {
        minMentorScore: 850,
      },
    },
    {
      id: 'IR003',
      type: 'rescue-route',
      name: 'Rescue Route',
      description: 'Bonus for completing rescue routes',
      amount: 35,
      isActive: true,
      conditions: {},
    },
    {
      id: 'IR004',
      type: 'performance-bonus',
      name: 'Performance Bonus',
      description: 'Bonus for high package delivery count',
      amount: 40,
      isActive: true,
      conditions: {
        minPackagesDelivered: 250,
      },
    },
    {
      id: 'IR005',
      type: 'complaint-free',
      name: 'Complaint Free',
      description: 'Bonus for completing shifts with no customer complaints',
      amount: 30,
      isActive: true,
      conditions: {
        maxComplaints: 0,
      },
    },
  ];

  const stats = {
    totalIncentives: incentives.reduce((sum, i) => sum + i.amount, 0),
    totalDriversEarned: new Set(incentives.map((i) => i.driverId)).size,
    avgIncentivePerDriver: 125,
    topEarner: 'John Smith',
    topEarnerAmount: 165,
  };

  const incentivesByType = incentives.reduce(
    (acc, incentive) => {
      acc[incentive.type] = (acc[incentive.type] || 0) + incentive.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const getIncentiveIcon = (type: string) => {
    switch (type) {
      case 'on-time-departure':
        return Clock;
      case 'safety-bonus':
        return Shield;
      case 'rescue-route':
        return Users;
      case 'performance-bonus':
        return TrendingUp;
      case 'complaint-free':
        return Award;
      default:
        return Trophy;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}


      {/* Period Selector */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedPeriod === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedPeriod === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            This Month
          </button>
          <button
            onClick={() => setSelectedPeriod('quarter')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedPeriod === 'quarter'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            This Quarter
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center gap-2 text-green-100 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Total Incentives
          </div>
          <div className="text-2xl font-bold">${stats.totalIncentives}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Users className="w-4 h-4" />
            Drivers Earned
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalDriversEarned}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Avg per Driver
          </div>
          <div className="text-2xl font-bold text-gray-900">${stats.avgIncentivePerDriver}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-lg text-white col-span-2">
          <div className="flex items-center gap-2 text-yellow-100 text-sm mb-1">
            <Trophy className="w-4 h-4" />
            Top Earner
          </div>
          <div className="text-xl font-bold">{stats.topEarner}</div>
          <div className="text-sm text-yellow-100 mt-1">${stats.topEarnerAmount} earned</div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Incentive
        </button>
      </div>

      {/* Incentive Rules */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Incentive Rules</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incentiveRules.map((rule) => {
              const Icon = getIncentiveIcon(rule.type);
              const earned = incentivesByType[rule.type] || 0;
              return (
                <div
                  key={rule.id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg font-bold text-green-600">${rule.amount}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{rule.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total earned:</span>
                    <span className="font-medium text-gray-900">${earned}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Incentives */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Incentives</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Metric
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {incentives.map((incentive) => {
                const Icon = getIncentiveIcon(incentive.type);
                return (
                  <tr key={incentive.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(incentive.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{incentive.driverName}</div>
                      <div className="text-sm text-gray-500">{incentive.driverId}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-900 capitalize">
                          {incentive.type.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{incentive.description}</td>
                    <td className="px-4 py-3">
                      {incentive.metricValue && (
                        <span className="text-sm font-medium text-gray-900">
                          {incentive.metricValue}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-green-600">
                        ${incentive.amount}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
