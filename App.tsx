
import React, { useState, useRef, useEffect } from 'react';
import { CVData, Section, Template } from './types';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { DownloadIcon } from './components/icons/DownloadIcon';
import { LogoIcon } from './components/icons/LogoIcon';
import DarkModeToggle from './components/DarkModeToggle';
import TemplateSelector from './components/TemplateSelector';

// @ts-ignore
const { jsPDF } = window.jspdf;

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalDetails: {
      fullName: 'Your Name',
      email: 'your.email@example.com',
      phoneNumber: '01234 567890',
      address: 'Your City, Your County',
    },
    profile: 'A highly motivated and enthusiastic student seeking a part-time role. Eager to apply my strong communication and teamwork skills in a dynamic environment. Passionate about learning new things and contributing to a team.',
    education: [
      {
        institution: 'University of Example',
        degree: 'BSc Computer Science',
        startDate: 'Sep 2021',
        endDate: 'Present',
        details: 'Relevant modules: Data Structures, Algorithms, Web Development.',
      },
    ],
    experience: [
      {
        company: 'Example Retail Ltd.',
        jobTitle: 'Sales Assistant',
        startDate: 'Jun 2022',
        endDate: 'Aug 2022',
        responsibilities: [
          'Assisted customers with inquiries and purchases.',
          'Operated the till and handled cash transactions.',
          'Maintained store cleanliness and stock levels.',
        ],
      },
    ],
    skills: ['JavaScript', 'React', 'Tailwind CSS', 'Teamwork', 'Communication'],
  });

  const [currentSection, setCurrentSection] = useState<Section>(Section.Welcome);
  const [template, setTemplate] = useState<Template>(Template.Modern);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const cvElement = previewRef.current;
    if (cvElement) {
      // @ts-ignore
      html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;

        if (height > pdfHeight) {
          console.warn("CV content might be too long for a single PDF page.");
        }
        
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${cvData.personalDetails.fullName.replace(' ','_')}_CV_${template}.pdf`);
      });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-['Inter',_sans-serif] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              FrameMe
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <DarkModeToggle />
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150"
            >
              <DownloadIcon />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 lg:order-1">
            <CVForm
              cvData={cvData}
              setCvData={setCvData}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />
          </div>
          <div className="lg:col-span-3 lg:order-2 space-y-6">
            <TemplateSelector
                currentTemplate={template}
                onSelectTemplate={setTemplate}
             />
             <div className="bg-gray-100 dark:bg-gray-800/50 p-4 sm:p-6 lg:p-8 rounded-xl">
                <div className="shadow-2xl shadow-gray-400/60 dark:shadow-black/40 rounded-sm overflow-hidden">
                    <CVPreview ref={previewRef} data={cvData} template={template} />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;