export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  hireDate: Date;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  photo?: string;

  // License Information
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: Date;
  licenseClass: string;

  // Background Check
  backgroundCheckStatus: 'pending' | 'approved' | 'rejected' | 'expired';
  backgroundCheckDate?: Date;
  backgroundCheckExpiry?: Date;

  // Amazon Training
  amazonTrainingCompleted: boolean;
  trainingCompletionDate?: Date;
  mentorStatus: 'not_started' | 'in_progress' | 'completed';

  // Performance
  deliveryScore?: number;
  safetyScore?: number;
  customerRating?: number;
  totalDeliveries?: number;
}

export interface DriverDocument {
  id: string;
  driverId: string;
  type: 'license' | 'id' | 'insurance' | 'tax_form' | 'background_check' | 'other';
  name: string;
  fileUrl: string;
  uploadDate: Date;
  expiryDate?: Date;
  status: 'valid' | 'expiring_soon' | 'expired';
  verified: boolean;
}

export interface TrainingCourse {
  id: string;
  name: string;
  description: string;
  category: 'safety' | 'delivery' | 'customer_service' | 'compliance' | 'vehicle';
  duration: number; // minutes
  required: boolean;
  amazonCertified: boolean;
}

export interface DriverTraining {
  id: string;
  driverId: string;
  courseId: string;
  courseName: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  startDate?: Date;
  completionDate?: Date;
  score?: number;
  expiryDate?: Date;
  certificateUrl?: string;
}

export interface SafetyCoaching {
  id: string;
  driverId: string;
  date: Date;
  type: 'positive' | 'corrective' | 'follow_up';
  category: 'speeding' | 'harsh_braking' | 'distraction' | 'seatbelt' | 'other';
  description: string;
  actionTaken: string;
  coachBy: string;
  resolved: boolean;
  followUpDate?: Date;
}

export interface DriverCertification {
  id: string;
  driverId: string;
  name: string;
  issuedBy: string;
  issueDate: Date;
  expiryDate?: Date;
  certificateNumber: string;
  status: 'active' | 'expired' | 'suspended';
}

export interface DriverAlert {
  id: string;
  driverId: string;
  type: 'license_expiry' | 'background_check' | 'training_due' | 'document_missing' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  date: Date;
  resolved: boolean;
  dueDate?: Date;
}
