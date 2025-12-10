import { useState } from 'react';
import { PackageX, Plus, User, MapPin, Calendar, AlertCircle } from 'lucide-react';
import type { RTSPackage } from '../../types/packages';

export default function RTSTracking() {
  const [showReportModal, setShowReportModal] = useState(false);

  const rtsPackages: RTSPackage[] = [
    {
      id: 'RTS001',
      trackingNumber: 'TBA123456789',
      driverId: 'D042',
      driverName: 'Tom Jackson',
      routeId: 'R023',
      date: '2025-12-10',
      reason: 'customer-not-available',
      reasonDetails: 'Customer not home after 3 attempts. No safe place to leave package.',
      customerAddress: '123 Main St, Apt 4B, Downtown',
      attempts: 3,
      accountability: 'customer',
      notes: 'Left notice cards on all 3 attempts. Customer did not respond to call or text.',
      photos: ['notice-card-1.jpg', 'notice-card-2.jpg'],
      reportedBy: 'Driver',
    },
    {
      id: 'RTS002',
      trackingNumber: 'TBA987654321',
      driverId: 'D023',
      driverName: 'Sarah Williams',
      routeId: 'R015',
      date: '2025-12-10',
      reason: 'access-issue',
      reasonDetails: 'Gated community. Gate code not working and customer not answering.',
      customerAddress: '456 Oak Lane, Gated Community',
      attempts: 2,
      accountability: 'customer',
      notes: 'Tried gate code provided - not working. Called customer - no answer.',
      reportedBy: 'Driver',
    },
    {
      id: 'RTS003',
      trackingNumber: 'TBA456789123',
      driverId: 'D015',
      driverName: 'Mike Thompson',
      routeId: 'R008',
      date: '2025-12-09',
      reason: 'damaged-package',
      reasonDetails: 'Package arrived at station pre-damaged. Could not deliver in current condition.',
      customerAddress: '789 Elm St, Residential',
      attempts: 1,
      accountability: 'amazon',
      notes: 'Package damaged before loaded on van. Photos taken at loading.',
      photos: ['damaged-1.jpg', 'damaged-2.jpg', 'damaged-3.jpg'],
      reportedBy: 'Driver',
      resolvedAt: new Date().toISOString(),
    },
  ];

  const stats = {
    totalRTS: rtsPackages.length,
    customerAccountable: rtsPackages.filter(p => p.accountability === 'customer').length,
    driverAccountable: rtsPackages.filter(p => p.accountability === 'driver').length,
    stationAccountable: rtsPackages.filter(p => p.accountability === 'station').length,
    amazonAccountable: rtsPackages.filter(p => p.accountability === 'amazon').length,
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'customer-not-available': return 'bg-blue-100 text-blue-700';
      case 'access-issue': return 'bg-purple-100 text-purple-700';
      case 'weather': return 'bg-gray-100 text-gray-700';
      case 'time-constraint': return 'bg-yellow-100 text-yellow-700';
      case 'wrong-address': return 'bg-orange-100 text-orange-700';
      case 'damaged-package': return 'bg-red-100 text-red-700';
      case 'customer-refused': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAccountabilityColor = (accountability: string) => {
    switch (accountability) {
      case 'driver': return 'bg-red-100 text-red-700';
      case 'customer': return 'bg-blue-100 text-blue-700';
      case 'station': return 'bg-yellow-100 text-yellow-700';
      case 'amazon': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RTS Tracking</h1>
          <p className="text-sm text-gray-600 mt-1">Track return-to-station packages and accountability</p>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Report RTS
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <PackageX className="w-4 h-4" />
            Total RTS
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalRTS}</div>
          <div className="text-xs text-gray-500 mt-1">Today</div>
        </div>

        <div className="bg-blue-50 border-blue-200 p-4 rounded-lg border">
          <div className="text-sm text-blue-700 mb-1">Customer</div>
          <div className="text-2xl font-bold text-blue-700">{stats.customerAccountable}</div>
          <div className="text-xs text-blue-600 mt-1">{((stats.customerAccountable / stats.totalRTS) * 100).toFixed(0)}%</div>
        </div>

        <div className="bg-red-50 border-red-200 p-4 rounded-lg border">
          <div className="text-sm text-red-700 mb-1">Driver</div>
          <div className="text-2xl font-bold text-red-700">{stats.driverAccountable}</div>
          <div className="text-xs text-red-600 mt-1">{((stats.driverAccountable / stats.totalRTS) * 100).toFixed(0)}%</div>
        </div>

        <div className="bg-yellow-50 border-yellow-200 p-4 rounded-lg border">
          <div className="text-sm text-yellow-700 mb-1">Station</div>
          <div className="text-2xl font-bold text-yellow-700">{stats.stationAccountable}</div>
          <div className="text-xs text-yellow-600 mt-1">{((stats.stationAccountable / stats.totalRTS) * 100).toFixed(0)}%</div>
        </div>

        <div className="bg-purple-50 border-purple-200 p-4 rounded-lg border">
          <div className="text-sm text-purple-700 mb-1">Amazon</div>
          <div className="text-2xl font-bold text-purple-700">{stats.amazonAccountable}</div>
          <div className="text-xs text-purple-600 mt-1">{((stats.amazonAccountable / stats.totalRTS) * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* RTS Packages List */}
      <div className="space-y-4">
        {rtsPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PackageX className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.trackingNumber}</h3>
                    <p className="text-sm text-gray-500">ID: {pkg.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getReasonColor(pkg.reason)}`}>
                    {pkg.reason.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAccountabilityColor(pkg.accountability)}`}>
                    {pkg.accountability.toUpperCase()}
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
                    <div className="text-sm font-medium text-gray-900">{pkg.driverName}</div>
                    <div className="text-xs text-gray-500">{pkg.driverId} • Route {pkg.routeId}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Date</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(pkg.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Address</div>
                    <div className="text-sm font-medium text-gray-900">{pkg.customerAddress}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Attempts</div>
                    <div className="text-sm font-medium text-gray-900">{pkg.attempts}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Reason Details</div>
                  <p className="text-sm text-gray-900">{pkg.reasonDetails}</p>
                </div>

                {pkg.notes && (
                  <div>
                    <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Notes</div>
                    <p className="text-sm text-gray-900">{pkg.notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Reported by:</span>{' '}
                    <span className="font-medium text-gray-900">{pkg.reportedBy}</span>
                  </div>
                  {pkg.photos && pkg.photos.length > 0 && (
                    <div className="text-sm text-blue-600">{pkg.photos.length} photo(s) attached</div>
                  )}
                  {pkg.resolvedAt && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Resolved
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  Update Accountability
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report RTS Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Report RTS Package</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">RTS Reason *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select reason...</option>
                  <option value="customer-not-available">Customer Not Available</option>
                  <option value="access-issue">Access Issue</option>
                  <option value="weather">Weather Related</option>
                  <option value="time-constraint">Time Constraint</option>
                  <option value="wrong-address">Wrong Address</option>
                  <option value="damaged-package">Damaged Package</option>
                  <option value="customer-refused">Customer Refused</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Address *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Main St, City, State ZIP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Attempts *</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason Details *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Provide detailed explanation..."
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Accountability *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Assign accountability...</option>
                  <option value="driver">Driver</option>
                  <option value="customer">Customer</option>
                  <option value="station">Station</option>
                  <option value="amazon">Amazon</option>
                  <option value="pending">Pending Investigation</option>
                </select>
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
                Submit RTS Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
