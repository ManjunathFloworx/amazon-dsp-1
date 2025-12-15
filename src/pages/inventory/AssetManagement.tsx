import { useState } from 'react';
import { Package, Plus, User, Calendar, Search as SearchIcon } from 'lucide-react';
import type { Asset, AssetAssignment } from '../../types/inventory';

export default function AssetManagement() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'assigned' | 'available' | 'damaged'>('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);

  const assets: Asset[] = [
    {
      id: 'AST001',
      type: 'rabbit-scanner',
      name: 'Rabbit Scanner',
      serialNumber: 'RBT-2023-001',
      purchaseDate: '2023-01-15',
      purchaseCost: 450.00,
      currentValue: 350.00,
      status: 'assigned',
      condition: 'good',
      assignedTo: 'D042',
      assignedDriverName: 'Tom Jackson',
      assignedDate: '2024-01-10',
      location: 'In Field',
      notes: 'Working condition, regular maintenance completed',
    },
    {
      id: 'AST002',
      type: 'vest',
      name: 'Amazon Safety Vest - Large',
      purchaseDate: '2024-06-01',
      purchaseCost: 25.00,
      currentValue: 20.00,
      status: 'assigned',
      condition: 'good',
      assignedTo: 'D042',
      assignedDriverName: 'Tom Jackson',
      assignedDate: '2024-06-01',
      location: 'In Field',
      notes: '',
    },
    {
      id: 'AST003',
      type: 'rabbit-scanner',
      name: 'Rabbit Scanner',
      serialNumber: 'RBT-2023-015',
      purchaseDate: '2023-03-20',
      purchaseCost: 450.00,
      currentValue: 200.00,
      status: 'damaged',
      condition: 'poor',
      location: 'Station - Repair Needed',
      notes: 'Screen cracked, needs replacement',
    },
    {
      id: 'AST004',
      type: 'phone',
      name: 'Delivery Phone',
      serialNumber: 'PHN-2024-008',
      purchaseDate: '2024-02-10',
      purchaseCost: 300.00,
      currentValue: 275.00,
      status: 'available',
      condition: 'new',
      location: 'Station Inventory',
      notes: 'Brand new, not yet assigned',
    },
    {
      id: 'AST005',
      type: 'shirt',
      name: 'Amazon Uniform Shirt - Medium',
      purchaseDate: '2024-07-15',
      purchaseCost: 18.00,
      currentValue: 15.00,
      status: 'assigned',
      condition: 'good',
      assignedTo: 'D023',
      assignedDriverName: 'Sarah Williams',
      assignedDate: '2024-07-15',
      location: 'In Field',
      notes: '',
    },
  ];

  const recentAssignments: AssetAssignment[] = [
    {
      id: 'ASGN001',
      assetId: 'AST001',
      assetType: 'rabbit-scanner',
      assetName: 'Rabbit Scanner',
      serialNumber: 'RBT-2023-001',
      driverId: 'D042',
      driverName: 'Tom Jackson',
      assignedDate: '2024-01-10',
      conditionAtAssignment: 'good',
      notes: 'Driver trained on device usage',
      photos: [],
    },
    {
      id: 'ASGN002',
      assetId: 'AST005',
      assetType: 'shirt',
      assetName: 'Amazon Uniform Shirt - Medium',
      driverId: 'D023',
      driverName: 'Sarah Williams',
      assignedDate: '2024-07-15',
      conditionAtAssignment: 'new',
      notes: 'New hire uniform issuance',
      photos: [],
    },
  ];

  const filteredAssets = selectedTab === 'all'
    ? assets
    : assets.filter(a => a.status === selectedTab);

  const stats = {
    total: assets.length,
    assigned: assets.filter(a => a.status === 'assigned').length,
    available: assets.filter(a => a.status === 'available').length,
    damaged: assets.filter(a => a.status === 'damaged').length,
    totalValue: assets.reduce((sum, a) => sum + a.currentValue, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-700';
      case 'available': return 'bg-green-100 text-green-700';
      case 'damaged': return 'bg-red-100 text-red-700';
      case 'lost': return 'bg-orange-100 text-orange-700';
      case 'retired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'fair': return 'bg-yellow-100 text-yellow-700';
      case 'poor': return 'bg-orange-100 text-orange-700';
      case 'broken': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAssetTypeIcon = () => {
    return <Package className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={() => setSelectedTab('all')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedTab === 'all' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Total Assets</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </button>

        <button
          onClick={() => setSelectedTab('assigned')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedTab === 'assigned' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Assigned</div>
          <div className="text-2xl font-bold text-blue-700">{stats.assigned}</div>
        </button>

        <button
          onClick={() => setSelectedTab('available')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedTab === 'available' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Available</div>
          <div className="text-2xl font-bold text-green-700">{stats.available}</div>
        </button>

        <button
          onClick={() => setSelectedTab('damaged')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedTab === 'damaged' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Damaged</div>
          <div className="text-2xl font-bold text-red-700">{stats.damaged}</div>
        </button>

        <div className="p-4 rounded-lg border-2 border-gray-200 bg-white">
          <div className="text-sm text-gray-600 mb-1">Total Value</div>
          <div className="text-2xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddAssetModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
          >
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            <User className="w-4 h-4" />
            Assign Asset
          </button>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Inventory</h2>
          <div className="flex items-center gap-2">
            <SearchIcon className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Serial/ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getAssetTypeIcon()}
                      <div>
                        <div className="font-medium text-gray-900">{asset.name}</div>
                        <div className="text-xs text-gray-500">{asset.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                    {asset.type.replace('-', ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{asset.serialNumber || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(asset.condition)}`}>
                      {asset.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {asset.assignedDriverName ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.assignedDriverName}</div>
                        <div className="text-xs text-gray-500">{asset.assignedTo}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">${asset.currentValue.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Assignments</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentAssignments.map((assignment) => (
            <div key={assignment.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{assignment.assetName}</div>
                      <div className="text-sm text-gray-500">
                        {assignment.serialNumber && `SN: ${assignment.serialNumber} • `}
                        Assigned to {assignment.driverName} ({assignment.driverId})
                      </div>
                    </div>
                  </div>
                  {assignment.notes && (
                    <div className="mt-2 text-sm text-gray-600 ml-8">{assignment.notes}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(assignment.assignedDate).toLocaleDateString()}
                  </div>
                  <div className={`mt-1 px-2 py-1 rounded text-xs font-medium ${getConditionColor(assignment.conditionAtAssignment)}`}>
                    {assignment.conditionAtAssignment}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Asset Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Assign Asset to Driver</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Asset *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choose an available asset...</option>
                  {assets.filter(a => a.status === 'available').map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} {asset.serialNumber && `(${asset.serialNumber})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Driver *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choose a driver...</option>
                  <option value="D042">Tom Jackson (D042)</option>
                  <option value="D023">Sarah Williams (D023)</option>
                  <option value="D015">Mike Thompson (D015)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Condition *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select condition...</option>
                  <option value="new">New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Any special notes about this assignment..."
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                Assign Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      {showAddAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Add New Asset</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select type...</option>
                  <option value="rabbit-scanner">Rabbit Scanner</option>
                  <option value="phone">Phone</option>
                  <option value="vest">Safety Vest</option>
                  <option value="shirt">Uniform Shirt</option>
                  <option value="bag">Delivery Bag</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Rabbit Scanner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional for trackable items"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Cost *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Condition *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="new">New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Station Inventory"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Additional information..."
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddAssetModal(false)}
                className="px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
