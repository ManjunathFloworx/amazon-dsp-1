import { useState } from 'react';
import { Search, Upload, FileText, CheckCircle, XCircle, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { mockDrivers, mockDriverDocuments } from '../../data/mockData';
import { format, differenceInDays } from 'date-fns';
import type { DriverDocument } from '../../types/driver';

export default function Documents() {
  const [documents] = useState<DriverDocument[]>(mockDriverDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredDocuments = documents.filter((doc) => {
    const driver = mockDrivers.find(d => d.id === doc.driverId);
    const driverName = driver ? `${driver.firstName} ${driver.lastName}` : '';

    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driverName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || doc.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const getStatusIcon = (status: DriverDocument['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'expiring_soon':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: DriverDocument['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring_soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getDocTypeIcon = () => {
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const getExpiryInfo = (expiryDate?: Date) => {
    if (!expiryDate) return { text: 'No expiry', color: 'text-gray-600' };
    const days = differenceInDays(expiryDate, new Date());
    if (days < 0) return { text: `Expired ${Math.abs(days)} days ago`, color: 'text-red-600' };
    if (days < 30) return { text: `Expires in ${days} days`, color: 'text-red-600' };
    if (days < 60) return { text: `Expires in ${days} days`, color: 'text-yellow-600' };
    return { text: `Expires in ${days} days`, color: 'text-gray-600' };
  };

  const stats = [
    {
      label: 'Total Documents',
      value: documents.length,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Valid',
      value: documents.filter((d) => d.status === 'valid').length,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Expiring Soon',
      value: documents.filter((d) => d.status === 'expiring_soon').length,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Expired',
      value: documents.filter((d) => d.status === 'expired').length,
      color: 'bg-red-50 text-red-600',
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
              placeholder="Search documents or drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="license">License</option>
            <option value="id">ID</option>
            <option value="insurance">Insurance</option>
            <option value="tax_form">Tax Form</option>
            <option value="background_check">Background Check</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => {
          const driver = mockDrivers.find(d => d.id === document.driverId);
          const expiryInfo = getExpiryInfo(document.expiryDate);

          return (
            <div
              key={document.id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getDocTypeIcon()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{document.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {document.type.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                </div>
                {getStatusIcon(document.status)}
              </div>

              {/* Driver Info */}
              {driver && (
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <p className="text-xs text-gray-500 mb-1">Driver</p>
                  <p className="text-sm font-medium text-gray-900">
                    {driver.firstName} {driver.lastName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">ID: {driver.employeeId}</p>
                </div>
              )}

              {/* Document Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Uploaded:
                  </span>
                  <span className="text-gray-900">{format(document.uploadDate, 'MMM dd, yyyy')}</span>
                </div>
                {document.expiryDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Expiry:
                    </span>
                    <span className={expiryInfo.color}>
                      {format(document.expiryDate, 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(document.status)}`}>
                  {document.status.replace('_', ' ').toUpperCase()}
                </span>
                {document.verified ? (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-yellow-600">
                    <Clock className="w-3 h-3" />
                    Pending
                  </span>
                )}
              </div>

              {/* Expiry Warning */}
              {document.expiryDate && (
                <div className={`p-3 rounded-lg border ${
                  document.status === 'expired' ? 'bg-red-50 border-red-200' :
                  document.status === 'expiring_soon' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-xs ${expiryInfo.color}`}>
                    {expiryInfo.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
