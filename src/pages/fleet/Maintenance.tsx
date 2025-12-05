import { useState } from 'react';
import { mockMaintenanceRecords, mockVehicles } from '../../data/mockData';
import type { MaintenanceRecord } from '../../types/fleet';
import { Plus, Calendar, DollarSign, Wrench, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { format, isPast } from 'date-fns';
import ScheduleMaintenanceModal from '../../components/modals/ScheduleMaintenanceModal';

export default function Maintenance() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'completed' | 'overdue'>('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleScheduleMaintenance = (newRecord: Omit<MaintenanceRecord, 'id'>) => {
    const record: MaintenanceRecord = {
      ...newRecord,
      id: `m-${Date.now()}`,
    };
    setRecords([...records, record]);
  };

  const getVehicleName = (vehicleId: string) => {
    const vehicle = mockVehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.model} (${vehicle.plate})` : 'Unknown';
  };

  const getMaintenanceIcon = () => {
    return <Wrench className="w-4 h-4" />;
  };

  const getStatusBadge = (record: MaintenanceRecord) => {
    if (record.status === 'completed') {
      return (
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 rounded-full">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </span>
      );
    }
    if (record.status === 'overdue') {
      return (
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded-full">
          <AlertCircle className="w-3 h-3" />
          Overdue
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 rounded-full">
        <Clock className="w-3 h-3" />
        Scheduled
      </span>
    );
  };

  const filteredRecords = records.filter((record) => {
    if (filterStatus === 'all') return true;
    return record.status === filterStatus;
  });

  const upcomingMaintenance = records.filter(
    (r) => r.status === 'scheduled' && !isPast(r.scheduledDate)
  ).length;

  const overdueMaintenance = records.filter((r) => r.status === 'overdue').length;

  const totalCost = records
    .filter((r) => r.status === 'completed' && r.cost)
    .reduce((sum, r) => sum + (r.cost || 0), 0);

  const stats = [
    {
      label: 'Upcoming Maintenance',
      value: upcomingMaintenance,
      color: 'bg-blue-50 text-blue-600',
      icon: Calendar,
    },
    {
      label: 'Overdue',
      value: overdueMaintenance,
      color: 'bg-red-50 text-red-600',
      icon: AlertCircle,
    },
    {
      label: 'Total Maintenance Cost',
      value: `$${totalCost.toLocaleString()}`,
      color: 'bg-green-50 text-green-600',
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Preventive Maintenance</h1>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Schedule Maintenance
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'scheduled', 'overdue', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as typeof filterStatus)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Maintenance Records */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  {getMaintenanceIcon()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {record.type.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </h3>
                    {getStatusBadge(record)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{getVehicleName(record.vehicleId)}</p>
                  <p className="text-sm text-gray-700">{record.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Scheduled Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {format(record.scheduledDate, 'MMM dd, yyyy')}
                </p>
              </div>
              {record.completedDate && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Completed Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(record.completedDate, 'MMM dd, yyyy')}
                  </p>
                </div>
              )}
              {record.cost && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Cost</p>
                  <p className="text-sm font-semibold text-green-600">
                    ${record.cost.toLocaleString()}
                  </p>
                </div>
              )}
              {record.recurring && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Recurring</p>
                  <p className="text-sm font-medium text-blue-600">
                    Every {record.recurringInterval} days
                  </p>
                </div>
              )}
            </div>

            {record.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{record.notes}</p>
              </div>
            )}
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No maintenance records found</p>
          </div>
        )}
      </div>

      {/* Schedule Maintenance Modal */}
      <ScheduleMaintenanceModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleMaintenance}
        vehicles={mockVehicles}
      />
    </div>
  );
}
