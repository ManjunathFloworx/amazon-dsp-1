import { useState } from 'react';
import type { Vehicle } from '../../types/fleet';
import { X } from 'lucide-react';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vehicle: Omit<Vehicle, 'id'>) => void;
}

export default function AddVehicleModal({ isOpen, onClose, onAdd }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    vin: '',
    model: '',
    plate: '',
    mileage: '',
    amazonBrandingStatus: 'pending' as Vehicle['amazonBrandingStatus'],
    registrationExpiry: '',
    insuranceExpiry: '',
    status: 'active' as Vehicle['status'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newVehicle: Omit<Vehicle, 'id'> = {
      vin: formData.vin,
      model: formData.model,
      plate: formData.plate,
      mileage: parseInt(formData.mileage) || 0,
      amazonBrandingStatus: formData.amazonBrandingStatus,
      registrationExpiry: new Date(formData.registrationExpiry),
      insuranceExpiry: new Date(formData.insuranceExpiry),
      status: formData.status,
      lastInspection: new Date(),
    };

    onAdd(newVehicle);

    // Reset form
    setFormData({
      vin: '',
      model: '',
      plate: '',
      mileage: '',
      amazonBrandingStatus: 'pending',
      registrationExpiry: '',
      insuranceExpiry: '',
      status: 'active',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Vehicle</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* VIN */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VIN Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1FTFW1ET5DFC10312"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ford Transit 250"
              />
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Plate <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.plate}
                onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AMZ-1234"
              />
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Mileage <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="45000"
              />
            </div>

            {/* Amazon Branding Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amazon Branding Status
              </label>
              <select
                value={formData.amazonBrandingStatus}
                onChange={(e) => setFormData({ ...formData, amazonBrandingStatus: e.target.value as Vehicle['amazonBrandingStatus'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="branded">Branded</option>
                <option value="unbranded">Unbranded</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Registration Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Expiry <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.registrationExpiry}
                onChange={(e) => setFormData({ ...formData, registrationExpiry: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Insurance Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Expiry <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.insuranceExpiry}
                onChange={(e) => setFormData({ ...formData, insuranceExpiry: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Vehicle['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
