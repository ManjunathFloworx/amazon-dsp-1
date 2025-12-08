export type PayPeriodType = 'weekly' | 'biweekly' | 'monthly';
export type IncentiveType =
  | 'on-time-departure'
  | 'performance-bonus'
  | 'rescue-route'
  | 'safety-bonus'
  | 'mentor-score'
  | 'complaint-free';

export interface PayrollRecord {
  id: string;
  driverId: string;
  driverName: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  overtimeRate: number;
  regularPay: number;
  overtimePay: number;
  totalIncentives: number;
  totalDeductions: number;
  grossPay: number;
  netPay: number;
  ptoUsed: number;
  ptoRemaining: number;
  sickLeaveUsed: number;
  sickLeaveRemaining: number;
  status: 'pending' | 'approved' | 'paid';
}

export interface Incentive {
  id: string;
  driverId: string;
  driverName: string;
  type: IncentiveType;
  date: string;
  amount: number;
  description: string;
  shiftId?: string;
  routeId?: string;
  metricValue?: number;
}

export interface TimeEntry {
  id: string;
  driverId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  regularHours: number;
  overtimeHours: number;
  shiftId: string;
}

export interface PTOBalance {
  driverId: string;
  driverName: string;
  ptoTotal: number;
  ptoUsed: number;
  ptoRemaining: number;
  sickLeaveTotal: number;
  sickLeaveUsed: number;
  sickLeaveRemaining: number;
  lastUpdated: string;
}

export interface PayStub {
  id: string;
  payrollRecordId: string;
  driverId: string;
  driverName: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  earnings: {
    regularPay: number;
    overtimePay: number;
    incentives: Incentive[];
  };
  deductions: {
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
    other: number;
  };
  grossPay: number;
  netPay: number;
  ytdGross: number;
  ytdNet: number;
}

export interface IncentiveRule {
  id: string;
  type: IncentiveType;
  name: string;
  description: string;
  amount: number;
  isActive: boolean;
  conditions: {
    minMentorScore?: number;
    maxComplaints?: number;
    onTimeDepartureThreshold?: number;
    minPackagesDelivered?: number;
    minRescueRoutes?: number;
  };
}

export interface PayrollSummary {
  totalDrivers: number;
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalRegularPay: number;
  totalOvertimePay: number;
  totalIncentives: number;
  totalGrossPay: number;
  totalNetPay: number;
  averagePayPerDriver: number;
}
