
import React from 'react';
import { Template } from '../types';
import { TemplateThumbnail } from './TemplateThumbnail';

interface TemplateSelectorProps {
  currentTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-black/30">
        <h3 className="text-lg font-bold mb-3 text-center">Choose Your Template</h3>
        <div className="grid grid-cols-2 gap-4">
            {/* Modern Template */}
            <button
                onClick={() => onSelectTemplate(Template.Modern)}
                className={`p-2 border-2 rounded-lg transition-all ${currentTemplate === Template.Modern ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'}`}
            >
                <TemplateThumbnail template={Template.Modern} />
                <p className="text-sm font-semibold mt-2">Modern</p>
            </button>
            {/* Creative Template */}
            <button
                onClick={() => onSelectTemplate(Template.Creative)}
                className={`p-2 border-2 rounded-lg transition-all ${currentTemplate === Template.Creative ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'}`}
            >
                <TemplateThumbnail template={Template.Creative} />
                <p className="text-sm font-semibold mt-2">Creative</p>
            </button>
        </div>
    </div>
  );
};

export default TemplateSelector;
