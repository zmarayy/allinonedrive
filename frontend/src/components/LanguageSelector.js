import React, { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ps', name: 'Pashto', flag: '🇦🇫' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'prs', name: 'Dari', flag: '🇦🇫' },
];

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // TODO: Implement language change logic
    console.log('Language changed to:', language.code);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-card w-full py-4 px-6 flex items-center justify-between text-lg font-semibold text-gray-900 hover:bg-white/20 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedLanguage.flag}</span>
            <span>{selectedLanguage.name}</span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-10">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full py-4 px-6 flex items-center space-x-3 text-left hover:bg-white/20 transition-colors ${
                  selectedLanguage.code === language.code ? 'bg-white/30' : ''
                }`}
              >
                <span className="text-2xl">{language.flag}</span>
                <span className="font-medium text-gray-900">{language.name}</span>
                {selectedLanguage.code === language.code && (
                  <svg className="w-5 h-5 text-primary-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;

