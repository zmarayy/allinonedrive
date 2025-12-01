import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStoredPackage } from '../utils/codeAccess';
import { PACKAGE_TYPES } from '../utils/packageAccess';

function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const packageType = getStoredPackage();

  // Check if user has Elite package
  const isElitePackage = [
    PACKAGE_TYPES.ELITE_SELF_STUDY,
    PACKAGE_TYPES.ELITE_LIVE_SUPPORT,
    PACKAGE_TYPES.DRIVING_THEORY_FULL,
  ].includes(packageType);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, path: '/dashboard' },
    { id: 'course', label: 'Course', icon: CourseIcon, path: '/course-content' },
    { id: 'flashcards', label: 'Flashcards', icon: FlashcardsIcon, path: '/flashcards' },
    ...(isElitePackage ? [{ id: 'languages', label: 'Languages', icon: LanguagesIcon, path: '/multi-language' }] : []),
    { id: 'profile', label: 'Profile', icon: ProfileIcon, path: '/profile' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const gridCols = navItems.length === 5 ? 'grid-cols-5' : 'grid-cols-4';

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/30 backdrop-blur-md bg-white/20 z-50 safe-area-bottom">
      <div className={`grid ${gridCols} gap-1 px-2 py-2 pb-safe`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-300 ${
                active
                  ? 'bg-white/30 text-primary-600'
                  : 'text-gray-600 hover:bg-white/10'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${active ? 'text-primary-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${active ? 'text-primary-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// Icon Components
function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function CourseIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function FlashcardsIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function ProfileIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function LanguagesIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  );
}

export default BottomNavbar;

