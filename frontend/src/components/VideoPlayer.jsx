import React, { useState, useRef, useEffect } from 'react';
import { markVideoWatched } from '../utils/videoLearningFlow';

/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeVideoId(urlOrId) {
  if (!urlOrId) return null;
  
  // If it's already just an ID (11 characters, alphanumeric)
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }
  
  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = urlOrId.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

function VideoPlayer({ title, videoPath, youtubeVideoId, dayNumber, pdfIndex, onVideoWatched }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const [hasWatched, setHasWatched] = useState(false);
  const [isYouTube, setIsYouTube] = useState(false);
  const [youtubeId, setYoutubeId] = useState(null);

  // Determine if this is a YouTube video
  useEffect(() => {
    const ytId = youtubeVideoId || (videoPath ? getYouTubeVideoId(videoPath) : null);
    if (ytId) {
      setIsYouTube(true);
      setYoutubeId(ytId);
    } else {
      setIsYouTube(false);
    }
  }, [videoPath, youtubeVideoId]);

  // Handle YouTube video watching (mark as watched when iframe loads)
  useEffect(() => {
    if (isYouTube && youtubeId && iframeRef.current && !hasWatched) {
      // For YouTube, we'll mark as watched when the iframe loads
      // You can also use YouTube API for more precise tracking
      const timer = setTimeout(() => {
        markVideoWatched(dayNumber, pdfIndex);
        setHasWatched(true);
        if (onVideoWatched) {
          onVideoWatched(dayNumber, pdfIndex);
        }
      }, 5000); // Mark as watched after 5 seconds of video being available

      return () => clearTimeout(timer);
    }
  }, [isYouTube, youtubeId, dayNumber, pdfIndex, hasWatched, onVideoWatched]);

  // Handle local video playback
  useEffect(() => {
    if (isYouTube) return; // Skip for YouTube videos
    
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      updateProgress();
      // Mark as watched if user watched at least 50% of the video
      if (video.duration && video.currentTime / video.duration >= 0.5 && !hasWatched) {
        markVideoWatched(dayNumber, pdfIndex);
        setHasWatched(true);
        if (onVideoWatched) {
          onVideoWatched(dayNumber, pdfIndex);
        }
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [dayNumber, pdfIndex, hasWatched, onVideoWatched, isYouTube]);

  const togglePlay = () => {
    if (isYouTube) {
      // YouTube videos are controlled by the iframe
      // Play/pause is handled by YouTube's controls
      return;
    }
    
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (isYouTube) return; // YouTube handles seeking internally
    
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * video.duration;
    video.currentTime = newTime;
    setProgress((newTime / video.duration) * 100);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // YouTube embed URL with autoplay and controls
  const youtubeEmbedUrl = youtubeId 
    ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`
    : null;

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
        {isYouTube && youtubeEmbedUrl ? (
          // YouTube iframe embed
          <iframe
            ref={iframeRef}
            src={youtubeEmbedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'Video'}
          />
        ) : (
          // Local video player
          <>
            <video
              ref={videoRef}
              src={videoPath}
              className="w-full h-full object-contain"
              playsInline
              controls={false}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 active:bg-black/40 transition-colors touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label="Play video"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                  <svg className="w-7 h-7 sm:w-10 sm:h-10 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
              {/* Progress Bar */}
              <div
                className="w-full h-2.5 sm:h-3 bg-white/20 rounded-full mb-3 cursor-pointer touch-manipulation active:bg-white/30"
                onClick={handleSeek}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div
                  className="h-full bg-primary-600 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Time and Controls */}
              <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 active:bg-white/20 rounded-full transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <span className="font-medium text-xs sm:text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
