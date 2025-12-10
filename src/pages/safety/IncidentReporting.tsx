import { AlertTriangle } from 'lucide-react';
import PageTemplate from '../../components/PageTemplate';

export default function IncidentReporting() {
  return (
    <PageTemplate
      title="Incident Reporting"
      description="Report and track accidents, complaints, and incidents"
      icon={AlertTriangle}
    />
  );
}
