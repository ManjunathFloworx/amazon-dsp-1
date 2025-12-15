import { useState } from 'react';
import { MapPin, Package, Upload, Users, AlertCircle } from 'lucide-react';
import type { Route } from '../../types/scheduling';

export default function RouteAssignment() {
  const [selectedWave, setSelectedWave] = useState<number | 'all'>('all');
  const [draggedRoute, setDraggedRoute] = useState<string | null>(null);

  // Mock data
  const routes: Route[] = [
    {
      id: 'R001',
      name: 'Downtown Zone A',
      manifestId: 'M001',
      date: new Date().toISOString().split('T')[0],
      wave: 1,
      estimatedPackages: 250,
      estimatedStops: 180,
      area: 'Downtown',
      difficulty: 'hard',
      assignedDriverId: 'D001',
      assignedDriverName: 'John Smith',
      status: 'assigned',
    },
    {
      id: 'R002',
      name: 'Suburbs Zone B',
      manifestId: 'M002',
      date: new Date().toISOString().split('T')[0],
      wave: 2,
      estimatedPackages: 200,
      estimatedStops: 150,
      area: 'Suburbs',
      difficulty: 'medium',
      status: 'unassigned',
    },
    {
      id: 'R003',
      name: 'Industrial Park',
      manifestId: 'M003',
      date: new Date().toISOString().split('T')[0],
      wave: 1,
      estimatedPackages: 180,
      estimatedStops: 120,
      area: 'Industrial',
      difficulty: 'easy',
      assignedDriverId: 'D003',
      assignedDriverName: 'Mike Davis',
      status: 'assigned',
    },
  ];

  const availableDrivers = [
    { id: 'D002', name: 'Sarah Johnson', status: 'available', score: 95 },
    { id: 'D004', name: 'Emily Brown', status: 'available', score: 88 },
    { id: 'D005', name: 'Tom Wilson', status: 'available', score: 92 },
  ];

  const filteredRoutes =
    selectedWave === 'all' ? routes : routes.filter((r) => r.wave === selectedWave);

  const stats = {
    totalRoutes: routes.length,
    assigned: routes.filter((r) => r.status === 'assigned').length,
    unassigned: routes.filter((r) => r.status === 'unassigned').length,
    availableDrivers: availableDrivers.length,
  };

  const handleDragStart = (routeId: string) => {
    setDraggedRoute(routeId);
  };

  const handleDragEnd = () => {
    setDraggedRoute(null);
  };

  const handleDrop = (driverId: string) => {
    if (draggedRoute) {
      console.log(`Assigning route ${draggedRoute} to driver ${driverId}`);
      // Implement actual assignment logic here
    }
  };

  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <MapPin className="w-4 h-4" />
            Total Routes
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalRoutes}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
            <Package className="w-4 h-4" />
            Assigned
          </div>
          <div className="text-2xl font-bold text-green-700">{stats.assigned}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-orange-200 bg-orange-50">
          <div className="flex items-center gap-2 text-orange-700 text-sm mb-1">
            <AlertCircle className="w-4 h-4" />
            Unassigned
          </div>
          <div className="text-2xl font-bold text-orange-700">{stats.unassigned}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Users className="w-4 h-4" />
            Available Drivers
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.availableDrivers}</div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4" />
          Import Manifest
        </button>
      </div>

      {/* Wave Filter */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Wave:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedWave('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedWave === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              All Waves
            </button>
            <button
              onClick={() => setSelectedWave(1)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedWave === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Wave 1
            </button>
            <button
              onClick={() => setSelectedWave(2)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedWave === 2
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Wave 2
            </button>
            <button
              onClick={() => setSelectedWave(3)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedWave === 3
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Wave 3
            </button>
          </div>
        </div>
      </div>

      {/* Drag and Drop Assignment Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Routes Column */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Routes</h2>
          <div className="space-y-3">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                draggable={route.status === 'unassigned'}
                onDragStart={() => handleDragStart(route.id)}
                onDragEnd={handleDragEnd}
                className={`bg-white p-4 rounded-lg border-2 transition-all ${route.status === 'unassigned'
                    ? 'border-gray-200 hover:border-blue-400 cursor-move'
                    : 'border-green-200 bg-green-50'
                  } ${draggedRoute === route.id ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{route.name}</div>
                    <div className="text-sm text-gray-500">{route.manifestId}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${route.difficulty === 'easy'
                        ? 'bg-green-100 text-green-700'
                        : route.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {route.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Packages:</span>
                    <span className="ml-1 font-medium text-gray-900">
                      {route.estimatedPackages}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Stops:</span>
                    <span className="ml-1 font-medium text-gray-900">{route.estimatedStops}</span>
                  </div>
                </div>

                {route.assignedDriverName && (
                  <div className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                    <Users className="w-3 h-3" />
                    Assigned to {route.assignedDriverName}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Drivers Column */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Available Drivers</h2>
          <div className="space-y-3">
            {availableDrivers.map((driver) => (
              <div
                key={driver.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(driver.id)}
                className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{driver.name}</div>
                    <div className="text-sm text-gray-500">{driver.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Score</div>
                    <div className="text-lg font-bold text-green-600">{driver.score}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 italic">
                  Drop a route here to assign
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
