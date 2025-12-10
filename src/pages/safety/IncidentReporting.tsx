import { useState } from 'react';
import { AlertTriangle, Plus, User, MapPin, Calendar, FileText, Image as ImageIcon } from 'lucide-react';
import type { Incident } from '../../types/safety';

export default function IncidentReporting() {
  const [selectedType, setSelectedType] = useState<'all' | 'accident' | 'complaint' | 'dog-incident' | 'hazard' | 'vehicle-damage'>('all');
  const [showReportModal, setShowReportModal] = useState(false);

  const incidents: Incident[] = [
    {
      id: 'INC001',
      type: 'accident',
      severity: 'medium',
      status: 'investigating',
      driverId: 'D042',
      driverName: 'Tom Jackson',
      date: '2025-12-10',
      time: '14:30',
      location: '123 Main St, Downtown',
      description: 'Minor fender bender while backing out of driveway. Contact with customer vehicle.',
      policeReportNumber: 'PR-2025-12345',
      photos: ['photo1.jpg', 'photo2.jpg'],
      actionsTaken: 'Police called, photos taken, insurance contacted',
      coachingRequired: true,
      reportedBy: 'Supervisor John',
      reportedAt: new Date().toISOString(),
    },
    {
      id: 'INC002',
      type: 'complaint',
      severity: 'low',
      status: 'coaching-required',
      driverId: 'D023',
      driverName: 'Sarah Williams',
      date: '2025-12-09',
      time: '11:15',
      location: '456 Oak Ave, Suburb',
      description: 'Customer complained about package left in rain. Driver did not follow delivery instructions.',
      actionsTaken: 'Customer refunded, coaching scheduled',
      coachingRequired: true,
      reportedBy: 'Customer Service',
      reportedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'INC003',
      type: 'dog-incident',
      severity: 'high',
      status: 'resolved',
      driverId: 'D015',
      driverName: 'Mike Thompson',
      date: '2025-12-08',
      time: '16:45',
      location: '789 Elm St, Residential',
      description: 'Dog bite incident. Customer dog was unleashed and attacked driver during delivery.',
      witnessStatement: 'Neighbor saw the incident and confirmed dog was unleashed',
      actionsTaken: 'First aid administered, medical attention sought, customer contacted',
      coachingRequired: false,
      reportedBy: 'Driver',
      reportedAt: new Date(Date.now() - 172800000).toISOString(),
      resolvedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const filteredIncidents = selectedType === 'all'
    ? incidents
    : incidents.filter(i => i.type === selectedType);

  const stats = {
    total: incidents.length,
    accident: incidents.filter(i => i.type === 'accident').length,
    complaint: incidents.filter(i => i.type === 'complaint').length,
    dogIncident: incidents.filter(i => i.type === 'dog-incident').length,
    hazard: incidents.filter(i => i.type === 'hazard').length,
    vehicleDamage: incidents.filter(i => i.type === 'vehicle-damage').length,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-gray-100 text-gray-700';
      case 'investigating': return 'bg-blue-100 text-blue-700';
      case 'coaching-required': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incident Reporting</h1>
          <p className="text-sm text-gray-600 mt-1">Report and track accidents, complaints, and incidents</p>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Report Incident
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <button
          onClick={() => setSelectedType('all')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedType === 'all' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">All Incidents</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </button>
        <button
          onClick={() => setSelectedType('accident')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedType === 'accident' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Accidents</div>
          <div className="text-2xl font-bold text-red-700">{stats.accident}</div>
        </button>
        <button
          onClick={() => setSelectedType('complaint')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedType === 'complaint' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Complaints</div>
          <div className="text-2xl font-bold text-orange-700">{stats.complaint}</div>
        </button>
        <button
          onClick={() => setSelectedType('dog-incident')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedType === 'dog-incident' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Dog Incidents</div>
          <div className="text-2xl font-bold text-purple-700">{stats.dogIncident}</div>
        </button>
        <button
          onClick={() => setSelectedType('hazard')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedType === 'hazard' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Hazards</div>
          <div className="text-2xl font-bold text-yellow-700">{stats.hazard}</div>
        </button>
        <button
          onClick={() => setSelectedType('vehicle-damage')}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedType === 'vehicle-damage' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-sm text-gray-600 mb-1">Vehicle Damage</div>
          <div className="text-2xl font-bold text-indigo-700">{stats.vehicleDamage}</div>
        </button>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getSeverityColor(incident.severity)} border`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {incident.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {incident.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.severity.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                    {incident.status.replace('-', ' ')}
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
                    <div className="text-sm font-medium text-gray-900">{incident.driverName}</div>
                    <div className="text-xs text-gray-500">{incident.driverId}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Date & Time</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(incident.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">{incident.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="text-sm font-medium text-gray-900">{incident.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Reported By</div>
                    <div className="text-sm font-medium text-gray-900">{incident.reportedBy}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(incident.reportedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Description</div>
                  <p className="text-sm text-gray-900">{incident.description}</p>
                </div>

                {incident.witnessStatement && (
                  <div>
                    <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Witness Statement</div>
                    <p className="text-sm text-gray-900">{incident.witnessStatement}</p>
                  </div>
                )}

                <div>
                  <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Actions Taken</div>
                  <p className="text-sm text-gray-900">{incident.actionsTaken}</p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  {incident.policeReportNumber && (
                    <div className="text-sm">
                      <span className="text-gray-600">Police Report:</span>{' '}
                      <span className="font-medium text-gray-900">{incident.policeReportNumber}</span>
                    </div>
                  )}
                  {incident.photos && incident.photos.length > 0 && (
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                      <ImageIcon className="w-4 h-4" />
                      {incident.photos.length} photo(s)
                    </div>
                  )}
                  {incident.coachingRequired && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                      Coaching Required
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  Update Status
                </button>
                {incident.coachingRequired && (
                  <button className="px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-50 rounded-lg">
                    Schedule Coaching
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Incident Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Report New Incident</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select type...</option>
                    <option value="accident">Accident</option>
                    <option value="complaint">Customer Complaint</option>
                    <option value="dog-incident">Dog Incident</option>
                    <option value="hazard">Hazard</option>
                    <option value="vehicle-damage">Vehicle Damage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select severity...</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter location address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Detailed description of the incident..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Actions Taken *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="What immediate actions were taken..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Police Report Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="PR-YYYY-XXXXX (if applicable)"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Coaching required for this incident</span>
                </label>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
