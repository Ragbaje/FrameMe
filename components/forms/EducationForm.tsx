
import React from 'react';
import { CVData } from '../../types';

interface EducationFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const CharacterCounter: React.FC<{ value: string; max: number }> = ({ value, max }) => {
    const len = value.length;
    const color = len >= max ? 'text-red-500' : len > max * 0.9 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400';
    return <div className={`text-xs text-right ${color}`}>{len}/{max}</div>
}

const EducationForm: React.FC<EducationFormProps> = ({ cvData, setCvData }) => {
  const MAX_ENTRIES = 3;

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newEducation = cvData.education.map((edu, i) => {
        if (i === index) {
            return { ...edu, [name]: value };
        }
        return edu;
    });
    setCvData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    if (cvData.education.length >= MAX_ENTRIES) return;
    setCvData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: '', degree: '', startDate: '', endDate: '', details: '' }
      ],
    }));
  };
  
  const removeEducation = (index: number) => {
    const newEducation = cvData.education.filter((_, i) => i !== index);
    setCvData(prev => ({ ...prev, education: newEducation }));
  };

  const inputStyle = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Education</h2>
       <p className="text-gray-500 dark:text-gray-400 mb-6">Tell us about your school, college, or university. Start with the most recent.</p>
      {cvData.education.map((edu, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4 relative">
            <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Entry #{index + 1}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
            <input type="text" name="institution" value={edu.institution} onChange={(e) => handleChange(index, e)} className={inputStyle} placeholder="e.g., University of Example" maxLength={50} />
            <CharacterCounter value={edu.institution} max={50} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Qualification / Degree</label>
            <input type="text" name="degree" value={edu.degree} onChange={(e) => handleChange(index, e)} className={inputStyle} placeholder="e.g., A-Levels or BSc Computer Science" maxLength={50} />
            <CharacterCounter value={edu.degree} max={50} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <input type="text" name="startDate" value={edu.startDate} onChange={(e) => handleChange(index, e)} className={inputStyle} placeholder="e.g., Sep 2021" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
              <input type="text" name="endDate" value={edu.endDate} onChange={(e) => handleChange(index, e)} className={inputStyle} placeholder="e.g., Present" />
            </div>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Details</label>
            <textarea name="details" value={edu.details} onChange={(e) => handleChange(index, e)} rows={2} className={inputStyle} placeholder="e.g., Relevant subjects or modules..." maxLength={120} />
            <CharacterCounter value={edu.details} max={120} />
          </div>
        </div>
      ))}
      <button 
        onClick={addEducation} 
        disabled={cvData.education.length >= MAX_ENTRIES}
        className="mt-2 w-full text-blue-600 font-semibold border-2 border-blue-200 dark:border-blue-800 dark:hover:bg-blue-900/50 rounded-lg py-2 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        + Add Another Education
      </button>
    </div>
  );
};

export default EducationForm;
