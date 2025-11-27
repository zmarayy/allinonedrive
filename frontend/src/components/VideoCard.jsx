import React from 'react';

function VideoCard({ video }) {
  return (
    <div className="bg-white rounded p-3 border border-indigo-100">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm mb-1">
            {video.title}
          </p>
          <p className="text-xs text-gray-600 font-medium mb-2">
            {video.description}
          </p>
          <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
            {video.duration && <span>Duration: {video.duration}</span>}
            {video.path && <span className="text-gray-400 truncate max-w-xs" title={video.path}>
              {video.path}
            </span>}
          </div>
        </div>
      </div>
      
      {/* Video Placeholder */}
      <div className="mt-3 bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-300">
        {video.embedUrl ? (
          <iframe
            src={video.embedUrl}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🎥</div>
            <p className="text-sm text-gray-600 font-medium">Video upload coming soon</p>
            <p className="text-xs text-gray-500 mt-1">Add file</p>
          </div>
        )}
      </div>
      
      {!video.embedUrl && (
        <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors">
          Upload Video
        </button>
      )}
    </div>
  );
}

export default VideoCard;
