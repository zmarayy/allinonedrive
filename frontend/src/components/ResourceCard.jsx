import React from 'react';

function ResourceCard({ title, description, fileSize, count, path, type }) {
  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'odt':
        return '📝';
      case 'flashcard':
        return '🃏';
      default:
        return '📦';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'pdf':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'odt':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'flashcard':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-teal-600 hover:bg-teal-700';
    }
  };

  return (
    <div className="bg-white rounded p-3 border border-gray-100 flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-lg">{getIcon()}</span>
          <p className="font-semibold text-gray-900 text-sm">
            {title}
          </p>
        </div>
        <p className="text-xs text-gray-600 font-medium mb-1">
          {description}
        </p>
        <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
          {fileSize && <span>Size: {fileSize}</span>}
          {count && <span>{count}</span>}
          {path && <span className="text-gray-400 truncate max-w-xs" title={path}>
            {path}
          </span>}
        </div>
      </div>
      <button className={`ml-3 ${getButtonColor()} text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors whitespace-nowrap`}>
        {type === 'flashcard' ? 'View' : 'Download'}
      </button>
    </div>
  );
}

export default ResourceCard;

