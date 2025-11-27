import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`${className} flex-shrink-0`}>
      {/* Try to load the actual logo first, fallback to SVG if not found */}
                  <img 
                    src="/assets/images/allinonedrive.png"
                    alt="All In One Drive Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to SVG if image doesn't exist
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
      {/* Fallback SVG - hidden by default */}
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{display: 'none'}}>
        {/* Shield outline */}
        <path
          d="M50 10 L75 25 L75 60 Q75 75 50 90 Q25 75 25 60 L25 25 Z"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="3"
          className="drop-shadow-sm"
        />
        
        {/* Graduation cap */}
        <rect
          x="40"
          y="5"
          width="20"
          height="8"
          fill="#14b8a6"
          rx="1"
        />
        <rect
          x="42"
          y="13"
          width="16"
          height="3"
          fill="#14b8a6"
          rx="1"
        />
        
        {/* Tassel */}
        <line
          x1="60"
          y1="8"
          x2="65"
          y2="15"
          stroke="#14b8a6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="65"
          cy="15"
          r="1.5"
          fill="#14b8a6"
        />
        
        {/* Winding road inside shield */}
        <path
          d="M50 85 Q35 70 25 50 Q30 35 45 30 Q60 25 70 40 Q75 55 70 70"
          fill="none"
          stroke="#0d9488"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Road dashes */}
        <circle cx="30" cy="45" r="1" fill="white" />
        <circle cx="40" cy="35" r="1" fill="white" />
        <circle cx="55" cy="30" r="1" fill="white" />
        <circle cx="65" cy="45" r="1" fill="white" />
        <circle cx="68" cy="60" r="1" fill="white" />
      </svg>
    </div>
  );
};

export default Logo;
