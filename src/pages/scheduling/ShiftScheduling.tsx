import { useState } from 'react';
import { Calendar, Users, Clock, AlertCircle, Plus, Search, Edit, Trash2, Copy } from 'lucide-react';
import type { Shift, ScheduleStats } from '../../types/scheduling';
import AddShiftModal from '../../components/modals/AddShiftModal';

export default function ShiftScheduling() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedWave, setSelectedWave] = useState<number | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredShifts = shifts
    .filter((s) => selectedWave === 'all' || s.wave === selectedWave)
    .filter(
      (s) =>
        searchQuery === '' ||
        s.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.routeName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const handleAddShift = (shift: any) => {
    console.log('Adding shift:', shift);
    // Add API call here
  };

  const handleDeleteShift = (shiftId: string) => {
    if (confirm('Are you sure you want to delete this shift?')) {
      console.log('Deleting shift:', shiftId);
      // Add API call here
    }
  };

  const handleCopyShift = (shift: Shift) => {
    console.log('Copying shift:', shift);
    // Add logic to copy shift
  };

  return (
    <div className="space-y-6">

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

      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Shift
          </button>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${shift.status === 'scheduled'
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
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopyShift(shift)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Copy shift"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit shift"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteShift(shift.id)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete shift"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredShifts.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No shifts found</h3>
            <p className="text-sm text-gray-500">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Get started by adding a new shift'}
            </p>
          </div>
        )}
      </div>

      {/* Add Shift Modal */}
      <AddShiftModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddShift}
      />
    </div>
  );
}
