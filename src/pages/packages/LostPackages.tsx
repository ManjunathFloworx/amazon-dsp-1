import { Search } from 'lucide-react';
import PageTemplate from '../../components/PageTemplate';

export default function LostPackages() {
  return (
    <PageTemplate
      title="Lost Package Investigation"
      description="Investigate and resolve lost package cases"
      icon={Search}
    />
  );
}
