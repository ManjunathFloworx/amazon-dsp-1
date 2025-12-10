export type IncidentType = 'accident' | 'complaint' | 'dog-incident' | 'hazard' | 'vehicle-damage';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'reported' | 'investigating' | 'coaching-required' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  driverId: string;
  driverName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  witnessStatement?: string;
  policeReportNumber?: string;
  photos?: string[];
  actionsTaken: string;
  coachingRequired: boolean;
  reportedBy: string;
  reportedAt: string;
  resolvedAt?: string;
}

export interface SafetyCoaching {
  id: string;
  driverId: string;
  driverName: string;
  incidentId?: string;
  coachingType: 'corrective' | 'preventive' | 'positive';
  date: string;
  topic: string;
  description: string;
  actionPlan: string;
  followUpDate?: string;
  documentUrls: string[];
  driverSignature?: string;
  coachSignature: string;
  coachName: string;
  status: 'scheduled' | 'completed' | 'follow-up-needed';
}

export interface MentorScore {
  driverId: string;
  driverName: string;
  date: string;
  score: number;
  hardBraking: number;
  hardAcceleration: number;
  hardCornering: number;
  speeding: number;
  seatbeltOff: number;
  phoneUse: number;
  reverseSpeed: number;
  followingDistance: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface DAScorecard {
  driverId: string;
  driverName: string;
  week: string;
  deliveryCompletion: number;
  onTimeDelivery: number;
  customerFeedback: number;
  photoOnDelivery: number;
  dnr: number;
  concessionRate: number;
  seatbeltOffRate: number;
  speedingEvents: number;
  distractedDriving: number;
  overallScore: number;
  tier: 'Fantastic' | 'Great' | 'Fair' | 'At Risk';
}

export interface FleetSafetyScore {
  week: string;
  overallScore: number;
  mentorScore: number;
  accidentRate: number;
  complaintRate: number;
  violationCount: number;
  tier: 'Fantastic' | 'Great' | 'Fair' | 'At Risk';
  trend: 'improving' | 'stable' | 'declining';
}
