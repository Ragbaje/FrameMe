
import React from 'react';
import { CVData } from '../../types';

interface PersonalDetailsFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const CharacterCounter: React.FC<{ value: string; max: number }> = ({ value, max }) => {
    const len = value.length;
    const color = len >= max ? 'text-red-500' : len > max * 0.9 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400';
    return <div className={`text-xs text-right ${color}`}>{len}/{max}</div>
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ cvData, setCvData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [name]: value,
      },
    }));
  };
  
  const inputStyle = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Let's start with the basics. This information will go at the top of your CV.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={cvData.personalDetails.fullName}
            onChange={handleChange}
            className={inputStyle}
            placeholder="e.g., Jane Doe"
            maxLength={50}
          />
          <CharacterCounter value={cvData.personalDetails.fullName} max={50} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={cvData.personalDetails.email}
            onChange={handleChange}
            className={inputStyle}
            placeholder="e.g., jane.doe@email.com"
            maxLength={50}
          />
          <CharacterCounter value={cvData.personalDetails.email} max={50} />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={cvData.personalDetails.phoneNumber}
            onChange={handleChange}
            className={inputStyle}
            maxLength={20}
          />
           <CharacterCounter value={cvData.personalDetails.phoneNumber} max={20} />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
          <input
            type="text"
            name="address"
            id="address"
            value={cvData.personalDetails.address}
            onChange={handleChange}
            className={inputStyle}
            placeholder="e.g., London, UK"
            maxLength={60}
          />
          <CharacterCounter value={cvData.personalDetails.address} max={60} />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
