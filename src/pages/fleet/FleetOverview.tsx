import { useState } from 'react';
import { mockVehicles, mockAlerts } from '../../data/mockData';
import type { Vehicle } from '../../types/fleet';
import { Search, Plus, AlertCircle, Calendar, Gauge } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import AddVehicleModal from '../../components/modals/AddVehicleModal';

export default function FleetOverview() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddVehicle = (newVehicle: Omit<Vehicle, 'id'>) => {
    const vehicle: Vehicle = {
      ...newVehicle,
      id: `v-${Date.now()}`,
    };
    setVehicles([...vehicles, vehicle]);
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'flagged':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBrandingColor = (status: Vehicle['amazonBrandingStatus']) => {
    switch (status) {
      case 'branded':
        return 'text-green-600';
      case 'unbranded':
        return 'text-gray-600';
      case 'pending':
        return 'text-yellow-600';
    }
  };

  const getExpiryWarning = (expiryDate: Date) => {
    const days = differenceInDays(expiryDate, new Date());
    if (days < 0) return { text: 'EXPIRED', color: 'text-red-600 font-bold' };
    if (days < 30) return { text: `${days} days`, color: 'text-red-600' };
    if (days < 60) return { text: `${days} days`, color: 'text-yellow-600' };
    return { text: `${days} days`, color: 'text-gray-600' };
  };

  const stats = [
    {
      label: 'Total Vehicles',
      value: vehicles.length,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Active',
      value: vehicles.filter((v) => v.status === 'active').length,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'In Maintenance',
      value: vehicles.filter((v) => v.status === 'maintenance').length,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Flagged',
      value: vehicles.filter((v) => v.status === 'flagged').length,
      color: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by VIN, model, or plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredVehicles.map((vehicle) => {
          const regWarning = getExpiryWarning(vehicle.registrationExpiry);
          const insWarning = getExpiryWarning(vehicle.insuranceExpiry);
          const vehicleAlerts = mockAlerts.filter(
            (a) => a.vehicleId === vehicle.id && !a.resolved
          );

          return (
            <div
              key={vehicle.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{vehicle.model}</h3>
                  <p className="text-sm text-gray-500">{vehicle.plate}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                    vehicle.status
                  )}`}
                >
                  {vehicle.status.toUpperCase()}
                </span>
              </div>

              {/* VIN and Branding */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">VIN</p>
                  <p className="text-sm font-mono text-gray-900">{vehicle.vin}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Amazon Branding</p>
                  <p className={`text-sm font-medium ${getBrandingColor(vehicle.amazonBrandingStatus)}`}>
                    {vehicle.amazonBrandingStatus.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Mileage */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <Gauge className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Mileage:</span>
                <span className="text-sm font-semibold text-gray-900">
                  {vehicle.mileage.toLocaleString()} mi
                </span>
              </div>

              {/* Expiry Dates */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Registration:
                  </span>
                  <span className={regWarning.color}>
                    {format(vehicle.registrationExpiry, 'MMM dd, yyyy')} ({regWarning.text})
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Insurance:
                  </span>
                  <span className={insWarning.color}>
                    {format(vehicle.insuranceExpiry, 'MMM dd, yyyy')} ({insWarning.text})
                  </span>
                </div>
              </div>

              {/* Alerts */}
              {vehicleAlerts.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <p className="text-xs text-red-800">
                    {vehicleAlerts.length} active alert{vehicleAlerts.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Vehicle Detail Modal (simplified) */}
      {selectedVehicle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedVehicle(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedVehicle.model}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">VIN</p>
                  <p className="font-mono text-gray-900">{selectedVehicle.vin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">License Plate</p>
                  <p className="font-semibold text-gray-900">{selectedVehicle.plate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Mileage</p>
                  <p className="font-semibold text-gray-900">
                    {selectedVehicle.mileage.toLocaleString()} mi
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-semibold text-gray-900">{selectedVehicle.status}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddVehicle}
      />
    </div>
  );
}
