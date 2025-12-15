import { useState } from 'react';
import { Search, Plus, User, MapPin, DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { LostPackage } from '../../types/packages';

export default function LostPackages() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'reported' | 'investigating' | 'found' | 'confirmed-lost'>('all');
  const [showReportModal, setShowReportModal] = useState(false);

  const lostPackages: LostPackage[] = [
    {
      id: 'LOST001',
      trackingNumber: 'TBA111222333',
      driverId: 'D042',
      driverName: 'Tom Jackson',
      routeId: 'R023',
      date: '2025-12-09',
      lastKnownLocation: 'Loaded on van at station - never scanned for delivery',
      customerAddress: '555 Pine St, Residential Area',
      packageValue: 89.99,
      status: 'investigating',
      investigationSteps: [
        {
          id: 'STEP001',
          step: 'Initial Report',
          description: 'Driver reported package missing during end-of-route reconciliation',
          completedBy: 'Driver Tom Jackson',
          completedAt: '2025-12-09T18:30:00Z',
          findings: 'Package scanned at load-out but not found in van at EOD',
          evidence: [],
        },
        {
          id: 'STEP002',
          step: 'Van Search',
          description: 'Thorough search of delivery van conducted',
          completedBy: 'Supervisor John Smith',
          completedAt: '2025-12-09T19:00:00Z',
          findings: 'Package not found in van. Checked all compartments and under seats.',
          evidence: ['van-search-photo1.jpg', 'van-search-photo2.jpg'],
        },
        {
          id: 'STEP003',
          step: 'Station Review',
          description: 'Review station camera footage and loading process',
          completedBy: 'Station Manager',
          completedAt: '2025-12-09T20:15:00Z',
          findings: 'Footage shows package loaded onto van at 08:45 AM',
          evidence: ['camera-footage-timestamp.jpg'],
        },
      ],
      accountability: 'pending',
      resolution: '',
      financialImpact: 0,
      reportedAt: '2025-12-09T18:30:00Z',
    },
    {
      id: 'LOST002',
      trackingNumber: 'TBA444555666',
      driverId: 'D023',
      driverName: 'Sarah Williams',
      routeId: 'R015',
      date: '2025-12-08',
      lastKnownLocation: 'Scanned as delivered to front porch',
      customerAddress: '123 Oak Avenue, Suburb',
      packageValue: 45.50,
      status: 'confirmed-lost',
      investigationSteps: [
        {
          id: 'STEP101',
          step: 'Customer Contact',
          description: 'Contacted customer about missing package',
          completedBy: 'Customer Service',
          completedAt: '2025-12-08T16:00:00Z',
          findings: 'Customer states package never received despite delivery scan',
          evidence: [],
        },
        {
          id: 'STEP102',
          step: 'Driver Interview',
          description: 'Interview driver about delivery',
          completedBy: 'Supervisor Mary Johnson',
          completedAt: '2025-12-08T17:30:00Z',
          findings: 'Driver confirms delivery to front porch, photo on file shows delivery',
          evidence: ['delivery-photo.jpg'],
        },
        {
          id: 'STEP103',
          step: 'Neighbor Check',
          description: 'Check with neighbors for package',
          completedBy: 'Customer',
          completedAt: '2025-12-08T18:00:00Z',
          findings: 'Neighbors did not receive package',
          evidence: [],
        },
        {
          id: 'STEP104',
          step: 'Final Resolution',
          description: 'Package confirmed stolen after delivery',
          completedBy: 'Investigation Team',
          completedAt: '2025-12-09T10:00:00Z',
          findings: 'Evidence shows proper delivery. Package likely stolen from porch.',
          evidence: [],
        },
      ],
      accountability: 'customer',
      resolution: 'Package confirmed delivered properly with photo evidence. Theft likely occurred post-delivery. Customer refunded by Amazon.',
      financialImpact: 0,
      reportedAt: '2025-12-08T15:00:00Z',
      closedAt: '2025-12-09T10:00:00Z',
    },
    {
      id: 'LOST003',
      trackingNumber: 'TBA777888999',
      driverId: 'D015',
      driverName: 'Mike Thompson',
      routeId: 'R008',
      date: '2025-12-07',
      lastKnownLocation: 'Scanned at customer mailbox',
      customerAddress: '789 Maple Drive, Downtown',
      packageValue: 125.00,
      status: 'found',
      investigationSteps: [
        {
          id: 'STEP201',
          step: 'Initial Report',
          description: 'Customer reported package not received',
          completedBy: 'Customer Service',
          completedAt: '2025-12-07T14:00:00Z',
          findings: 'Customer states mailbox was empty when checked',
          evidence: [],
        },
        {
          id: 'STEP202',
          step: 'Location Verification',
          description: 'Return to delivery address to verify',
          completedBy: 'Driver Mike Thompson',
          completedAt: '2025-12-07T16:30:00Z',
          findings: 'Package found in secondary mailbox cluster. Customer was checking wrong mailbox.',
          evidence: ['found-package-photo.jpg'],
        },
      ],
      accountability: 'customer',
      resolution: 'Package located in correct mailbox. Customer was unaware of secondary mailbox location.',
      financialImpact: 0,
      reportedAt: '2025-12-07T14:00:00Z',
      closedAt: '2025-12-07T16:30:00Z',
    },
  ];

  const filteredPackages = selectedStatus === 'all'
    ? lostPackages
    : lostPackages.filter(p => p.status === selectedStatus);

  const stats = {
    total: lostPackages.length,
    reported: lostPackages.filter(p => p.status === 'reported').length,
    investigating: lostPackages.filter(p => p.status === 'investigating').length,
    found: lostPackages.filter(p => p.status === 'found').length,
    confirmedLost: lostPackages.filter(p => p.status === 'confirmed-lost').length,
    totalValue: lostPackages.reduce((sum, p) => sum + p.packageValue, 0),
    financialImpact: lostPackages.reduce((sum, p) => sum + p.financialImpact, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-700';
      case 'investigating': return 'bg-yellow-100 text-yellow-700';
      case 'found': return 'bg-green-100 text-green-700';
      case 'confirmed-lost': return 'bg-red-100 text-red-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'all' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">All Cases</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </button>

        <button
          onClick={() => setSelectedStatus('investigating')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'investigating' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Investigating</div>
          <div className="text-2xl font-bold text-yellow-700">{stats.investigating}</div>
        </button>

        <button
          onClick={() => setSelectedStatus('found')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'found' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Found</div>
          <div className="text-2xl font-bold text-green-700">{stats.found}</div>
        </button>

        <button
          onClick={() => setSelectedStatus('confirmed-lost')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${selectedStatus === 'confirmed-lost' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <div className="text-sm text-gray-600 mb-1">Confirmed Lost</div>
          <div className="text-2xl font-bold text-red-700">{stats.confirmedLost}</div>
        </button>
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Report Lost Package
        </button>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 border-purple-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-purple-700 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Total Package Value
          </div>
          <div className="text-2xl font-bold text-purple-700">${stats.totalValue.toFixed(2)}</div>
        </div>

        <div className="bg-orange-50 border-orange-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-orange-700 text-sm mb-1">
            <AlertCircle className="w-4 h-4" />
            Financial Impact
          </div>
          <div className="text-2xl font-bold text-orange-700">${stats.financialImpact.toFixed(2)}</div>
        </div>
      </div>

      {/* Lost Packages List */}
      <div className="space-y-4">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.trackingNumber}</h3>
                    <p className="text-sm text-gray-500">Case ID: {pkg.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                    {pkg.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">${pkg.packageValue.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Package Value</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Driver</div>
                    <div className="text-sm font-medium text-gray-900">{pkg.driverName}</div>
                    <div className="text-xs text-gray-500">{pkg.driverId} • Route {pkg.routeId}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Delivery Address</div>
                    <div className="text-sm font-medium text-gray-900">{pkg.customerAddress}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Reported</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(pkg.reportedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Last Known Location</div>
                <p className="text-sm text-gray-900">{pkg.lastKnownLocation}</p>
              </div>

              {/* Investigation Steps */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-900 mb-3">Investigation Timeline</div>
                <div className="space-y-3">
                  {pkg.investigationSteps.map((step, index) => (
                    <div key={step.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === pkg.investigationSteps.length - 1 ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                          <CheckCircle2 className={`w-4 h-4 ${index === pkg.investigationSteps.length - 1 ? 'text-white' : 'text-gray-600'
                            }`} />
                        </div>
                        {index < pkg.investigationSteps.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-gray-900 text-sm">{step.step}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(step.completedAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">{step.description}</div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">By:</span> {step.completedBy}
                        </div>
                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-900">
                          <span className="font-medium">Findings:</span> {step.findings}
                        </div>
                        {step.evidence && step.evidence.length > 0 && (
                          <div className="mt-1 text-xs text-blue-600">
                            {step.evidence.length} evidence file(s) attached
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {pkg.resolution && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <div className="text-xs font-semibold text-green-800 uppercase mb-1">Resolution</div>
                  <p className="text-sm text-green-900">{pkg.resolution}</p>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Accountability:</span>{' '}
                  <span className="font-medium text-gray-900">{pkg.accountability.toUpperCase()}</span>
                </div>
                {pkg.closedAt && (
                  <div className="text-green-600">
                    Closed: {new Date(pkg.closedAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                  View Full Details
                </button>
                {pkg.status === 'investigating' && (
                  <>
                    <button className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg">
                      Add Investigation Step
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                      Update Status
                    </button>
                  </>
                )}
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Lost Package Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Report Lost Package</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="TBA123456789"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select driver...</option>
                    <option value="D042">Tom Jackson (D042)</option>
                    <option value="D023">Sarah Williams (D023)</option>
                    <option value="D015">Mike Thompson (D015)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="R023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Address *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Main St, City, State ZIP"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Value *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Known Location *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Where was the package last seen or scanned?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investigation Notes *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Provide details about the circumstances..."
                />
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
                Start Investigation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
