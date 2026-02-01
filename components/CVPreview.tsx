
import React, { forwardRef } from 'react';
import { CVData, Template } from '../types';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationIcon } from './icons/LocationIcon';

interface CVPreviewProps {
  data: CVData;
  template: Template;
}

const ModernTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personalDetails, profile, education, experience, skills } = data;
  return (
    <div className="bg-white dark:bg-gray-800 p-8 lg:p-10 text-[9pt] leading-normal font-['Lora',_serif] flex gap-8">
      {/* Left Column */}
      <div className="w-1/3 text-gray-700 dark:text-gray-300 flex flex-col">
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{personalDetails.fullName}</h1>
            <div className="mt-6 space-y-4 text-xs font-sans">
            <div className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="break-all dark:text-gray-300">{personalDetails.email}</span>
            </div>
            <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="dark:text-gray-300">{personalDetails.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
                <LocationIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="dark:text-gray-300">{personalDetails.address}</span>
            </div>
            </div>
        </div>
        
        <div className="mt-8 space-y-8">
            {skills.length > 0 && (
            <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-1 mb-3 font-sans">Skills</h2>
                <div className="flex flex-wrap gap-2 font-sans mt-3">
                {skills.map((skill) => (
                    <span key={skill} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {skill}
                    </span>
                ))}
                </div>
            </section>
            )}

            {education.length > 0 && (
            <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-1 mb-3 font-sans">Education</h2>
                {education.map((edu, index) => (
                <div key={index} className="mt-3">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{edu.institution}</h3>
                    <h4 className="italic text-gray-600 dark:text-gray-400 text-xs mb-1">{edu.degree}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-sans">{edu.startDate} - {edu.endDate}</p>
                    {edu.details && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{edu.details}</p>}
                </div>
                ))}
            </section>
            )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 border-l border-gray-200 dark:border-gray-700 pl-8">
         {profile && (
             <section className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 italic">{profile}</p>
             </section>
         )}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-1 mb-4 font-sans">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">{exp.jobTitle}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500 font-sans">{exp.startDate} - {exp.endDate}</p>
                </div>
                <h4 className="italic text-gray-600 dark:text-gray-400 mb-1">{exp.company}</h4>
                <ul className="list-disc list-outside pl-5 text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="pl-1">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
};


const CreativeTemplate: React.FC<{ data: CVData }> = ({ data }) => {
    const { personalDetails, profile, education, experience, skills } = data;
    return (
      <div className="bg-white dark:bg-gray-800 p-8 lg:p-10 text-[9.5pt] leading-normal font-['Lora',_serif]">
        {/* Header */}
        <header className="text-center pb-6 mb-8 border-b-2 border-blue-100 dark:border-gray-700">
            <h1 className="text-4xl font-bold tracking-wider text-gray-800 dark:text-gray-100">{personalDetails.fullName}</h1>
            <div className="flex justify-center items-center gap-x-6 gap-y-1 text-gray-600 dark:text-gray-400 mt-4 text-xs flex-wrap font-sans">
              <span>{personalDetails.email}</span>
              <span className="text-blue-200 dark:text-blue-800">&#9679;</span>
              <span>{personalDetails.phoneNumber}</span>
               <span className="text-blue-200 dark:text-blue-800">&#9679;</span>
              <span>{personalDetails.address}</span>
            </div>
        </header>
        
        <main>
            {profile && (
                <section className="mb-6 text-center">
                    <p className="text-gray-700 dark:text-gray-300 italic max-w-2xl mx-auto">{profile}</p>
                </section>
            )}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-center text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 pb-2 mb-4 font-sans relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-12 after:h-0.5 after:-translate-x-1/2 after:bg-blue-200 dark:after:bg-blue-700">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4 break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{exp.jobTitle}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-sans">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <h4 className="italic text-gray-600 dark:text-gray-400 mb-1">{exp.company}</h4>
                  <ul className="list-disc list-outside pl-5 text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          <div className="grid grid-cols-2 gap-8">
             {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 pb-2 mb-4 font-sans relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-12 after:h-0.5 after:-translate-x-1/2 after:bg-blue-200 dark:after:bg-blue-700">Education</h2>
                    {education.map((edu, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{edu.institution}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-500 font-sans">{edu.startDate} - {edu.endDate}</p>
                        <h4 className="italic text-gray-600 dark:text-gray-400 mb-1">{edu.degree}</h4>
                        {edu.details && <p className="text-gray-600 dark:text-gray-400 text-xs">{edu.details}</p>}
                    </div>
                    ))}
                </section>
                )}

            {skills.length > 0 && (
                <section>
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 pb-2 mb-4 font-sans relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-12 after:h-0.5 after:-translate-x-1/2 after:bg-blue-200 dark:after:bg-blue-700">Skills</h2>
                    <div className="flex flex-wrap gap-2 font-sans justify-center">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {skill}
                        </span>
                    ))}
                    </div>
                </section>
            )}
          </div>
        </main>
      </div>
    );
  };
  

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data, template }, ref) => {
  return (
    <div ref={ref} className="aspect-[210/297] w-full max-w-full overflow-hidden">
      {template === Template.Modern && <ModernTemplate data={data} />}
      {template === Template.Creative && <CreativeTemplate data={data} />}
    </div>
  );
});

export default CVPreview;
