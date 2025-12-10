import { useState } from 'react';
import { GraduationCap, Plus, User, Calendar, FileText, CheckCircle2, Clock, Upload } from 'lucide-react';
import type { SafetyCoaching } from '../../types/safety';

export default function SafetyCoaching() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'scheduled' | 'completed' | 'follow-up-needed'>('all');
  const [showCoachingModal, setShowCoachingModal] = useState(false);

  const coachingSessions: SafetyCoaching[] = [
    {
      id: 'COACH001',
      driverId: 'D042',
      driverName: 'Tom Jackson',
      incidentId: 'INC001',
      coachingType: 'corrective',
      date: '2025-12-11',
      topic: 'Backing Safety and Awareness',
      description: 'Coaching session regarding recent backing incident. Review proper backing procedures.',
      actionPlan: '1. Review backing safety video\n2. Practice backing maneuvers in parking lot\n3. Daily backing checklist for next 2 weeks',
      followUpDate: '2025-12-25',
      documentUrls: ['backing-safety-guide.pdf'],
      driverSignature: 'signed',
      coachSignature: 'Supervisor John',
      coachName: 'John Smith',
      status: 'scheduled',
    },
    {
      id: 'COACH002',
      driverId: 'D023',
      driverName: 'Sarah Williams',
      coachingType: 'corrective',
      date: '2025-12-10',
      topic: 'Customer Service and Delivery Instructions',
      description: 'Address customer complaint about delivery not following instructions.',
      actionPlan: '1. Review customer delivery preferences\n2. Practice reading and following delivery notes\n3. Supervisor ride-along next week',
      followUpDate: '2025-12-17',
      documentUrls: ['customer-service-standards.pdf'],
      driverSignature: 'signed',
      coachSignature: 'Supervisor Mary',
      coachName: 'Mary Johnson',
      status: 'completed',
    },
    {
      id: 'COACH003',
      driverId: 'D015',
      driverName: 'Mike Thompson',
      coachingType: 'positive',
      date: '2025-12-09',
      topic: 'Excellence in Customer Service',
      description: 'Recognition for consistently high customer ratings and zero complaints.',
      actionPlan: 'Continue excellent work. Share best practices with team during next safety meeting.',
      documentUrls: [],
      driverSignature: 'signed',
      coachSignature: 'Supervisor John',
      coachName: 'John Smith',
      status: 'completed',
    },
    {
      id: 'COACH004',
      driverId: 'D008',
      driverName: 'Emma Davis',
      coachingType: 'preventive',
      date: '2025-12-08',
      topic: 'Winter Driving Safety',
      description: 'Proactive coaching on winter weather driving techniques.',
      actionPlan: '1. Review winter driving manual\n2. Practice on wet/slippery surfaces\n3. Check tire tread weekly',
      followUpDate: '2025-12-22',
      documentUrls: ['winter-driving-guide.pdf'],
      driverSignature: 'signed',
      coachSignature: 'Supervisor Mary',
      coachName: 'Mary Johnson',
      status: 'follow-up-needed',
    },
  ];

  const filteredSessions = selectedStatus === 'all'
    ? coachingSessions
    : coachingSessions.filter(s => s.status === selectedStatus);

  const stats = {
    total: coachingSessions.length,
    scheduled: coachingSessions.filter(s => s.status === 'scheduled').length,
    completed: coachingSessions.filter(s => s.status === 'completed').length,
    followUpNeeded: coachingSessions.filter(s => s.status === 'follow-up-needed').length,
    thisMonth: coachingSessions.length,
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'corrective': return 'bg-red-100 text-red-700';
      case 'preventive': return 'bg-blue-100 text-blue-700';
      case 'positive': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'follow-up-needed': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Safety Coaching</h1>
          <p className="text-sm text-gray-600 mt-1">Track and document safety coaching sessions</p>
        </div>
        <button
          onClick={() => setShowCoachingModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Coaching Session
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedStatus === 'all' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Total Sessions</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </button>
        <button
          onClick={() => setSelectedStatus('scheduled')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedStatus === 'scheduled' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Scheduled</div>
          <div className="text-2xl font-bold text-yellow-700">{stats.scheduled}</div>
        </button>
        <button
          onClick={() => setSelectedStatus('completed')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedStatus === 'completed' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-700">{stats.completed}</div>
        </button>
        <button
          onClick={() => setSelectedStatus('follow-up-needed')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedStatus === 'follow-up-needed' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Follow-Up Needed</div>
          <div className="text-2xl font-bold text-orange-700">{stats.followUpNeeded}</div>
        </button>
        <div className="p-4 rounded-lg border-2 border-gray-200 bg-white">
          <div className="text-sm text-gray-600 mb-1">This Month</div>
          <div className="text-2xl font-bold text-gray-900">{stats.thisMonth}</div>
        </div>
      </div>

      {/* Coaching Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(session.coachingType)}`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{session.topic}</h3>
                    <p className="text-sm text-gray-500">ID: {session.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(session.coachingType)}`}>
                    {session.coachingType.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Driver</div>
                    <div className="text-sm font-medium text-gray-900">{session.driverName}</div>
                    <div className="text-xs text-gray-500">{session.driverId}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Coaching Date</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Coach</div>
                    <div className="text-sm font-medium text-gray-900">{session.coachName}</div>
                  </div>
                </div>

                {session.followUpDate && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Follow-Up Date</div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(session.followUpDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Description</div>
                  <p className="text-sm text-gray-900">{session.description}</p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Action Plan</div>
                  <p className="text-sm text-gray-900 whitespace-pre-line">{session.actionPlan}</p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  {session.incidentId && (
                    <div className="text-sm">
                      <span className="text-gray-600">Related Incident:</span>{' '}
                      <span className="font-medium text-blue-600">{session.incidentId}</span>
                    </div>
                  )}
                  {session.documentUrls.length > 0 && (
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                      <FileText className="w-4 h-4" />
                      {session.documentUrls.length} document(s)
                    </div>
                  )}
                  {session.driverSignature && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      Driver Signed
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                  View Details
                </button>
                {session.status === 'scheduled' && (
                  <button className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg">
                    Mark Complete
                  </button>
                )}
                {session.status === 'follow-up-needed' && (
                  <button className="px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50 rounded-lg">
                    Schedule Follow-Up
                  </button>
                )}
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Coaching Session Modal */}
      {showCoachingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">New Coaching Session</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coaching Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select type...</option>
                    <option value="corrective">Corrective</option>
                    <option value="preventive">Preventive</option>
                    <option value="positive">Positive Recognition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select driver...</option>
                    <option value="D042">Tom Jackson (D042)</option>
                    <option value="D023">Sarah Williams (D023)</option>
                    <option value="D015">Mike Thompson (D015)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Incident (Optional)</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">No related incident</option>
                  <option value="INC001">INC001 - Backing Incident</option>
                  <option value="INC002">INC002 - Customer Complaint</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coaching Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-Up Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Backing Safety and Awareness"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe the coaching session..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Plan *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="List action items (one per line)..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, or images up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowCoachingModal(false)}
                className="px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                Create Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
