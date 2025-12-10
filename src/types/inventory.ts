export type AssetType = 'rabbit-scanner' | 'phone' | 'vest' | 'shirt' | 'bag' | 'other';
export type AssetStatus = 'assigned' | 'available' | 'damaged' | 'lost' | 'retired';
export type AssetCondition = 'new' | 'good' | 'fair' | 'poor' | 'broken';

export interface Asset {
  id: string;
  type: AssetType;
  name: string;
  serialNumber?: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  status: AssetStatus;
  condition: AssetCondition;
  assignedTo?: string;
  assignedDriverName?: string;
  assignedDate?: string;
  location: string;
  notes: string;
}

export interface AssetAssignment {
  id: string;
  assetId: string;
  assetType: AssetType;
  assetName: string;
  serialNumber?: string;
  driverId: string;
  driverName: string;
  assignedDate: string;
  returnedDate?: string;
  conditionAtAssignment: AssetCondition;
  conditionAtReturn?: AssetCondition;
  notes: string;
  photos?: string[];
}

export interface DamageReport {
  id: string;
  assetId: string;
  assetType: AssetType;
  assetName: string;
  serialNumber?: string;
  driverId: string;
  driverName: string;
  damageDate: string;
  damageDescription: string;
  damagePhotos: string[];
  estimatedRepairCost: number;
  actualRepairCost?: number;
  isRepairable: boolean;
  accountability: 'driver' | 'normal-wear' | 'defect' | 'accident';
  deductionAmount: number;
  deductionApplied: boolean;
  deductionDate?: string;
  status: 'reported' | 'assessed' | 'repaired' | 'replaced' | 'written-off';
  reportedBy: string;
  resolvedAt?: string;
}

export interface InventoryStats {
  totalAssets: number;
  assignedAssets: number;
  availableAssets: number;
  damagedAssets: number;
  lostAssets: number;
  totalValue: number;
  replacementCostThisMonth: number;
  deductionsTotalThisMonth: number;
}

export interface UniformSize {
  driverId: string;
  driverName: string;
  shirtSize: string;
  vestSize: string;
  pantsSize?: string;
  shoeSize?: string;
  lastUpdated: string;
}
