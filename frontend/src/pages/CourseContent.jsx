import React, { useState } from 'react';
import { getUserPackage, getPackageDisplayName } from '../utils/packageAccess';
import { SEVEN_DAY_PLAN, getContentForDay, DAY_CONTENT } from '../data/courseContent';
import BottomNavbar from '../components/BottomNavbar';
import DayCard from '../components/DayCard';

function CourseContent() {
  const packageType = getUserPackage();
  const packageDisplayName = getPackageDisplayName(packageType);
  const [expandedDays, setExpandedDays] = useState({});

  const toggleDay = (day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  if (!packageType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="glass-card p-8 text-center">
            <p className="text-gray-600 font-medium mb-4">
              Please enter your access code to view course content.
            </p>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        {/* Header - Mobile Optimized */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            7-Day Course Plan
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-medium mb-2">
            Your Package: <span className="font-bold text-primary-600">{packageDisplayName}</span>
          </p>
        </div>

        {/* 7-Day Plan - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          {SEVEN_DAY_PLAN.map((dayPlan) => {
            const dayNumber = dayPlan.day;
            const dayData = DAY_CONTENT[dayNumber];
            const contentVisibility = getContentForDay(dayNumber, packageType);
            const isExpanded = expandedDays[dayNumber];

            return (
              <DayCard
                key={dayNumber}
                day={dayPlan}
                dayData={dayData}
                contentVisibility={contentVisibility}
                isExpanded={isExpanded}
                onToggle={() => toggleDay(dayNumber)}
                packageType={packageType}
              />
            );
          })}
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default CourseContent;
