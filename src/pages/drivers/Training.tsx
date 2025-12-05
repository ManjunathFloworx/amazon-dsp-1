import { useState } from 'react';
import { Search, BookOpen, CheckCircle, Clock, XCircle, Award, Calendar, User } from 'lucide-react';
import { mockDrivers, mockDriverTraining, mockSafetyCoaching } from '../../data/mockData';
import { format } from 'date-fns';
import type { DriverTraining, SafetyCoaching } from '../../types/driver';

export default function Training() {
  const [training] = useState<DriverTraining[]>(mockDriverTraining);
  const [coaching] = useState<SafetyCoaching[]>(mockSafetyCoaching);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'training' | 'coaching'>('training');

  const filteredTraining = training.filter((t) => {
    const driver = mockDrivers.find(d => d.id === t.driverId);
    const driverName = driver ? `${driver.firstName} ${driver.lastName}` : '';

    const matchesSearch =
      t.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driverName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredCoaching = coaching.filter((c) => {
    const driver = mockDrivers.find(d => d.id === c.driverId);
    const driverName = driver ? `${driver.firstName} ${driver.lastName}` : '';

    const matchesSearch =
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driverName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatusIcon = (status: DriverTraining['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'not_started':
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DriverTraining['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'not_started':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCoachingTypeColor = (type: SafetyCoaching['type']) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'corrective':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'follow_up':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const stats = [
    {
      label: 'Total Courses',
      value: training.length,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Completed',
      value: training.filter((t) => t.status === 'completed').length,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'In Progress',
      value: training.filter((t) => t.status === 'in_progress').length,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Coaching Sessions',
      value: coaching.length,
      color: 'bg-purple-50 text-purple-600',
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

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-1">
            <button
              onClick={() => setActiveTab('training')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'training'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4 inline-block mr-2" />
              Training Courses
            </button>
            <button
              onClick={() => setActiveTab('coaching')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'coaching'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Award className="w-4 h-4 inline-block mr-2" />
              Safety Coaching
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'training' ? 'Search courses or drivers...' : 'Search coaching records...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {activeTab === 'training' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="not_started">Not Started</option>
                <option value="failed">Failed</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'training' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTraining.map((item) => {
                const driver = mockDrivers.find(d => d.id === item.driverId);

                return (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.courseName}</h3>
                          {driver && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {driver.firstName} {driver.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      {getStatusIcon(item.status)}
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 mb-4">
                      {item.startDate && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Started:
                          </span>
                          <span className="text-gray-900">{format(item.startDate, 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                      {item.completionDate && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Completed:
                          </span>
                          <span className="text-gray-900">{format(item.completionDate, 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                    </div>

                    {/* Score */}
                    {item.score !== undefined && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Score</span>
                          <span className="text-lg font-bold text-gray-900">{item.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.score >= 90 ? 'bg-green-500' : item.score >= 70 ? 'bg-blue-500' : 'bg-red-500'}`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Certificate */}
                    {item.certificateUrl && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                        <Award className="w-4 h-4" />
                        <span>Certificate Available</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCoaching.map((item) => {
                const driver = mockDrivers.find(d => d.id === item.driverId);

                return (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          item.type === 'positive' ? 'bg-green-50' :
                          item.type === 'corrective' ? 'bg-red-50' : 'bg-blue-50'
                        }`}>
                          <Award className={`w-5 h-5 ${
                            item.type === 'positive' ? 'text-green-600' :
                            item.type === 'corrective' ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          {driver && (
                            <h3 className="text-base font-semibold text-gray-900">
                              {driver.firstName} {driver.lastName}
                            </h3>
                          )}
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border whitespace-nowrap ${getCoachingTypeColor(item.type)}`}>
                        {item.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {item.category.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Action Taken</p>
                        <p className="text-sm text-gray-900">{item.actionTaken}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Coach By</p>
                        <p className="text-sm text-gray-900">{item.coachBy}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        {format(item.date, 'MMM dd, yyyy')}
                      </span>
                      {item.followUpDate && !item.resolved && (
                        <span className="text-xs text-yellow-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Follow-up: {format(item.followUpDate, 'MMM dd, yyyy')}
                        </span>
                      )}
                      {item.resolved && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {((activeTab === 'training' && filteredTraining.length === 0) ||
            (activeTab === 'coaching' && filteredCoaching.length === 0)) && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No records found</h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
