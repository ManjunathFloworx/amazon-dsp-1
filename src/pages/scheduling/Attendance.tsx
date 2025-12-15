import { useState } from 'react';
import { Clock, MapPin, AlertCircle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import type { Attendance } from '../../types/scheduling';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data
  const attendanceRecords: Attendance[] = [
    {
      id: '1',
      driverId: 'D001',
      driverName: 'John Smith',
      shiftId: 'S001',
      date: selectedDate,
      scheduledClockIn: '08:00',
      actualClockIn: '07:55',
      scheduledClockOut: '18:00',
      actualClockOut: '18:10',
      status: 'on-time',
      gpsLocation: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: 'Station A, 123 Main St',
      },
    },
    {
      id: '2',
      driverId: 'D002',
      driverName: 'Sarah Johnson',
      shiftId: 'S002',
      date: selectedDate,
      scheduledClockIn: '10:00',
      actualClockIn: '10:15',
      scheduledClockOut: '20:00',
      actualClockOut: undefined,
      status: 'late',
      lateMinutes: 15,
      gpsLocation: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: 'Station B, 456 Oak Ave',
      },
    },
    {
      id: '3',
      driverId: 'D003',
      driverName: 'Mike Davis',
      shiftId: 'S003',
      date: selectedDate,
      scheduledClockIn: '08:00',
      actualClockIn: undefined,
      scheduledClockOut: '18:00',
      actualClockOut: undefined,
      status: 'absent',
    },
  ];

  const stats = {
    totalScheduled: 45,
    onTime: 38,
    late: 5,
    absent: 2,
    averageClockInTime: '07:58',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
        <p className="text-sm text-gray-600 mt-1">Monitor clock in/out and GPS validation</p>
      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Clock className="w-4 h-4" />
            Total Scheduled
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalScheduled}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
            <CheckCircle className="w-4 h-4" />
            On Time
          </div>
          <div className="text-2xl font-bold text-green-700">{stats.onTime}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-orange-200 bg-orange-50">
          <div className="flex items-center gap-2 text-orange-700 text-sm mb-1">
            <AlertCircle className="w-4 h-4" />
            Late
          </div>
          <div className="text-2xl font-bold text-orange-700">{stats.late}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-red-200 bg-red-50">
          <div className="flex items-center gap-2 text-red-700 text-sm mb-1">
            <XCircle className="w-4 h-4" />
            Absent
          </div>
          <div className="text-2xl font-bold text-red-700">{stats.absent}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Avg Clock In
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.averageClockInTime}</div>
        </div>
      </div>

      {/* Date Filter */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Scheduled Clock In
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actual Clock In
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Scheduled Clock Out
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actual Clock Out
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  GPS Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{record.driverName}</div>
                    <div className="text-sm text-gray-500">{record.driverId}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.scheduledClockIn}
                  </td>
                  <td className="px-4 py-3">
                    {record.actualClockIn ? (
                      <div>
                        <div className="text-sm text-gray-900">{record.actualClockIn}</div>
                        {record.lateMinutes && record.lateMinutes > 0 && (
                          <div className="text-xs text-orange-600">+{record.lateMinutes} min</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not clocked in</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.scheduledClockOut}
                  </td>
                  <td className="px-4 py-3">
                    {record.actualClockOut ? (
                      <div className="text-sm text-gray-900">{record.actualClockOut}</div>
                    ) : (
                      <span className="text-sm text-gray-400">Not clocked out</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {record.gpsLocation ? (
                      <div className="flex items-start gap-1">
                        <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-900">{record.gpsLocation.address}</div>
                          <div className="text-xs text-gray-500">
                            {record.gpsLocation.latitude.toFixed(4)},{' '}
                            {record.gpsLocation.longitude.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No GPS data</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'on-time'
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'late'
                            ? 'bg-orange-100 text-orange-700'
                            : record.status === 'absent'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {record.status === 'on-time' && <CheckCircle className="w-3 h-3" />}
                      {record.status === 'late' && <AlertCircle className="w-3 h-3" />}
                      {record.status === 'absent' && <XCircle className="w-3 h-3" />}
                      {record.status.replace('-', ' ')}
                    </span>
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
