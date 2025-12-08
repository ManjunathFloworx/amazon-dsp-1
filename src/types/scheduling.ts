export type ShiftStatus = 'scheduled' | 'in-progress' | 'completed' | 'missed' | 'cancelled';
export type AttendanceStatus = 'on-time' | 'late' | 'absent' | 'early-departure';
export type LeaveType = 'pto' | 'sick' | 'day-off' | 'unpaid';

export interface Shift {
  id: string;
  driverId: string;
  driverName: string;
  date: string;
  startTime: string;
  endTime: string;
  routeId?: string;
  routeName?: string;
  wave: number;
  status: ShiftStatus;
  backupDriverId?: string;
  backupDriverName?: string;
}

export interface Attendance {
  id: string;
  driverId: string;
  driverName: string;
  shiftId: string;
  date: string;
  scheduledClockIn: string;
  actualClockIn?: string;
  scheduledClockOut: string;
  actualClockOut?: string;
  status: AttendanceStatus;
  gpsLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  lateMinutes?: number;
  earlyDepartureMinutes?: number;
}

export interface LeaveRequest {
  id: string;
  driverId: string;
  driverName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
}

export interface Route {
  id: string;
  name: string;
  manifestId: string;
  date: string;
  wave: number;
  estimatedPackages: number;
  estimatedStops: number;
  area: string;
  difficulty: 'easy' | 'medium' | 'hard';
  assignedDriverId?: string;
  assignedDriverName?: string;
  status: 'unassigned' | 'assigned' | 'in-progress' | 'completed';
}

export interface ScheduleStats {
  totalShifts: number;
  assignedShifts: number;
  unassignedShifts: number;
  activeDrivers: number;
  driversOnLeave: number;
  backupNeeded: number;
}
