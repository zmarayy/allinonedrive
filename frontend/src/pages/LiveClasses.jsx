import React, { useState } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import { hasAccess, getUserPackage } from '../utils/packageAccess';
import LockedSection from '../components/LockedSection';

function LiveClasses() {
  const packageType = getUserPackage();
  const hasProAccess = hasAccess('day1_live_class');
  const hasDay2Access = hasAccess('day2_live_class');

  const [selectedClass, setSelectedClass] = useState(null);

  const availableClasses = [
    {
      id: 'day1',
      title: 'Day 1 Live Class',
      duration: '4 hours',
      description: 'Comprehensive introduction to Highway Code and essential driving theory',
      available: hasProAccess,
      date: 'TBD',
      time: '10:00 AM - 2:00 PM'
    },
    {
      id: 'day7',
      title: 'Day 7 Live Class',
      duration: '4 hours',
      description: 'Final review, exam preparation, and Q&A session',
      available: hasProAccess,
      date: 'TBD',
      time: '10:00 AM - 2:00 PM'
    },
    {
      id: 'day2',
      title: 'Day 2 Live Class',
      duration: '4 hours',
      description: 'Advanced topics and in-depth practice sessions',
      available: hasDay2Access,
      date: 'TBD',
      time: '10:00 AM - 2:00 PM'
    }
  ];

  const handleBookClass = (classItem) => {
    setSelectedClass(classItem);
    // Placeholder for booking functionality
    alert(`Booking ${classItem.title}...\n\n(Booking calendar will be implemented here)`);
  };

  if (!hasProAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <LockedSection
            title="Live Classes"
            message="Live online classes are available in Pro and Ultimate Pro packages."
            currentPackage={packageType}
            requiredPackage="pro"
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
            Live Online Classes
          </h1>
          <p className="text-gray-600 font-medium">
            Book your live online teaching sessions via Google Meet
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-6 glass-card p-5 bg-blue-50 border border-blue-200">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">How It Works</h3>
              <p className="text-sm text-blue-800 font-medium">
                Select a class below to view available dates and book your session. Classes are conducted via Google Meet and include interactive teaching, Q&A, and personalized guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="space-y-4">
          {availableClasses.map((classItem) => (
            <div
              key={classItem.id}
              className={`glass-card p-6 ${
                !classItem.available ? 'opacity-60' : 'hover:bg-white/20'
              } transition-all duration-300 animate-slide-up`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Class Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{classItem.title}</h3>
                    {!classItem.available && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                        Locked
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-medium mb-3">{classItem.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {classItem.duration}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {classItem.time}
                    </span>
                  </div>
                </div>

                {/* Booking Button */}
                {classItem.available ? (
                  <button
                    onClick={() => handleBookClass(classItem)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Book Now</span>
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 font-medium mb-2">
                      Available in Ultimate Pro
                    </p>
                    <button
                      disabled
                      className="bg-gray-300 text-gray-500 font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
                    >
                      Locked
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Placeholder */}
        {selectedClass && (
          <div className="mt-6 glass-card p-6 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select Date for {selectedClass.title}
            </h3>
            <div className="bg-white/20 p-8 rounded-lg border-2 border-dashed border-gray-300 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 font-medium">
                Calendar integration will be implemented here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                You can integrate with Google Calendar, Calendly, or a custom booking system
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}

export default LiveClasses;

