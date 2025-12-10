export type RTSReason =
  | 'customer-not-available'
  | 'access-issue'
  | 'weather'
  | 'time-constraint'
  | 'wrong-address'
  | 'damaged-package'
  | 'customer-refused'
  | 'other';

export type PackageStatus = 'delivered' | 'rts' | 'lost' | 'damaged' | 'investigating';
export type AccountabilityStatus = 'driver' | 'customer' | 'station' | 'amazon' | 'pending';

export interface RTSPackage {
  id: string;
  trackingNumber: string;
  driverId: string;
  driverName: string;
  routeId: string;
  date: string;
  reason: RTSReason;
  reasonDetails: string;
  customerAddress: string;
  attempts: number;
  accountability: AccountabilityStatus;
  notes: string;
  photos?: string[];
  reportedBy: string;
  resolvedAt?: string;
}

export interface LostPackage {
  id: string;
  trackingNumber: string;
  driverId: string;
  driverName: string;
  routeId: string;
  date: string;
  lastKnownLocation: string;
  customerAddress: string;
  packageValue: number;
  status: 'reported' | 'investigating' | 'found' | 'confirmed-lost' | 'closed';
  investigationSteps: InvestigationStep[];
  accountability: AccountabilityStatus;
  resolution: string;
  financialImpact: number;
  reportedAt: string;
  closedAt?: string;
}

export interface InvestigationStep {
  id: string;
  step: string;
  description: string;
  completedBy: string;
  completedAt: string;
  findings: string;
  evidence?: string[];
}

export interface PackageException {
  id: string;
  type: 'rts' | 'lost' | 'damaged' | 'misdelivered';
  trackingNumber: string;
  driverId: string;
  driverName: string;
  date: string;
  status: PackageStatus;
  accountability: AccountabilityStatus;
  financialImpact: number;
  resolved: boolean;
}

export interface ExceptionStats {
  totalExceptions: number;
  rtsCount: number;
  lostCount: number;
  damagedCount: number;
  driverAccountable: number;
  customerAccountable: number;
  stationAccountable: number;
  totalFinancialImpact: number;
}
