
import React from 'react';
import { Template } from '../types';

interface TemplateThumbnailProps {
  template: Template;
}

const ModernThumbnail = () => (
    <div className="w-full aspect-[210/297] bg-gray-100 dark:bg-gray-700 rounded-md p-2 flex gap-2">
        <div className="w-1/3 space-y-2">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
            <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
            <div className="h-1.5 w-full bg-blue-300 dark:bg-blue-600 rounded-sm mt-4"></div>
            <div className="h-6 w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
            <div className="h-1.5 w-full bg-blue-300 dark:bg-blue-600 rounded-sm mt-4"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
        </div>
        <div className="w-2/3 space-y-2">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
            <div className="h-1.5 w-full bg-blue-300 dark:bg-blue-600 rounded-sm mt-4"></div>
            <div className="h-8 w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
            <div className="h-8 w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
        </div>
    </div>
);

const CreativeThumbnail = () => (
    <div className="w-full aspect-[210/297] bg-gray-100 dark:bg-gray-700 rounded-md p-2 flex flex-col gap-2">
        <div className="h-6 w-full bg-blue-200 dark:bg-blue-800 rounded-sm flex items-center justify-center flex-col gap-1">
            <div className="h-2 w-3/4 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
            <div className="h-1 w-1/2 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
        </div>
        <div className="h-1.5 w-1/4 bg-blue-300 dark:bg-blue-600 rounded-sm self-center mt-2"></div>
        <div className="h-8 w-full bg-gray-300 dark:bg-gray-500 rounded-sm mt-1"></div>
        <div className="grid grid-cols-2 gap-2 mt-2 flex-grow">
            <div className="h-full w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
            <div className="h-full w-full bg-gray-300 dark:bg-gray-500 rounded-sm"></div>
        </div>
    </div>
);


export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({ template }) => {
  if (template === Template.Creative) {
    return <CreativeThumbnail />;
  }
  return <ModernThumbnail />;
};
