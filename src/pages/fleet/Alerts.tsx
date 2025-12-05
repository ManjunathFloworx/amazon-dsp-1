import { useState } from 'react';
import { mockAlerts, mockVehicles } from '../../data/mockData';
import type { Alert } from '../../types/fleet';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filterSeverity, setFilterSeverity] = useState<'all' | Alert['severity']>('all');
  const [filterType, setFilterType] = useState<'all' | Alert['type']>('all');
  const [showResolved, setShowResolved] = useState(false);

  const getVehicleName = (vehicleId: string) => {
    const vehicle = mockVehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.model} (${vehicle.plate})` : 'Unknown Vehicle';
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'medium':
        return <Bell className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'safety':
        return 'text-red-600';
      case 'maintenance':
        return 'text-orange-600';
      case 'registration':
        return 'text-blue-600';
      case 'insurance':
        return 'text-purple-600';
      case 'inspection':
        return 'text-yellow-600';
    }
  };

  const handleResolve = (alertId: string) => {
    setAlerts(alerts.map((alert) =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (!showResolved && alert.resolved) return false;
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterType !== 'all' && alert.type !== filterType) return false;
    return true;
  });

  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' && !a.resolved).length;
  const highAlerts = alerts.filter((a) => a.severity === 'high' && !a.resolved).length;
  const unresolvedAlerts = alerts.filter((a) => !a.resolved).length;

  const stats = [
    {
      label: 'Critical Alerts',
      value: criticalAlerts,
      color: 'bg-red-50 text-red-600',
      icon: AlertCircle,
    },
    {
      label: 'High Priority',
      value: highAlerts,
      color: 'bg-orange-50 text-orange-600',
      icon: AlertTriangle,
    },
    {
      label: 'Total Unresolved',
      value: unresolvedAlerts,
      color: 'bg-blue-50 text-blue-600',
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
        <p className="text-gray-600">Monitor and manage fleet alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="space-y-4">
          {/* Severity Filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Severity</p>
            <div className="flex flex-wrap gap-2">
              {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
                <button
                  key={severity}
                  onClick={() => setFilterSeverity(severity as typeof filterSeverity)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filterSeverity === severity
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Type</p>
            <div className="flex flex-wrap gap-2">
              {['all', 'safety', 'maintenance', 'registration', 'insurance', 'inspection'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as typeof filterType)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filterType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Show Resolved Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showResolved"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="showResolved" className="text-sm text-gray-700">
              Show resolved alerts
            </label>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-lg border-2 p-6 transition-all ${
              alert.resolved
                ? 'border-gray-200 opacity-60'
                : getSeverityColor(alert.severity).replace('bg-', 'border-').replace('-100', '-300')
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                alert.resolved ? 'bg-gray-100' : getSeverityColor(alert.severity)
              }`}>
                {alert.resolved ? (
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                ) : (
                  getSeverityIcon(alert.severity)
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {alert.type.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Alert
                      </h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 ${
                        alert.resolved ? 'bg-gray-100 text-gray-800 border-gray-300' : getSeverityColor(alert.severity)
                      }`}>
                        {alert.resolved ? 'RESOLVED' : alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{getVehicleName(alert.vehicleId)}</p>
                  </div>
                </div>

                <p className="text-gray-900 mb-3">{alert.message}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className={`font-medium ${getTypeColor(alert.type)}`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span>
                      {format(alert.date, 'MMM dd, yyyy h:mm a')}
                    </span>
                  </div>

                  {!alert.resolved && (
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No alerts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
