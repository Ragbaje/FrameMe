
import React from 'react';
import { CVData, Section } from '../types';
import PersonalDetailsForm from './forms/PersonalDetailsForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import ProfileForm from './forms/ProfileForm';
import { LogoIcon } from './icons/LogoIcon';

interface CVFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  currentSection: Section;
  setCurrentSection: React.Dispatch<React.SetStateAction<Section>>;
}

const ProgressBar: React.FC<{ currentSection: Section }> = ({ currentSection }) => {
  const sections = [Section.PersonalDetails, Section.Profile, Section.Education, Section.Experience, Section.Skills, Section.Final];
  const currentIndex = sections.indexOf(currentSection);

  return (
    <div className="w-full mb-8">
      <div className="flex gap-1">
        {sections.map((section, index) => (
          <div key={section} className="flex-1 h-1.5 rounded-full transition-all duration-300">
            <div className={`h-full rounded-full ${index <= currentIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData, currentSection, setCurrentSection }) => {
  const handleNext = () => {
    switch (currentSection) {
      case Section.Welcome:
        setCurrentSection(Section.PersonalDetails);
        break;
      case Section.PersonalDetails:
        setCurrentSection(Section.Profile);
        break;
      case Section.Profile:
        setCurrentSection(Section.Education);
        break;
      case Section.Education:
        setCurrentSection(Section.Experience);
        break;
      case Section.Experience:
        setCurrentSection(Section.Skills);
        break;
      case Section.Skills:
        setCurrentSection(Section.Final);
        break;
    }
  };

  const handleBack = () => {
    switch (currentSection) {
        case Section.PersonalDetails:
            setCurrentSection(Section.Welcome);
            break;
        case Section.Profile:
            setCurrentSection(Section.PersonalDetails);
            break;
        case Section.Education:
            setCurrentSection(Section.Profile);
            break;
        case Section.Experience:
            setCurrentSection(Section.Education);
            break;
        case Section.Skills:
            setCurrentSection(Section.Experience);
            break;
        case Section.Final:
            setCurrentSection(Section.Skills);
            break;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-black/30">
      {currentSection !== Section.Welcome && <ProgressBar currentSection={currentSection} />}
      
      {currentSection === Section.Welcome && (
        <div className="text-center flex flex-col items-center">
          <LogoIcon className="h-16 w-16 text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome to FrameMe</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">You've done more than you think. Let's frame your experiences into a CV that gets noticed.</p>
          <button onClick={handleNext} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
            Get Started
          </button>
        </div>
      )}

      {currentSection === Section.PersonalDetails && <PersonalDetailsForm cvData={cvData} setCvData={setCvData} />}
      {currentSection === Section.Profile && <ProfileForm cvData={cvData} setCvData={setCvData} />}
      {currentSection === Section.Education && <EducationForm cvData={cvData} setCvData={setCvData} />}
      {currentSection === Section.Experience && <ExperienceForm cvData={cvData} setCvData={setCvData} />}
      {currentSection === Section.Skills && <SkillsForm cvData={cvData} setCvData={setCvData} />}
      
      {currentSection === Section.Final && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">You're All Set!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Your CV is ready. You can download it as a PDF using the button in the header.</p>
        </div>
      )}

      {currentSection !== Section.Welcome && (
        <div className="mt-8 flex justify-between">
          <button onClick={handleBack} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
            Back
          </button>
          {currentSection !== Section.Final ? (
            <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Next
            </button>
          ) : (
             <button onClick={() => setCurrentSection(Section.Welcome)} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Start Over
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CVForm;
