import React from 'react';

function PdfCard({ title, pdfData }) {
  return (
    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
      <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
        <span className="mr-2">📄</span>
        {title}
      </h4>
      <div className="bg-white rounded p-3 border border-emerald-100 flex items-center justify-between">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm mb-1">
            {pdfData.title}
          </p>
          <p className="text-xs text-gray-600 font-medium mb-1">
            {pdfData.description}
          </p>
          {pdfData.fileSize && (
            <span className="inline-block text-xs text-gray-500 font-medium">
              Size: {pdfData.fileSize}
            </span>
          )}
        </div>
        <button className="ml-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors">
          Download
        </button>
      </div>
    </div>
  );
}

export default PdfCard;

