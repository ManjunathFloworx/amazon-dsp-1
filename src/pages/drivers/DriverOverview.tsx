import { useState } from 'react';
import { Search, Plus, Mail, Phone, Calendar, Star, Award, AlertCircle } from 'lucide-react';
import { mockDrivers, mockDriverAlerts } from '../../data/mockData';
import type { Driver } from '../../types/driver';
import { format, differenceInDays } from 'date-fns';

export default function DriverOverview() {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Driver['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getBackgroundCheckColor = (status: Driver['backgroundCheckStatus']) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      case 'expired': return 'text-orange-600';
    }
  };

  const getMentorStatusColor = (status: Driver['mentorStatus']) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-blue-600';
      case 'not_started': return 'text-gray-600';
    }
  };

  const getLicenseWarning = (expiryDate: Date) => {
    const days = differenceInDays(expiryDate, new Date());
    if (days < 0) return { text: 'EXPIRED', color: 'text-red-600 font-bold' };
    if (days < 30) return { text: `${days} days`, color: 'text-red-600' };
    if (days < 60) return { text: `${days} days`, color: 'text-yellow-600' };
    return { text: `${days} days`, color: 'text-gray-600' };
  };

  const stats = [
    {
      label: 'Total Drivers',
      value: drivers.length,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Active',
      value: drivers.filter((d) => d.status === 'active').length,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Training',
      value: drivers.filter((d) => d.mentorStatus === 'in_progress').length,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'On Leave',
      value: drivers.filter((d) => d.status === 'on_leave').length,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="inactive">Inactive</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Driver
        </button>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredDrivers.map((driver) => {
          const licenseWarning = getLicenseWarning(driver.licenseExpiry);
          const driverAlerts = mockDriverAlerts.filter(
            (a) => a.driverId === driver.id && !a.resolved
          );

          return (
            <div
              key={driver.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {driver.firstName[0]}{driver.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {driver.firstName} {driver.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {driver.employeeId}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                        driver.status
                      )}`}
                    >
                      {driver.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{driver.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Hired: {format(driver.hireDate, 'MMM dd, yyyy')}</span>
                </div>
              </div>

              {/* License Info */}
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">License</span>
                  <span className={`text-sm ${licenseWarning.color}`}>
                    Exp: {format(driver.licenseExpiry, 'MM/dd/yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{driver.licenseNumber}</span>
                  <span className="text-gray-600">{driver.licenseState} - Class {driver.licenseClass}</span>
                </div>
              </div>

              {/* Verification Status */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Background Check</p>
                  <p className={`text-sm font-medium ${getBackgroundCheckColor(driver.backgroundCheckStatus)}`}>
                    {driver.backgroundCheckStatus.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Mentor Status</p>
                  <p className={`text-sm font-medium ${getMentorStatusColor(driver.mentorStatus)}`}>
                    {driver.mentorStatus.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Performance Scores */}
              {driver.deliveryScore && (
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Delivery Score</span>
                      <span className="font-semibold text-gray-900">{driver.deliveryScore.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${driver.deliveryScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Safety Score</span>
                      <span className="font-semibold text-gray-900">{driver.safetyScore?.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${driver.safetyScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-4">
                {driver.totalDeliveries && (
                  <div className="flex items-center gap-1 text-sm">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">{driver.totalDeliveries.toLocaleString()}</span>
                    <span className="text-gray-500">deliveries</span>
                  </div>
                )}
                {driver.customerRating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-900">{driver.customerRating}</span>
                  </div>
                )}
              </div>

              {/* Training Badge */}
              {driver.amazonTrainingCompleted && (
                <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-800 font-medium">Amazon Training Certified</span>
                </div>
              )}

              {/* Alerts */}
              {driverAlerts.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <p className="text-xs text-red-800">
                    {driverAlerts.length} active alert{driverAlerts.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
