
import React, { useState } from 'react';
import { CVData } from '../../types';
import { suggestSkills } from '../../services/geminiService';
import { SparklesIcon } from '../icons/SparklesIcon';

interface SkillsFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ cvData, setCvData }) => {
  const MAX_SKILLS = 20;
  const [newSkill, setNewSkill] = useState('');
  const [suggesting, setSuggesting] = useState(false);
  const [error, setError] = useState('');

  const handleAddSkill = () => {
    if (newSkill && cvData.skills.length < MAX_SKILLS && !cvData.skills.find(s => s.toLowerCase() === newSkill.trim().toLowerCase())) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };
  
  const handleSuggestSkills = async () => {
    setSuggesting(true);
    setError('');
    const context = cvData.experience.map(e => e.jobTitle + ": " + e.responsibilities.join(' ')).join('\n');
    if (!context) {
        setError("Add some experience first for better suggestions.");
        setSuggesting(false);
        return;
    }
    try {
        const suggested = await suggestSkills(context);
        const currentSkillsLower = cvData.skills.map(s => s.toLowerCase());
        const uniqueNewSkills = suggested.filter(s => !currentSkillsLower.includes(s.toLowerCase()));
        
        const combinedSkills = [...cvData.skills, ...uniqueNewSkills];
        const finalSkills = combinedSkills.slice(0, MAX_SKILLS);

        setCvData(prev => ({...prev, skills: finalSkills}));

    } catch (e: any) {
        setError(e.message || "Could not suggest skills.");
    } finally {
        setSuggesting(false);
    }
  }

  const canAddMoreSkills = cvData.skills.length < MAX_SKILLS;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">List your key skills. You can add them manually or let our AI suggest some based on your experience.</p>

       <button
        onClick={handleSuggestSkills}
        disabled={suggesting || !canAddMoreSkills}
        className="mb-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        {suggesting ? (
        <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Suggesting...
        </>
        ) : (
        <>
            <SparklesIcon className="w-5 h-5" />
            Suggest Skills From Experience
        </>
        )}
       </button>
       {error && <p className="text-red-500 text-sm -mt-4 mb-4 text-center">{error}</p>}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          placeholder={canAddMoreSkills ? "e.g., Customer Service" : "Skill limit reached"}
          className="flex-grow block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow disabled:opacity-50"
          maxLength={30}
          disabled={!canAddMoreSkills}
        />
        <button
          onClick={handleAddSkill}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canAddMoreSkills || !newSkill}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {cvData.skills.map(skill => (
          <span key={skill} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
            {skill}
            <button onClick={() => handleRemoveSkill(skill)} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-bold text-md">
              &times;
            </button>
          </span>
        ))}
      </div>
      <p className="text-xs text-right text-gray-500 dark:text-gray-400 mt-2">
        {cvData.skills.length}/{MAX_SKILLS} skills
      </p>
    </div>
  );
};

export default SkillsForm;
