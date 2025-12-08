import { useState } from 'react';
import { Calendar, Users, Clock, AlertCircle, Plus, Search } from 'lucide-react';
import type { Shift, ScheduleStats } from '../../types/scheduling';

export default function ShiftScheduling() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedWave, setSelectedWave] = useState<number | 'all'>('all');

  // Mock data - replace with actual API calls
  const stats: ScheduleStats = {
    totalShifts: 45,
    assignedShifts: 38,
    unassignedShifts: 7,
    activeDrivers: 38,
    driversOnLeave: 3,
    backupNeeded: 2,
  };

  const shifts: Shift[] = [
    {
      id: '1',
      driverId: 'D001',
      driverName: 'John Smith',
      date: selectedDate,
      startTime: '08:00',
      endTime: '18:00',
      routeId: 'R001',
      routeName: 'Downtown Zone A',
      wave: 1,
      status: 'scheduled',
    },
    {
      id: '2',
      driverId: 'D002',
      driverName: 'Sarah Johnson',
      date: selectedDate,
      startTime: '10:00',
      endTime: '20:00',
      routeId: 'R002',
      routeName: 'Suburbs Zone B',
      wave: 2,
      status: 'scheduled',
      backupDriverId: 'D010',
      backupDriverName: 'Mike Wilson',
    },
  ];

  const filteredShifts =
    selectedWave === 'all' ? shifts : shifts.filter((s) => s.wave === selectedWave);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shift Scheduling</h1>
          <p className="text-sm text-gray-600 mt-1">Manage driver schedules and assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Shift
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Calendar className="w-4 h-4" />
            Total Shifts
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalShifts}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Users className="w-4 h-4" />
            Assigned
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.assignedShifts}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <AlertCircle className="w-4 h-4" />
            Unassigned
          </div>
          <div className="text-2xl font-bold text-orange-600">{stats.unassignedShifts}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Users className="w-4 h-4" />
            Active Drivers
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.activeDrivers}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Clock className="w-4 h-4" />
            On Leave
          </div>
          <div className="text-2xl font-bold text-gray-600">{stats.driversOnLeave}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <AlertCircle className="w-4 h-4" />
            Backup Needed
          </div>
          <div className="text-2xl font-bold text-red-600">{stats.backupNeeded}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wave</label>
            <select
              value={selectedWave}
              onChange={(e) =>
                setSelectedWave(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Waves</option>
              <option value="1">Wave 1</option>
              <option value="2">Wave 2</option>
              <option value="3">Wave 3</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search driver or route..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shifts Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Route
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Wave
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Backup Driver
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
              {filteredShifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{shift.driverName}</div>
                    <div className="text-sm text-gray-500">{shift.driverId}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {shift.startTime} - {shift.endTime}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{shift.routeName || '-'}</div>
                    <div className="text-sm text-gray-500">{shift.routeId || 'Not assigned'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      Wave {shift.wave}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {shift.backupDriverName ? (
                      <div>
                        <div className="text-sm text-gray-900">{shift.backupDriverName}</div>
                        <div className="text-xs text-gray-500">{shift.backupDriverId}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No backup</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        shift.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : shift.status === 'in-progress'
                            ? 'bg-green-100 text-green-700'
                            : shift.status === 'completed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {shift.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Edit
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
