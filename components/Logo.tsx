
import React from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean; // For dark backgrounds (footer/dark mode)
}

const Logo: React.FC<LogoProps> = ({ className = "", lightMode = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient" x1="5" y1="35" x2="35" y2="5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e40af" />   {/* Indigo-800 */}
            <stop offset="50%" stopColor="#3b82f6" />  {/* Blue-500 */}
            <stop offset="100%" stopColor="#84cc16" /> {/* Lime-500 */}
          </linearGradient>
        </defs>
        {/* Stylized Checkmark matching the brand */}
        <path
          d="M8 22 L16 30 L32 10"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`text-2xl font-bold tracking-tight ${lightMode ? 'text-white' : 'text-slate-900'}`}>
        Aprovex
      </span>
    </div>
  );
};

export default Logo;
