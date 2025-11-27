import React from 'react';
import BottomNavbar from '../components/BottomNavbar';
import { hasAccess, getUserPackage } from '../utils/packageAccess';
import LockedSection from '../components/LockedSection';

function VideoLessons() {
  const packageType = getUserPackage();
  const hasVideoAccess = hasAccess('video_lessons');

  // Highway Code Rules Videos (40+ placeholders)
  const highwayCodeVideos = Array.from({ length: 40 }, (_, i) => ({
    id: `hc-${i + 1}`,
    title: `Highway Code Rule ${i + 1}`,
    duration: '5:00',
    ruleNumber: i + 1
  }));

  // Exam Topics Videos
  const examTopicsVideos = [
    { id: 'et-1', title: 'Road Signs and Markings', duration: '8:30' },
    { id: 'et-2', title: 'Traffic Lights and Signals', duration: '6:15' },
    { id: 'et-3', title: 'Right of Way Rules', duration: '7:45' },
    { id: 'et-4', title: 'Parking Regulations', duration: '5:20' },
    { id: 'et-5', title: 'Speed Limits', duration: '4:50' },
    { id: 'et-6', title: 'Overtaking Rules', duration: '6:30' },
    { id: 'et-7', title: 'Roundabouts', duration: '9:15' },
    { id: 'et-8', title: 'Motorway Driving', duration: '10:00' }
  ];

  // EDS Topics Videos
  const edsVideos = [
    { id: 'eds-1', title: 'Vehicle Controls', duration: '5:30' },
    { id: 'eds-2', title: 'Mirrors and Blind Spots', duration: '4:45' },
    { id: 'eds-3', title: 'Steering Techniques', duration: '6:00' },
    { id: 'eds-4', title: 'Braking and Acceleration', duration: '5:15' },
    { id: 'eds-5', title: 'Hazard Perception', duration: '7:20' },
    { id: 'eds-6', title: 'Emergency Procedures', duration: '6:45' }
  ];

  // 5-Minute Summary Videos
  const summaryVideos = [
    { id: 'sum-1', title: 'Highway Code Summary', duration: '5:00' },
    { id: 'sum-2', title: 'Exam Topics Summary', duration: '5:00' },
    { id: 'sum-3', title: 'EDS Topics Summary', duration: '5:00' }
  ];

  const handleVideoClick = (video) => {
    // Placeholder for video playback
    alert(`Playing: ${video.title}\n\n(Video player will be implemented here)`);
  };

  if (!hasVideoAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <LockedSection
            title="Video Lessons"
            message="Video lessons are available in Elite, Pro, and Ultimate Pro packages."
            currentPackage={packageType}
            requiredPackage="elite"
          />
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Video Lessons
          </h1>
          <p className="text-gray-600 font-medium">
            Watch comprehensive video explanations of all course topics
          </p>
        </div>

        {/* Highway Code Rules Section */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">📘</span>
              307 Highway Code Rules Explained
            </h2>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Complete video explanations of all 307 Highway Code rules
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {highwayCodeVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all duration-300 text-left border border-white/30 hover:border-primary-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary-600">
                      Rule {video.ruleNumber}
                    </span>
                    <span className="text-xs text-gray-500">{video.duration}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium line-clamp-2">
                    {video.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exam Topics Section */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">📝</span>
              Exam Topics Explained
            </h2>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Detailed video explanations of all exam topics
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {examTopicsVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-all duration-300 text-left border border-white/30 hover:border-primary-300 flex items-center space-x-3"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                    <p className="text-xs text-gray-500">{video.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* EDS Topics Section */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">🚗</span>
              Essential Driving Skills Explained
            </h2>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Learn essential driving skills through video demonstrations
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {edsVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-all duration-300 text-left border border-white/30 hover:border-primary-300 flex items-center space-x-3"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                    <p className="text-xs text-gray-500">{video.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5-Minute Summary Videos */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">⏱️</span>
              5-Minute Summary Videos
            </h2>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Quick 5-minute summaries for quick revision
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {summaryVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="bg-gradient-to-br from-primary-50 to-blue-50 hover:from-primary-100 hover:to-blue-100 p-4 rounded-lg transition-all duration-300 text-left border-2 border-primary-200 hover:border-primary-400"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-primary-700">{video.title}</span>
                    <span className="text-xs bg-primary-200 text-primary-700 px-2 py-1 rounded-full font-semibold">
                      {video.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Quick revision summary</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default VideoLessons;

