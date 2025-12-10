import { useState } from 'react';
import { Activity, AlertCircle, CheckCircle2, Clock, User, Package } from 'lucide-react';
import type { RescueOperation } from '../../types/dispatch';

export default function RescueOperations() {
  const [selectedTab, setSelectedTab] = useState<'needed' | 'in-progress' | 'completed'>('needed');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock data
  const rescueOperations: RescueOperation[] = [
    {
      id: 'RSC001',
      routeId: 'R015',
      routeName: 'North Valley Route',
      originalDriverId: 'D015',
      originalDriverName: 'Mike Thompson',
      status: 'needed',
      packagesRemaining: 85,
      stopsRemaining: 72,
      reason: 'Behind schedule - vehicle issue delay',
      requestedAt: new Date().toISOString(),
    },
    {
      id: 'RSC002',
      routeId: 'R023',
      routeName: 'East Side Zone',
      originalDriverId: 'D023',
      originalDriverName: 'Sarah Williams',
      rescueDriverId: 'D042',
      rescueDriverName: 'Tom Jackson',
      status: 'in-progress',
      packagesRemaining: 45,
      stopsRemaining: 38,
      reason: 'High package volume',
      requestedAt: new Date(Date.now() - 3600000).toISOString(),
      assignedAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 'RSC003',
      routeId: 'R008',
      routeName: 'Downtown Circuit',
      originalDriverId: 'D008',
      originalDriverName: 'Emma Davis',
      rescueDriverId: 'D051',
      rescueDriverName: 'James Brown',
      status: 'completed',
      packagesRemaining: 0,
      stopsRemaining: 0,
      reason: 'Traffic delays',
      requestedAt: new Date(Date.now() - 7200000).toISOString(),
      assignedAt: new Date(Date.now() - 5400000).toISOString(),
      completedAt: new Date(Date.now() - 1200000).toISOString(),
    },
  ];

  const filteredRescues = rescueOperations.filter(r => r.status === selectedTab);

  const stats = {
    needed: rescueOperations.filter(r => r.status === 'needed').length,
    inProgress: rescueOperations.filter(r => r.status === 'in-progress').length,
    completed: rescueOperations.filter(r => r.status === 'completed').length,
    avgPackages: 56,
  };

  const handleAssignRescue = () => {
    setShowAssignModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rescue Operations</h1>
        <p className="text-sm text-gray-600 mt-1">Manage and track rescue assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border-red-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-red-700 text-sm mb-1">
            <AlertCircle className="w-4 h-4" />
            Rescue Needed
          </div>
          <div className="text-2xl font-bold text-red-700">{stats.needed}</div>
        </div>

        <div className="bg-yellow-50 border-yellow-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-yellow-700 text-sm mb-1">
            <Activity className="w-4 h-4" />
            In Progress
          </div>
          <div className="text-2xl font-bold text-yellow-700">{stats.inProgress}</div>
        </div>

        <div className="bg-green-50 border-green-200 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
            <CheckCircle2 className="w-4 h-4" />
            Completed Today
          </div>
          <div className="text-2xl font-bold text-green-700">{stats.completed}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Package className="w-4 h-4" />
            Avg Rescue Packages
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.avgPackages}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setSelectedTab('needed')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'needed'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Rescue Needed ({stats.needed})
            </button>
            <button
              onClick={() => setSelectedTab('in-progress')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'in-progress'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              In Progress ({stats.inProgress})
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'completed'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </nav>
        </div>

        {/* Rescue List */}
        <div className="divide-y divide-gray-200">
          {filteredRescues.length === 0 ? (
            <div className="p-12 text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No rescue operations in this category</p>
            </div>
          ) : (
            filteredRescues.map((rescue) => (
              <div key={rescue.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{rescue.routeName}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rescue.status === 'needed'
                            ? 'bg-red-100 text-red-700'
                            : rescue.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {rescue.status}
                      </span>
                      <span className="text-sm text-gray-500">ID: {rescue.id}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Original Driver</div>
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <User className="w-4 h-4 text-gray-400" />
                          {rescue.originalDriverName}
                        </div>
                        <div className="text-xs text-gray-500">{rescue.originalDriverId}</div>
                      </div>

                      {rescue.rescueDriverName && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Rescue Driver</div>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <User className="w-4 h-4 text-green-600" />
                            {rescue.rescueDriverName}
                          </div>
                          <div className="text-xs text-gray-500">{rescue.rescueDriverId}</div>
                        </div>
                      )}

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Remaining</div>
                        <div className="text-sm font-medium text-gray-900">
                          {rescue.packagesRemaining} packages
                        </div>
                        <div className="text-xs text-gray-500">{rescue.stopsRemaining} stops</div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Requested</div>
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {new Date(rescue.requestedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <span>
                        <span className="font-medium">Reason:</span> {rescue.reason}
                      </span>
                    </div>

                    {rescue.status === 'in-progress' && rescue.assignedAt && (
                      <div className="mt-2 text-xs text-green-600">
                        Assigned {new Date(rescue.assignedAt).toLocaleTimeString()}
                      </div>
                    )}

                    {rescue.status === 'completed' && rescue.completedAt && (
                      <div className="mt-2 text-xs text-green-600">
                        Completed {new Date(rescue.completedAt).toLocaleTimeString()}
                      </div>
                    )}
                  </div>

                  <div>
                    {rescue.status === 'needed' && (
                      <button
                        onClick={handleAssignRescue}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                      >
                        Assign Rescue
                      </button>
                    )}
                    {rescue.status === 'in-progress' && (
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200">
                        Track Progress
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Assign Rescue Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Assign Rescue Driver</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Available Driver
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choose a driver...</option>
                  <option value="D051">James Brown - Available</option>
                  <option value="D063">Lisa Anderson - Available</option>
                  <option value="D078">Robert Martinez - Available</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Packages to Transfer
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number of packages"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Additional notes for rescue driver..."
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
                Assign Rescue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
