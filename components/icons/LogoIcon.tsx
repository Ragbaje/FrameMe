
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-1" />
    <path d="M15 18H5.5A2.5 2.5 0 0 1 3 15.5v0A2.5 2.5 0 0 1 5.5 13H8" />
    <path d="M11 13h1" />
    <path d="M8 16h2" />
  </svg>
);
