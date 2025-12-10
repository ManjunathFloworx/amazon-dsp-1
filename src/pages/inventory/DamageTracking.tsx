import { AlertCircle } from 'lucide-react';
import PageTemplate from '../../components/PageTemplate';

export default function DamageTracking() {
  return (
    <PageTemplate
      title="Damage & Loss Tracking"
      description="Track damaged devices and equipment with deductions"
      icon={AlertCircle}
    />
  );
}
