export type DriverStatus = 'on-route' | 'stalled' | 'zero-movement' | 'completed' | 'returning';
export type RescueStatus = 'needed' | 'assigned' | 'in-progress' | 'completed';

export interface DriverLocation {
  driverId: string;
  driverName: string;
  latitude: number;
  longitude: number;
  routeId: string;
  routeName: string;
  status: DriverStatus;
  completionPercentage: number;
  packagesRemaining: number;
  stopsRemaining: number;
  lastUpdate: string;
  speed: number;
  estimatedCompletion: string;
}

export interface RescueOperation {
  id: string;
  routeId: string;
  routeName: string;
  originalDriverId: string;
  originalDriverName: string;
  rescueDriverId?: string;
  rescueDriverName?: string;
  status: RescueStatus;
  packagesRemaining: number;
  stopsRemaining: number;
  reason: string;
  requestedAt: string;
  assignedAt?: string;
  completedAt?: string;
}

export interface StationMetrics {
  date: string;
  totalRoutes: number;
  onTimeDeparts: number;
  lateDeparts: number;
  averageDepartDelay: number;
  onRoadDeliveryRate: number;
  rtsPackages: number;
  rtsPercentage: number;
  rescuesNeeded: number;
  rescuesCompleted: number;
}

export interface RouteProgress {
  routeId: string;
  routeName: string;
  driverId: string;
  driverName: string;
  totalPackages: number;
  deliveredPackages: number;
  totalStops: number;
  completedStops: number;
  completionPercentage: number;
  currentLocation: string;
  status: DriverStatus;
  lastScanTime: string;
  estimatedCompletion: string;
}
