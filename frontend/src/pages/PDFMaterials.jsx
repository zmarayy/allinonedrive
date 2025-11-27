import React from 'react';
import BottomNavbar from '../components/BottomNavbar';

function PDFMaterials() {
  // PDF materials are available for all packages
  const pdfMaterials = [
    {
      id: 1,
      title: '307 Highway Code Rules',
      description: 'Complete guide to all 307 Highway Code rules',
      type: 'PDF',
      size: '~2.5 MB',
      icon: '📘'
    },
    {
      id: 2,
      title: 'Essential Driving Skills (EDS) Topics',
      description: 'Comprehensive guide to essential driving skills',
      type: 'PDF',
      size: '~1.8 MB',
      icon: '🚗'
    },
    {
      id: 3,
      title: 'Exam Topics',
      description: 'All exam topics covered in detail',
      type: 'PDF',
      size: '~3.2 MB',
      icon: '📝'
    },
    {
      id: 4,
      title: 'Exam Summary Notes',
      description: 'Quick reference summary notes for exam preparation',
      type: 'PDF',
      size: '~1.5 MB',
      icon: '📋'
    },
    {
      id: 5,
      title: 'DVSA Questions & Answers',
      description: 'Practice questions with detailed answers',
      type: 'PDF',
      size: '~2.1 MB',
      icon: '❓'
    }
  ];

  const handleDownload = (material) => {
    // Placeholder for download functionality
    alert(`Downloading ${material.title}...\n\n(File will be available after upload)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            PDF Materials
          </h1>
          <p className="text-gray-600 font-medium">
            Download and study all your course materials
          </p>
        </div>

        {/* Materials Grid */}
        <div className="space-y-4">
          {pdfMaterials.map((material) => (
            <div
              key={material.id}
              className="glass-card p-5 hover:bg-white/20 transition-all duration-300 animate-slide-up"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="text-4xl flex-shrink-0">{material.icon}</div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {material.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    {material.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      {material.type}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {material.size}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(material)}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-6 glass-card p-4 bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            💡 <strong>Tip:</strong> Download all materials to study offline. Files will be available after upload.
          </p>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default PDFMaterials;

