import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageTemplateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children?: ReactNode;
}

export default function PageTemplate({ title, description, icon: Icon, children }: PageTemplateProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      {children || (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">
              This module is ready for implementation. Connect your data sources to populate this page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
