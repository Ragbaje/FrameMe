
import React, { useState } from 'react';
import { CVData } from '../../types';
import { rewriteProfile } from '../../services/geminiService';
import { SparklesIcon } from '../icons/SparklesIcon';

interface ProfileFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const CharacterCounter: React.FC<{ value: string; max: number }> = ({ value, max }) => {
    const len = value.length;
    const color = len >= max ? 'text-red-500' : len > max * 0.9 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400';
    return <div className={`text-xs text-right ${color}`}>{len}/{max}</div>
}

const ProfileForm: React.FC<ProfileFormProps> = ({ cvData, setCvData }) => {
    const [isRewriting, setIsRewriting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCvData(prev => ({ ...prev, profile: e.target.value }));
    };

    const handleRewrite = async () => {
        if (!cvData.profile) return;
        setIsRewriting(true);
        setError(null);
        try {
            const rewrittenProfile = await rewriteProfile(cvData.profile);
            setCvData(prev => ({ ...prev, profile: rewrittenProfile }));
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsRewriting(false);
        }
    };

    const inputStyle = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow";

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Profile Summary</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Write a short summary about yourself. Think about your goals and what makes you a great candidate.</p>
            
            <div className="space-y-2">
                <textarea
                    name="profile"
                    rows={6}
                    value={cvData.profile}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="e.g., An enthusiastic and hardworking student looking for a weekend job in retail..."
                    maxLength={400}
                />
                 <CharacterCounter value={cvData.profile} max={400} />

                <button
                    onClick={handleRewrite}
                    disabled={isRewriting || !cvData.profile}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRewriting ? (
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
                            AI Rewrite Summary
                        </>
                    )}
                </button>
                {error && <p className="text-red-500 text-sm mt-1 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ProfileForm;
