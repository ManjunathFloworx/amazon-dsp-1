import { useState } from 'react';
import { AlertCircle, Plus, User, DollarSign, Calendar, FileText } from 'lucide-react';
import type { DamageReport } from '../../types/inventory';

export default function DamageTracking() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'reported' | 'assessed' | 'deducted'>('all');
  const [showReportModal, setShowReportModal] = useState(false);

  const damageReports: DamageReport[] = [
    {
      id: 'DMG001',
      assetId: 'AST003',
      assetType: 'rabbit-scanner',
      assetName: 'Rabbit Scanner',
      serialNumber: 'RBT-2023-015',
      driverId: 'D042',
      driverName: 'Tom Jackson',
      damageDate: '2025-12-08',
      damageDescription: 'Device dropped during delivery, screen cracked and not functional',
      damagePhotos: ['damage-photo-1.jpg', 'damage-photo-2.jpg'],
      estimatedRepairCost: 250.00,
      actualRepairCost: 245.00,
      isRepairable: false,
      accountability: 'driver',
      deductionAmount: 245.00,
      deductionApplied: false,
      status: 'assessed',
      reportedBy: 'Supervisor John Smith',
      resolvedAt: '2025-12-09T10:00:00Z',
    },
    {
      id: 'DMG002',
      assetId: 'AST012',
      assetType: 'vest',
      assetName: 'Amazon Safety Vest',
      driverId: 'D023',
      driverName: 'Sarah Williams',
      damageDate: '2025-12-09',
      damageDescription: 'Vest not returned at end of shift. Driver claims it was stolen from van.',
      damagePhotos: [],
      estimatedRepairCost: 25.00,
      isRepairable: false,
      accountability: 'driver',
      deductionAmount: 25.00,
      deductionApplied: false,
      status: 'reported',
      reportedBy: 'Supervisor Mary Johnson',
    },
    {
      id: 'DMG003',
      assetId: 'AST007',
      assetType: 'phone',
      assetName: 'Delivery Phone',
      serialNumber: 'PHN-2024-003',
      driverId: 'D015',
      driverName: 'Mike Thompson',
      damageDate: '2025-12-05',
      damageDescription: 'Phone exposed to rain during delivery. Device no longer powers on.',
      damagePhotos: ['water-damage-1.jpg'],
      estimatedRepairCost: 300.00,
      actualRepairCost: 300.00,
      isRepairable: false,
      accountability: 'driver',
      deductionAmount: 150.00,
      deductionApplied: true,
      deductionDate: '2025-12-07',
      status: 'replaced',
      reportedBy: 'Driver Mike Thompson',
      resolvedAt: '2025-12-06T09:00:00Z',
    },
  ];

  const filteredReports = selectedStatus === 'all'
    ? damageReports
    : selectedStatus === 'deducted'
      ? damageReports.filter(r => r.deductionApplied)
      : damageReports.filter(r => r.status === selectedStatus);

  const stats = {
    total: damageReports.length,
    reported: damageReports.filter(r => r.status === 'reported').length,
    assessed: damageReports.filter(r => r.status === 'assessed' && !r.deductionApplied).length,
    deducted: damageReports.filter(r => r.deductionApplied).length,
    totalCost: damageReports.reduce((sum, r) => sum + (r.actualRepairCost || r.estimatedRepairCost), 0),
    totalDeductions: damageReports.filter(r => r.deductionAmount).reduce((sum, r) => sum + r.deductionAmount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-yellow-100 text-yellow-700';
      case 'assessed': return 'bg-blue-100 text-blue-700';
      case 'repaired': return 'bg-green-100 text-green-700';
      case 'replaced': return 'bg-purple-100 text-purple-700';
      case 'written-off': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAccountabilityColor = (accountability: string) => {
    switch (accountability) {
      case 'driver': return 'bg-red-100 text-red-700';
      case 'normal-wear': return 'bg-yellow-100 text-yellow-700';
      case 'defect': return 'bg-blue-100 text-blue-700';
      case 'accident': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'all' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Total Reports</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </button>

        <button
          onClick={() => setSelectedStatus('reported')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'reported' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Reported</div>
          <div className="text-2xl font-bold text-yellow-700">{stats.reported}</div>
        </button>

        <button
          onClick={() => setSelectedStatus('assessed')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'assessed' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Assessed</div>
          <div className="text-2xl font-bold text-blue-700">{stats.assessed}</div>
        </button>

        <button
          onClick={() => setSelectedStatus('deducted')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'deducted' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Deducted</div>
          <div className="text-2xl font-bold text-green-700">{stats.deducted}</div>
        </button>
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Report Damage
        </button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 border-red-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-red-700 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Total Damage Cost
          </div>
          <div className="text-2xl font-bold text-red-700">${stats.totalCost.toFixed(2)}</div>
          <div className="text-xs text-red-600 mt-1">This month</div>
        </div>

        <div className="bg-green-50 border-green-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Total Deductions
          </div>
          <div className="text-2xl font-bold text-green-700">${stats.totalDeductions.toFixed(2)}</div>
          <div className="text-xs text-green-600 mt-1">Collected/Pending</div>
        </div>
      </div>

      {/* Damage Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.assetName}</h3>
                    <p className="text-sm text-gray-500">
                      {report.serialNumber && `SN: ${report.serialNumber} • `}
                      Report ID: {report.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAccountabilityColor(report.accountability)}`}>
                    {report.accountability.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Driver</div>
                    <div className="text-sm font-medium text-gray-900">{report.driverName}</div>
                    <div className="text-xs text-gray-500">{report.driverId}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Damage Date</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(report.damageDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Damage Cost</div>
                    <div className="text-sm font-medium text-red-700">
                      ${(report.actualRepairCost || report.estimatedRepairCost).toFixed(2)}
                    </div>
                    {report.actualRepairCost && report.actualRepairCost !== report.estimatedRepairCost && (
                      <div className="text-xs text-gray-500">Est: ${report.estimatedRepairCost.toFixed(2)}</div>
                    )}
                  </div>
                </div>

                {report.deductionAmount > 0 && (
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Deduction Amount</div>
                      <div className="text-sm font-medium text-green-700">${report.deductionAmount.toFixed(2)}</div>
                      <div className={`text-xs mt-1 ${report.deductionApplied ? 'text-green-600' : 'text-yellow-600'}`}>
                        {report.deductionApplied ? 'Deducted' : 'Pending'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Description</div>
                  <p className="text-sm text-gray-900">{report.damageDescription}</p>
                </div>

                <div className="flex items-center gap-4 pt-2 text-sm">
                  <div>
                    <span className="text-gray-600">Reported by:</span>{' '}
                    <span className="font-medium text-gray-900">{report.reportedBy}</span>
                  </div>
                  {report.damagePhotos && report.damagePhotos.length > 0 && (
                    <div className="text-blue-600">{report.damagePhotos.length} photo(s) attached</div>
                  )}
                  {report.deductionDate && (
                    <div className="text-green-600">
                      Deducted on {new Date(report.deductionDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {report.resolvedAt && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="font-medium text-blue-900">Resolved on {new Date(report.resolvedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                  View Details
                </button>
                {report.status === 'reported' && (
                  <>
                    <button className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg">
                      Assess & Set Deduction
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg">
                      Mark as Written Off
                    </button>
                  </>
                )}
                {report.status === 'assessed' && !report.deductionApplied && (
                  <button className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg">
                    Mark as Deducted
                  </button>
                )}
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Damage Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Report Damaged/Lost Asset</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asset *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select asset...</option>
                    <option value="AST001">Rabbit Scanner - RBT-2023-001</option>
                    <option value="AST002">Safety Vest - Large</option>
                    <option value="AST004">Delivery Phone - PHN-2024-008</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select driver...</option>
                    <option value="D042">Tom Jackson (D042)</option>
                    <option value="D023">Sarah Williams (D023)</option>
                    <option value="D015">Mike Thompson (D015)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Damage Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select type...</option>
                    <option value="screen-crack">Screen Crack</option>
                    <option value="water-damage">Water Damage</option>
                    <option value="physical-damage">Physical Damage</option>
                    <option value="lost">Lost</option>
                    <option value="stolen">Stolen</option>
                    <option value="malfunction">Malfunction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Damage Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Detailed description of damage or loss..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Repair/Replacement Cost *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Responsibility *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Assign responsibility...</option>
                    <option value="driver">Driver</option>
                    <option value="station">Station</option>
                    <option value="amazon">Amazon</option>
                    <option value="shared">Shared</option>
                    <option value="under-investigation">Under Investigation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Any additional information..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <p className="text-sm text-gray-600">Click to upload damage photos</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB each</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                Submit Damage Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
