import { useState } from 'react';
import { mockInspectionRecords, mockVehicles } from '../../data/mockData';
import type { InspectionRecord } from '../../types/fleet';
import { Plus, ClipboardCheck, Camera, AlertTriangle, CheckCircle, XCircle, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import NewInspectionModal from '../../components/modals/NewInspectionModal';

export default function Inspections() {
  const [inspections, setInspections] = useState<InspectionRecord[]>(mockInspectionRecords);
  const [selectedInspection, setSelectedInspection] = useState<InspectionRecord | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'pre_trip' | 'post_trip'>('all');
  const [isNewInspectionModalOpen, setIsNewInspectionModalOpen] = useState(false);

  const handleCreateInspection = (newInspection: Omit<InspectionRecord, 'id'>) => {
    const inspection: InspectionRecord = {
      ...newInspection,
      id: `i-${Date.now()}`,
    };
    setInspections([...inspections, inspection]);
  };

  const getVehicleName = (vehicleId: string) => {
    const vehicle = mockVehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.model} (${vehicle.plate})` : 'Unknown';
  };

  const getStatusIcon = (status: InspectionRecord['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'flagged':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: InspectionRecord['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'flagged':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const filteredInspections = inspections.filter((inspection) => {
    if (filterType === 'all') return true;
    return inspection.type === filterType;
  });

  const totalInspections = inspections.length;
  const passedInspections = inspections.filter((i) => i.status === 'passed').length;
  const flaggedInspections = inspections.filter((i) => i.status === 'flagged').length;
  const passRate = totalInspections > 0 ? ((passedInspections / totalInspections) * 100).toFixed(1) : '0';

  const stats = [
    {
      label: 'Total Inspections',
      value: totalInspections,
      color: 'bg-blue-50 text-blue-600',
      icon: ClipboardCheck,
    },
    {
      label: 'Pass Rate',
      value: `${passRate}%`,
      color: 'bg-green-50 text-green-600',
      icon: CheckCircle,
    },
    {
      label: 'Flagged Vehicles',
      value: flaggedInspections,
      color: 'bg-yellow-50 text-yellow-600',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vehicle Inspections</h1>
        <button
          onClick={() => setIsNewInspectionModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Inspection
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
        {['all', 'pre_trip', 'post_trip'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as typeof filterType)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filterType === type
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {type === 'all' ? 'All' : type.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Inspection Records */}
      <div className="space-y-4">
        {filteredInspections.map((inspection) => {
          const failedItems = inspection.checklistItems.filter((item) => item.status === 'fail');

          return (
            <div
              key={inspection.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedInspection(inspection)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {getStatusIcon(inspection.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {inspection.type.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Inspection
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(inspection.status)}`}>
                        {inspection.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{getVehicleName(inspection.vehicleId)}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {inspection.inspector}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(inspection.date, 'MMM dd, yyyy h:mm a')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Checklist Items</p>
                  <p className="text-sm font-medium text-gray-900">
                    {inspection.checklistItems.length} items checked
                  </p>
                </div>
                {failedItems.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Failed Items</p>
                    <p className="text-sm font-semibold text-red-600">
                      {failedItems.length} issue{failedItems.length > 1 ? 's' : ''} found
                    </p>
                  </div>
                )}
                {inspection.photos.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Photos</p>
                    <p className="text-sm font-medium text-blue-600 flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      {inspection.photos.length} photo{inspection.photos.length > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>

              {/* Failed Items Summary */}
              {failedItems.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs font-medium text-red-800 mb-2">Issues Found:</p>
                  <ul className="space-y-1">
                    {failedItems.map((item) => (
                      <li key={item.id} className="text-xs text-red-700">
                        • {item.item}: {item.notes}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {filteredInspections.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <ClipboardCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No inspection records found</p>
          </div>
        )}
      </div>

      {/* Inspection Detail Modal */}
      {selectedInspection && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedInspection(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedInspection.type.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Inspection
                </h2>
                <p className="text-gray-600">{getVehicleName(selectedInspection.vehicleId)}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(selectedInspection.status)}`}>
                {selectedInspection.status.toUpperCase()}
              </span>
            </div>

            {/* Inspection Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Inspector</p>
                  <p className="font-medium text-gray-900">{selectedInspection.inspector}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                  <p className="font-medium text-gray-900">
                    {format(selectedInspection.date, 'MMM dd, yyyy h:mm a')}
                  </p>
                </div>
              </div>

              {/* Checklist Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Checklist Items</h3>
                <div className="space-y-2">
                  {selectedInspection.checklistItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border ${
                        item.status === 'fail'
                          ? 'bg-red-50 border-red-200'
                          : item.status === 'pass'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">{item.category}</p>
                          <p className="text-sm font-medium text-gray-900">{item.item}</p>
                          {item.notes && (
                            <p className="text-xs text-gray-700 mt-1">{item.notes}</p>
                          )}
                        </div>
                        <span className={`text-xs font-bold ${
                          item.status === 'fail' ? 'text-red-600' :
                          item.status === 'pass' ? 'text-green-600' :
                          'text-gray-600'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos */}
              {selectedInspection.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Photos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedInspection.photos.map((photo) => (
                      <div key={photo.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">{photo.category}</p>
                        {photo.description && (
                          <p className="text-sm text-gray-700 mt-1">{photo.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedInspection.notes && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Additional Notes</p>
                  <p className="text-sm text-gray-700">{selectedInspection.notes}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedInspection(null)}
              className="w-full mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* New Inspection Modal */}
      <NewInspectionModal
        isOpen={isNewInspectionModalOpen}
        onClose={() => setIsNewInspectionModalOpen(false)}
        onCreate={handleCreateInspection}
        vehicles={mockVehicles}
      />
    </div>
  );
}
