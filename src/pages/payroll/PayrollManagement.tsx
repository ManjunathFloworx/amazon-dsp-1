import { useState } from 'react';
import {
  DollarSign,
  Clock,
  TrendingUp,
  Download,
  Calendar,
  Users,
  FileText,
} from 'lucide-react';
import type { PayrollRecord, PayrollSummary } from '../../types/payroll';

export default function PayrollManagement() {
  const [payPeriod, setPayPeriod] = useState('current');

  // Mock data
  const summary: PayrollSummary = {
    totalDrivers: 45,
    totalRegularHours: 1800,
    totalOvertimeHours: 120,
    totalRegularPay: 36000,
    totalOvertimePay: 3600,
    totalIncentives: 4500,
    totalGrossPay: 44100,
    totalNetPay: 35280,
    averagePayPerDriver: 980,
  };

  const payrollRecords: PayrollRecord[] = [
    {
      id: 'PR001',
      driverId: 'D001',
      driverName: 'John Smith',
      payPeriodStart: '2024-12-01',
      payPeriodEnd: '2024-12-07',
      regularHours: 40,
      overtimeHours: 5,
      hourlyRate: 20,
      overtimeRate: 30,
      regularPay: 800,
      overtimePay: 150,
      totalIncentives: 100,
      totalDeductions: 210,
      grossPay: 1050,
      netPay: 840,
      ptoUsed: 0,
      ptoRemaining: 40,
      sickLeaveUsed: 0,
      sickLeaveRemaining: 24,
      status: 'approved',
    },
    {
      id: 'PR002',
      driverId: 'D002',
      driverName: 'Sarah Johnson',
      payPeriodStart: '2024-12-01',
      payPeriodEnd: '2024-12-07',
      regularHours: 40,
      overtimeHours: 0,
      hourlyRate: 20,
      overtimeRate: 30,
      regularPay: 800,
      overtimePay: 0,
      totalIncentives: 150,
      totalDeductions: 190,
      grossPay: 950,
      netPay: 760,
      ptoUsed: 8,
      ptoRemaining: 32,
      sickLeaveUsed: 0,
      sickLeaveRemaining: 24,
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      {/* Pay Period Selector */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            <button
              onClick={() => setPayPeriod('previous')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${payPeriod === 'previous'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Previous Period
            </button>
            <button
              onClick={() => setPayPeriod('current')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${payPeriod === 'current'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Current Period
            </button>
          </div>
          <span className="text-sm text-gray-600">Dec 1 - Dec 7, 2024</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Users className="w-4 h-4" />
            Total Drivers
          </div>
          <div className="text-2xl font-bold text-gray-900">{summary.totalDrivers}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Clock className="w-4 h-4" />
            Total Hours
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {summary.totalRegularHours + summary.totalOvertimeHours}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {summary.totalOvertimeHours}h OT
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Gross Pay
          </div>
          <div className="text-2xl font-bold text-green-700">
            ${summary.totalGrossPay.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">
            +${summary.totalIncentives.toLocaleString()} incentives
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Avg per Driver
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${summary.averagePayPerDriver.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Regular Pay</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hours</span>
              <span className="text-sm font-medium">{summary.totalRegularHours}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-medium">
                ${summary.totalRegularPay.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Overtime Pay</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hours</span>
              <span className="text-sm font-medium">{summary.totalOvertimeHours}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-medium">
                ${summary.totalOvertimePay.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Net Pay</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gross</span>
              <span className="text-sm font-medium">
                ${summary.totalGrossPay.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Net</span>
              <span className="text-sm font-medium">
                ${summary.totalNetPay.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="w-4 h-4" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Payroll Records Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Driver Payroll Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Hours (Reg/OT)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Regular Pay
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  OT Pay
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Incentives
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Gross Pay
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Net Pay
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payrollRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{record.driverName}</div>
                    <div className="text-sm text-gray-500">{record.driverId}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.regularHours}h / {record.overtimeHours}h
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ${record.regularPay.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ${record.overtimePay.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 font-medium">
                    ${record.totalIncentives.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ${record.grossPay.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ${record.netPay.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${record.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'paid'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Pay Stub
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
