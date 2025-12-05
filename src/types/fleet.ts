export interface Vehicle {
  id: string;
  vin: string;
  model: string;
  plate: string;
  mileage: number;
  amazonBrandingStatus: 'branded' | 'unbranded' | 'pending';
  registrationExpiry: Date;
  insuranceExpiry: Date;
  status: 'active' | 'maintenance' | 'inactive' | 'flagged';
  lastInspection?: Date;
  nextMaintenance?: Date;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'oil_change' | 'tire_rotation' | 'brake_inspection' | 'general' | 'other';
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  cost?: number;
  status: 'scheduled' | 'completed' | 'overdue';
  notes?: string;
  recurring: boolean;
  recurringInterval?: number; // days
}

export interface InspectionRecord {
  id: string;
  vehicleId: string;
  type: 'pre_trip' | 'post_trip';
  date: Date;
  inspector: string;
  checklistItems: ChecklistItem[];
  photos: InspectionPhoto[];
  status: 'passed' | 'failed' | 'flagged';
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  status: 'pass' | 'fail' | 'na';
  notes?: string;
}

export interface InspectionPhoto {
  id: string;
  url: string;
  category: 'damage' | 'exterior' | 'interior' | 'other';
  description?: string;
  timestamp: Date;
}

export interface FleetUtilization {
  vehicleId: string;
  date: Date;
  hoursUsed: number;
  milesDelivered: number;
  packagesDelivered: number;
  routesCompleted: number;
  idleTime: number;
}

export interface Alert {
  id: string;
  vehicleId: string;
  type: 'maintenance' | 'registration' | 'insurance' | 'inspection' | 'safety';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  date: Date;
  resolved: boolean;
}
