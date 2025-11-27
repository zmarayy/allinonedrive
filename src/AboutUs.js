import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from './Logo';

function AboutUs() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({
    lina: false,
    imtiaz: false,
    meral: false,
    hamza: false,
    nikolay: false
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleImageError = (name) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200/90 to-slate-200 relative">
      {/* Sticky Glass Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Logo className="w-10 h-10" />
              <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                All In One Drive
              </Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-primary-600 font-medium">
                About Us
              </Link>
              <Link to="/packages" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Packages
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Contact
              </Link>
              <Link to="/faq" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                FAQ
              </Link>
              <Link to="/teach" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Teach With Us
              </Link>
              <Link to="/terms" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Terms
              </Link>
              <Link to="/app" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                App
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary-600 transition-colors p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/20 backdrop-blur-md border-t border-white/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <Link to="/about" className="block px-3 py-2 text-primary-600 font-medium rounded-md hover:bg-white/30 transition-colors" onClick={toggleMobileMenu}>
                  About Us
                </Link>
                <Link to="/packages" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Packages
                </Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Contact
                </Link>
                <Link to="/faq" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  FAQ
                </Link>
                <Link to="/teach" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Teach With Us
                </Link>
                <Link to="/terms" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Terms & Privacy
                </Link>
                <Link to="/app" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  App
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 font-medium leading-relaxed">
                All in One Drive exists to make the UK driving licence journey clear, calm and achievable for everyone. We remove confusion, fear and language barriers through structured teaching and full support from the first step to the final licence.
              </p>
            </div>
          </div>
          
          {/* Background Road Image Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20"></div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              CEO & Founder
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column - Founder Image */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl h-64 sm:h-80 lg:h-96 w-full flex items-center justify-center border border-white/20 shadow-xl overflow-hidden relative">
                {!imageErrors.lina ? (
                  <img
                    src="/assets/images/Lina-wahidi.jpeg"
                    alt="Lina Wahidi - CEO & Founder"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 10%' }}
                    onError={() => handleImageError('lina')}
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white text-2xl sm:text-4xl font-bold">LW</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Lina Wahidi</h3>
                    <p className="text-white/80 font-medium text-sm sm:text-base">CEO & Founder</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Founder Story */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-4 sm:space-y-6 text-gray-700 font-medium leading-relaxed">
                <p className="text-base sm:text-lg">
                  I have never seen a driving licence as just a piece of plastic. For me, it is a small key that opens a bigger life: freedom to visit family, accept work and move on your own terms. I have lived that freedom and I know how different life feels when you are not waiting for lifts or relying on favours. As a Muslim, I believe that when Allah gives you knowledge and opportunity, it is a trust. You stand back up when life is hard, and you share what you have learned. That faith and responsibility sit at the heart of All In One Drive.
                </p>
                
                <p className="text-base sm:text-lg">
                  Before building All In One Drive, I spent a year listening to learners, theory teachers and driving instructors. They told me the journey was confusing, the language was difficult and many people felt alone. Their message was clear: real success in driving does not happen alone; it happens when people move together. All In One Drive is my answer to that. It is not just an app, but a community and a clear system, including our seven-day structured theory course, designed from their feedback so that more people can unlock their own freedom, work and sense of belonging.
                </p>
                
                <div className="bg-primary-50 rounded-xl p-4 sm:p-6 border border-primary-200">
                  <p className="text-primary-800 font-semibold italic text-sm sm:text-base">
                    "My mission is to create opportunities that inspire others to overcome limitations and unlock their full potential. Authentic leadership is about making an impact: helping people acquire skills, confidence, and the freedom to take charge of their lives."
                  </p>
                  <p className="text-primary-600 font-semibold mt-2 sm:mt-3 text-sm sm:text-base">— Lina Wahidi, CEO & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Meet Our Board of Directors
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
              Our distinguished board brings decades of combined experience in education, policy, and community leadership
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Board Member 1 - Imtiaz Sharifi */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg flex flex-col h-full">
              {/* Profile Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                {!imageErrors.imtiaz ? (
                  <img
                    src="/assets/images/imtiaz-sharifi.jpeg"
                    alt="Imtiaz Sharifi"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 25%' }}
                    onError={() => handleImageError('imtiaz')}
                  />
                ) : (
                  <span className="text-white text-2xl sm:text-4xl font-bold">IS</span>
                )}
              </div>
              
              {/* Name and Title */}
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Imtiaz Sharifi
                </h3>
                <p className="text-primary-600 font-semibold text-sm sm:text-lg mb-3">
                  Founder and CEO of Afghan British Council, C4A Think Tank
                </p>
              </div>
              
              {/* Short Summary */}
              <p className="text-gray-700 font-medium leading-relaxed mb-3 sm:mb-4 flex-1 text-sm sm:text-base">
                Imtiaz Sharifi is a seasoned academic, diplomat, and entrepreneur with nearly two decades of experience across aviation, government, and policy. As founder of the Afghan British Council and the C4A Think Tank, he has led key reforms in Afghanistan's finance and education sectors.
              </p>
            </div>
            
            {/* Board Member 2 - Meral Alizada */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg flex flex-col h-full">
              {/* Profile Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center relative">
                {!imageErrors.meral ? (
                  <img
                    src="/assets/images/meral-alizada.jpeg"
                    alt="Meral Alizada"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 15%' }}
                    onError={() => handleImageError('meral')}
                  />
                ) : (
                  <span className="text-white text-2xl sm:text-4xl font-bold">MA</span>
                )}
              </div>
              
              {/* Name and Title */}
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Meral Alizada
                </h3>
                <p className="text-primary-600 font-semibold text-sm sm:text-lg mb-3">
                  Founder of Results of Kindness
                </p>
              </div>
              
              {/* Short Summary */}
              <p className="text-gray-700 font-medium leading-relaxed mb-3 sm:mb-4 flex-1 text-sm sm:text-base">
                Meral Alizada is the architect of Kindness as Infrastructure and a global voice on ethical leadership, AI collaboration, and future-ready workplaces. She leads Results of Kindness and is known for her innovative frameworks that redesign human systems.
              </p>
            </div>
            
            {/* Board Member 3 - Hamza Hashime */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg flex flex-col h-full">
              {/* Profile Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-lg bg-gradient-to-br from-blue-500 to-primary-600 flex items-center justify-center relative">
                {!imageErrors.hamza ? (
                  <img
                    src="/assets/images/hamza-hashime.jpeg"
                    alt="Hamza Hashime"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 25%' }}
                    onError={() => handleImageError('hamza')}
                  />
                ) : (
                  <span className="text-white text-2xl sm:text-4xl font-bold">HH</span>
                )}
              </div>
              
              {/* Name and Title */}
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Hamza Hashime
                </h3>
                <p className="text-primary-600 font-semibold text-sm sm:text-lg mb-3">
                  Co-Founder of The Business & People Foundation Hub
                </p>
              </div>
              
              {/* Short Summary */}
              <p className="text-gray-700 font-medium leading-relaxed mb-3 sm:mb-4 flex-1 text-sm sm:text-base">
                Hamza Hashime is a community builder and advisor working at the intersection of business, innovation, and wellbeing. As co-founder of The Business & People Foundation, he empowers entrepreneurs and CEOs with strategy and vision.
              </p>
            </div>
            
            {/* Board Member 4 - Nikolay Kirilov */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg flex flex-col h-full">
              {/* Profile Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center relative">
                {!imageErrors.nikolay ? (
                  <img
                    src="/assets/images/Nikolay-Kirilov .jpeg"
                    alt="Nikolay Kirilov"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 25%' }}
                    onError={() => handleImageError('nikolay')}
                  />
                ) : (
                  <span className="text-white text-2xl sm:text-4xl font-bold">NK</span>
                )}
              </div>
              
              {/* Name and Title */}
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Nikolay Kirilov
                </h3>
                <p className="text-primary-600 font-semibold text-sm sm:text-lg mb-3">
                  Founder of The Business & People Ecosystem
                </p>
              </div>
              
              {/* Short Summary */}
              <p className="text-gray-700 font-medium leading-relaxed mb-3 sm:mb-4 flex-1 text-sm sm:text-base">
                Nikolay Kirilov is a strategic consultant and founder of The Business & People ecosystem, specialising in business growth, technology, and community development. He helps companies streamline operations and build commercially viable platforms across the UK, EU, US, and Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why All In One Drive Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why All In One Drive?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
              We provide everything you need to pass your DVSA theory test with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Feature Card 1 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                Structured Curriculum
              </h3>
              <p className="text-gray-600 font-medium text-sm sm:text-base text-center sm:text-left">
                Our program is carefully designed to cover all DVSA theory test topics systematically.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                Multi-language Support
              </h3>
              <p className="text-gray-600 font-medium text-sm sm:text-base text-center sm:text-left">
                Learn in your preferred language: Pashto, Urdu, Dari, or English for better understanding.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                Expert Guidance
              </h3>
              <p className="text-gray-600 font-medium text-sm sm:text-base text-center sm:text-left">
                Learn from experienced instructors who understand the DVSA test requirements inside and out.
              </p>
            </div>
            
            {/* Feature Card 4 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                Confidence-building Approach
              </h3>
              <p className="text-gray-600 font-medium text-sm sm:text-base text-center sm:text-left">
                Build confidence through practice tests, mock exams, and personalized feedback sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-r from-primary-900/40 to-black/40 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 font-medium leading-relaxed">
                All In One Drive exists to make the journey from first lesson to full licence clear, supportive and fair.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border border-white/20 mt-6 sm:mt-8">
                <div className="space-y-4 sm:space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0 mx-auto sm:mx-0">👨‍🎓</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">For Students</h3>
                      <p className="text-white/90 font-medium leading-relaxed text-sm sm:text-base">
                        Students are given structure, confidence and language support.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0 mx-auto sm:mx-0">👩‍🏫</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">For Theory Teachers</h3>
                      <p className="text-white/90 font-medium leading-relaxed text-sm sm:text-base">
                        Theory teachers are trained, equipped and only pay when they are truly benefitting.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0 mx-auto sm:mx-0">🚗</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">For Driving Instructors</h3>
                      <p className="text-white/90 font-medium leading-relaxed text-sm sm:text-base">
                        Driving instructors are connected with engaged learners and backed by a professional system that grows with them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg sm:text-xl text-white/95 font-medium leading-relaxed mt-6 sm:mt-8">
                We bring everyone together in one place so that learning, teaching and earning around driving are simpler and more rewarding for all.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Mission Pillar 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 text-center sm:text-left">📚</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">
                Clarity in Learning
              </h3>
              <p className="text-white/90 font-medium leading-relaxed text-sm sm:text-base text-center sm:text-left">
                Structured, multilingual, DVSA-approved guidance that makes complex theory simple and accessible.
              </p>
            </div>
            
            {/* Mission Pillar 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 text-center sm:text-left">👩‍🎓</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">
                Confidence & Empowerment
              </h3>
              <p className="text-white/90 font-medium leading-relaxed text-sm sm:text-base text-center sm:text-left">
                Especially for women and underserved learners who deserve equal access to independence and mobility.
              </p>
            </div>
            
            {/* Mission Pillar 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 text-center sm:text-left">🌍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">
                Access for All
              </h3>
              <p className="text-white/90 font-medium leading-relaxed text-sm sm:text-base text-center sm:text-left">
                Available in Pashto, Dari, Urdu, and English — because everyone should learn in their preferred language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg border border-white/20">
            <div className="text-xl sm:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 font-medium italic leading-relaxed">
              "This is more than driving. It's about empowering independence and taking control of your journey."
            </div>
            
            <div className="text-white/80 mb-6 sm:mb-8 font-medium text-sm sm:text-base">
              — Lina, Founder of All In One Drive
            </div>
            
            <button 
              className="bg-primary-600 hover:bg-primary-700 transition-all duration-300 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
              onClick={() => window.open('[INSERT_TIDYCAL_BOOKING_LINK_HERE]', '_blank')}
            >
              Explore Our Course
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Left Column - Logo & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Logo className="w-6 h-6 sm:w-8 sm:h-8" />
                <Link to="/" className="text-xl sm:text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors">
                  All In One Drive
                </Link>
              </div>
              <p className="text-white/80 font-medium italic text-sm sm:text-base">
                "confidence first. Licence ready"
              </p>
            </div>
            
            {/* Middle Column - Quick Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Home
                </Link>
                <Link to="/about" className="block text-primary-400 font-medium">
                  About Us
                </Link>
                <Link to="/packages" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Packages
                </Link>
                <Link to="/contact" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Contact
                </Link>
                <Link to="/faq" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  FAQ
                </Link>
                <Link to="/teach" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Teach With Us
                </Link>
                <Link to="/terms" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Terms & Privacy
                </Link>
              </div>
            </div>
            
            {/* Right Column - Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-white/80 font-medium">linawahidi@allinonedrive.com</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="text-white/80 font-medium">+44 7908 853486</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div className="text-white/80 font-medium text-sm leading-relaxed">
                    Suite 6670, Unit 3A<br />
                    34-35 Hatton Garden<br />
                    Holborn, London EC1N 8DX
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="text-white/80 font-medium">WhatsApp: 9AM–3PM (Sat & Sun)</span>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <button className="text-white/60 hover:text-primary-400 transition-colors duration-300 p-1" aria-label="Follow us on Twitter">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="text-white/60 hover:text-primary-400 transition-colors duration-300 p-1" aria-label="Follow us on Facebook">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </button>
                  <button className="text-white/60 hover:text-primary-400 transition-colors duration-300 p-1" aria-label="Follow us on YouTube">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Copyright */}
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/60 text-sm">
              © 2025 All In One Drive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
