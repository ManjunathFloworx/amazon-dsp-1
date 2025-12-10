export interface DriverPerformance {
  driverId: string;
  driverName: string;
  period: string;
  routesCompleted: number;
  packagesDelivered: number;
  onTimeDelivery: number;
  stopsPerHour: number;
  mentorScore: number;
  customerRating: number;
  rescuesNeeded: number;
  rescuesProvided: number;
  incidents: number;
  tier: 'Top Performer' | 'Solid' | 'Developing' | 'At Risk';
}

export interface DeliveryMetrics {
  date: string;
  totalPackages: number;
  deliveredPackages: number;
  rtsPackages: number;
  onTimeDelivery: number;
  stopsPerHour: number;
  deliveryCompletion: number;
  missedStops: number;
}

export interface RescueMetrics {
  date: string;
  totalRescues: number;
  rescuesCompleted: number;
  averageRescuePackages: number;
  rescueRate: number;
  rescueCost: number;
  topRescuers: Array<{
    driverId: string;
    driverName: string;
    rescuesProvided: number;
  }>;
  topRescueRecipients: Array<{
    driverId: string;
    driverName: string;
    rescuesReceived: number;
  }>;
}

export interface VehicleHealthMetrics {
  period: string;
  totalVehicles: number;
  activeVehicles: number;
  inMaintenance: number;
  totalMaintenanceCost: number;
  costPerVehicle: number;
  unplannedRepairs: number;
  averageDowntime: number;
}

export interface PayrollForecast {
  period: string;
  estimatedHours: number;
  estimatedRegularPay: number;
  estimatedOvertimePay: number;
  estimatedIncentives: number;
  estimatedGrossPay: number;
  estimatedRevenue: number;
  laborCostPercentage: number;
  profitMargin: number;
}

export interface SafetyTrend {
  week: string;
  mentorScore: number;
  accidents: number;
  complaints: number;
  violations: number;
  fleetSafetyScore: number;
  tier: 'Fantastic' | 'Great' | 'Fair' | 'At Risk';
}

export interface DashboardSummary {
  activeRoutes: number;
  activeDrivers: number;
  completionRate: number;
  onTimeDelivery: number;
  stopsPerHour: number;
  rescuesInProgress: number;
  incidentsToday: number;
  vehiclesInMaintenance: number;
  fleetSafetyScore: number;
}
