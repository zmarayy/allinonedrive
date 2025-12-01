import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AppPage from './pages/App';
import AccessCodeEntry from './pages/AccessCodeEntry';
import Dashboard from './pages/Dashboard';
import CourseContent from './pages/CourseContent';
import VideoLessons from './pages/VideoLessons';
import LiveClasses from './pages/LiveClasses';
import WhatsAppSupport from './pages/WhatsAppSupport';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import PdfFlashcards from './pages/PdfFlashcards';
import PdfExam from './pages/PdfExam';
import ProgressDashboard from './pages/ProgressDashboard';
import UserProfile from './pages/UserProfile';
import MultiLanguageContent from './pages/MultiLanguageContent';
import FAQ from './pages/FAQ';
import { isCodeVerified } from './utils/codeAccess';
import './App.css';

/**
 * Root redirect component - redirects based on PWA mode
 * Since this is the PWA domain (allinonedrive.netlify.app), always redirect to access-code
 */
function RootRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Always redirect from root to access-code or dashboard
    if (location.pathname === '/') {
      if (isCodeVerified()) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/access-code', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading app...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Root route - shows Home for website, redirects to app for PWA */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/access-code" element={<AccessCodeEntry />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course-content"
          element={
            <ProtectedRoute>
              <CourseContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/flashcards"
          element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <VideoLessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live-classes"
          element={
            <ProtectedRoute>
              <LiveClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp-support"
          element={
            <ProtectedRoute>
              <WhatsAppSupport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:day"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pdf-flashcards/:day/:pdfIndex"
          element={
            <ProtectedRoute>
              <PdfFlashcards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pdf-exam/:day/:pdfIndex"
          element={
            <ProtectedRoute>
              <PdfExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multi-language"
          element={
            <ProtectedRoute>
              <MultiLanguageContent />
            </ProtectedRoute>
          }
        />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;

