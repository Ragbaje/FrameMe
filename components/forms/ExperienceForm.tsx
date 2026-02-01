
import React, { useState } from 'react';
import { CVData } from '../../types';
import { rewriteWithAI } from '../../services/geminiService';
import { SparklesIcon } from '../icons/SparklesIcon';

interface ExperienceFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const CharacterCounter: React.FC<{ value: string; max: number }> = ({ value, max }) => {
    const len = value.length;
    const color = len >= max ? 'text-red-500' : len > max * 0.9 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400';
    return <div className={`text-xs text-right ${color}`}>{len}/{max}</div>
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ cvData, setCvData }) => {
  const MAX_ENTRIES = 3;
  const [rewritingIndex, setRewritingIndex] = useState<number | null>(null);
  const [errorMessages, setErrorMessages] = useState<(string | null)[]>([]);

  const [rawNotes, setRawNotes] = useState<string[]>(
    cvData.experience.map(exp => exp.responsibilities.join('\n'))
  );

  const handleRawNotesChange = (index: number, value: string) => {
    const newRawNotes = [...rawNotes];
    newRawNotes[index] = value;
    setRawNotes(newRawNotes);
  };

  const handleRewrite = async (index: number) => {
    if (!rawNotes[index]) return;
    setRewritingIndex(index);
    const newErrors = [...errorMessages];
    newErrors[index] = null;
    setErrorMessages(newErrors);

    try {
      const rewrittenBulletPoints = await rewriteWithAI(rawNotes[index]);
      const newExperience = cvData.experience.map((exp, i) => {
        if (i === index) {
            return { ...exp, responsibilities: rewrittenBulletPoints };
        }
        return exp;
      });
      setCvData(prev => ({ ...prev, experience: newExperience }));
    } catch (error: any) {
       const newErrors = [...errorMessages];
       newErrors[index] = error.message || "An unknown error occurred.";
       setErrorMessages(newErrors);
    } finally {
      setRewritingIndex(null);
    }
  };


  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = cvData.experience.map((exp, i) => {
        if (i === index) {
            return { ...exp, [name]: value };
        }
        return exp;
    });
    setCvData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    if (cvData.experience.length >= MAX_ENTRIES) return;
    setCvData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: '', jobTitle: '', startDate: '', endDate: '', responsibilities: [] }
      ],
    }));
    setRawNotes(prev => [...prev, '']);
  };

  const removeExperience = (index: number) => {
    const newExperience = cvData.experience.filter((_, i) => i !== index);
    setCvData(prev => ({ ...prev, experience: newExperience }));
    setRawNotes(prev => prev.filter((_, i) => i !== index));
  };

  const inputStyle = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">List any jobs, volunteering, or work experience. Even small roles count!</p>
      {cvData.experience.map((exp, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4 relative">
          <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Role #{index + 1}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company / Organisation</label>
            <input type="text" name="company" value={exp.company} onChange={(e) => handleChange(index, e)} className={inputStyle} maxLength={50} />
            <CharacterCounter value={exp.company} max={50} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
            <input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleChange(index, e)} className={inputStyle} maxLength={50} />
            <CharacterCounter value={exp.jobTitle} max={50} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleChange(index, e)} className={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
              <input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleChange(index, e)} className={inputStyle} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your day-to-day tasks (in rough notes)
            </label>
            <textarea
              value={rawNotes[index]}
              onChange={(e) => handleRawNotesChange(index, e.target.value)}
              rows={4}
              className={inputStyle}
              placeholder="e.g., worked the cash register, helped customers, restocked shelves, cleaned up..."
              maxLength={300}
            />
            <CharacterCounter value={rawNotes[index]} max={300} />
            <button
              onClick={() => handleRewrite(index)}
              disabled={rewritingIndex === index || !rawNotes[index]}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {rewritingIndex === index ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Rewriting...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  AI Rewrite
                </>
              )}
            </button>
            {errorMessages[index] && <p className="text-red-500 text-sm mt-1 text-center">{errorMessages[index]}</p>}
          </div>
        </div>
      ))}
      <button 
        onClick={addExperience} 
        disabled={cvData.experience.length >= MAX_ENTRIES}
        className="mt-2 w-full text-blue-600 font-semibold border-2 border-blue-200 dark:border-blue-800 dark:hover:bg-blue-900/50 rounded-lg py-2 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        + Add Another Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
