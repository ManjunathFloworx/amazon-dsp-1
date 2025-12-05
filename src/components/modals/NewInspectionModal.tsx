import { useState } from 'react';
import type { InspectionRecord, Vehicle, ChecklistItem } from '../../types/fleet';
import { X, Plus, Trash2 } from 'lucide-react';

interface NewInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (inspection: Omit<InspectionRecord, 'id'>) => void;
  vehicles: Vehicle[];
}

const defaultChecklistItems: Omit<ChecklistItem, 'id'>[] = [
  { category: 'Exterior', item: 'Tire condition', status: 'pass' },
  { category: 'Exterior', item: 'Lights functional', status: 'pass' },
  { category: 'Exterior', item: 'Body damage', status: 'pass' },
  { category: 'Interior', item: 'Mirrors adjusted', status: 'pass' },
  { category: 'Interior', item: 'Seat belts functional', status: 'pass' },
  { category: 'Mechanical', item: 'Fluid levels', status: 'pass' },
  { category: 'Mechanical', item: 'Brake function', status: 'pass' },
];

export default function NewInspectionModal({
  isOpen,
  onClose,
  onCreate,
  vehicles,
}: NewInspectionModalProps) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    type: 'pre_trip' as InspectionRecord['type'],
    inspector: '',
    notes: '',
  });

  const [checklistItems, setChecklistItems] = useState<(Omit<ChecklistItem, 'id'> & { tempId: string })[]>(
    defaultChecklistItems.map((item, index) => ({ ...item, tempId: `temp-${index}` }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine overall status based on checklist
    const hasFailed = checklistItems.some((item) => item.status === 'fail');
    const status: InspectionRecord['status'] = hasFailed ? 'flagged' : 'passed';

    const newInspection: Omit<InspectionRecord, 'id'> = {
      vehicleId: formData.vehicleId,
      type: formData.type,
      date: new Date(),
      inspector: formData.inspector,
      status: status,
      checklistItems: checklistItems.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        category: item.category,
        item: item.item,
        status: item.status,
        notes: item.notes,
      })),
      photos: [],
      notes: formData.notes || undefined,
    };

    onCreate(newInspection);

    // Reset form
    setFormData({
      vehicleId: '',
      type: 'pre_trip',
      inspector: '',
      notes: '',
    });
    setChecklistItems(
      defaultChecklistItems.map((item, index) => ({ ...item, tempId: `temp-${index}` }))
    );

    onClose();
  };

  const updateChecklistItem = (tempId: string, field: keyof ChecklistItem, value: string) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.tempId === tempId ? { ...item, [field]: value } : item
      )
    );
  };

  const addChecklistItem = () => {
    setChecklistItems([
      ...checklistItems,
      {
        tempId: `temp-${Date.now()}`,
        category: 'Other',
        item: '',
        status: 'pass',
      },
    ]);
  };

  const removeChecklistItem = (tempId: string) => {
    setChecklistItems(checklistItems.filter((item) => item.tempId !== tempId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">New Vehicle Inspection</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select vehicle...</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.model} ({vehicle.plate})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inspection Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as InspectionRecord['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pre_trip">Pre-Trip</option>
                  <option value="post_trip">Post-Trip</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inspector Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.inspector}
                  onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Smith"
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Inspection Checklist</h3>
                <button
                  type="button"
                  onClick={addChecklistItem}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-3">
                {checklistItems.map((item) => (
                  <div
                    key={item.tempId}
                    className="grid grid-cols-12 gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="col-span-2">
                      <select
                        value={item.category}
                        onChange={(e) => updateChecklistItem(item.tempId, 'category', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Exterior">Exterior</option>
                        <option value="Interior">Interior</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-span-4">
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => updateChecklistItem(item.tempId, 'item', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Item description"
                      />
                    </div>

                    <div className="col-span-2">
                      <select
                        value={item.status}
                        onChange={(e) => updateChecklistItem(item.tempId, 'status', e.target.value)}
                        className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          item.status === 'fail'
                            ? 'border-red-300 bg-red-50 text-red-700'
                            : item.status === 'pass'
                            ? 'border-green-300 bg-green-50 text-green-700'
                            : 'border-gray-300'
                        }`}
                      >
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                        <option value="na">N/A</option>
                      </select>
                    </div>

                    <div className="col-span-3">
                      <input
                        type="text"
                        value={item.notes || ''}
                        onChange={(e) => updateChecklistItem(item.tempId, 'notes', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Notes (if fail)"
                      />
                    </div>

                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeChecklistItem(item.tempId)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional observations or comments..."
              />
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
              Complete Inspection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
