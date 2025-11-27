import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from './Logo';

function TeachWithUs() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
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
              <Link to="/teach" className="text-primary-600 font-medium">
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
                <Link to="/about" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
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
                <Link to="/teach" className="block px-3 py-2 text-primary-600 font-medium rounded-md hover:bg-white/30 transition-colors" onClick={toggleMobileMenu}>
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
      <section className="py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 border border-white/30 shadow-lg">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Teach With Us
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto font-medium leading-relaxed px-4">
              Join our mission to empower learners through accessible, multilingual driving theory education
            </p>
          </div>
        </div>
      </section>

      {/* Opportunity Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12 shadow-xl border border-white/20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              Become a Driving Theory Instructor
            </h2>
            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mb-6 sm:mb-8 text-center">
              We're looking for passionate, qualified instructors who share our vision of making driving theory accessible to everyone. As an instructor with All In One Drive, you'll have the opportunity to teach in Pashto, Dari, Urdu, and English, helping students build confidence and achieve their goals in a structured, supportive environment.
            </p>
            
            {/* Benefits Section */}
            <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                Why Join Our Team?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Benefit 1 */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center">💰</div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Competitive Compensation
                  </h4>
                  <p className="text-gray-700 font-medium text-center leading-relaxed text-sm sm:text-base">
                    Earn competitive rates while making a meaningful impact on students' lives
                  </p>
                </div>
                
                {/* Benefit 2 */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center">🌍</div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Multilingual Teaching
                  </h4>
                  <p className="text-gray-700 font-medium text-center leading-relaxed text-sm sm:text-base">
                    Teach in your preferred language (Pashto, Dari, Urdu, or English) and connect with diverse communities
                  </p>
                </div>
                
                {/* Benefit 3 */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center">📚</div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Structured Support
                  </h4>
                  <p className="text-gray-700 font-medium text-center leading-relaxed text-sm sm:text-base">
                    Access comprehensive teaching materials and receive ongoing support from our experienced team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theory Teacher Opportunity Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Become a Theory Teacher
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
              All In One Drive creates opportunities for people who want to become theory teachers
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Main Content Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12 shadow-xl border border-white/20 mb-6 sm:mb-8">
              <div className="space-y-8">
                {/* Training Section */}
                <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">🎓</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Comprehensive Training Program
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                        New teachers receive between <span className="font-bold text-primary-700">one and two weeks of training</span> to help them become confident and effective instructors. You'll learn teaching methodologies, how to use our platform, and best practices for student engagement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teaching Materials Section */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">📚</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Complete Teaching Resources Provided
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                        You teach using our <span className="font-bold text-primary-700">DVSA approved seven day theory course</span> and are provided with structured teaching materials, including lesson plans and resources, so you do not need to develop your own content.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Platform Features Section */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-purple-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">💻</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Platform Tools
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                        Through our platform, you can organise classes, follow each student's progress, and stay connected with learners in a professional way.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Membership Model Section */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-amber-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">💳</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Fair Membership Model
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg mb-3 sm:mb-4">
                        The membership model is designed to be fair. Theory teachers do <span className="font-bold text-primary-700">not pay for their membership until they are earning at least three times the value of that membership</span> from their teaching through All In One Drive.
                      </p>
                      <div className="bg-white rounded-lg p-4 sm:p-5 border-2 border-amber-300 mt-3 sm:mt-4">
                        <p className="text-gray-800 font-semibold text-base sm:text-lg">
                          <span className="text-amber-700 font-bold">What this means:</span> You can train, start teaching, and grow your income before any membership fee becomes due.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driving Instructors Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Partner as a Driving Instructor
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
              Connect with motivated learners who are already supported with structured theory preparation
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Main Content Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12 shadow-xl border border-white/20 mb-6 sm:mb-8">
              <div className="space-y-8">
                {/* Sign Up & Account Section */}
                <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">🚗</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Free Sign Up & Instructor Account
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                        Instructors sign up for free. Once approved, you receive access to an instructor account where you can manage lesson bookings, view and update your schedule, and keep communication with students in one place.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Membership & Fees Section */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">💳</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Membership & Fee Structure
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                          The standard annual membership fee is <span className="font-bold text-primary-700">£599.99</span>, which includes a <span className="font-bold text-primary-700">twenty five per cent saving</span> for instructors who choose to pay yearly.
                        </p>
                        <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                          There is also a <span className="font-bold text-primary-700">£5.00 commission</span> on each lesson delivered through All In One Drive.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance-Based Fees Section */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-amber-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">📈</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Performance-Based Fee Structure
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg mb-3 sm:mb-4">
                        The fee structure is performance based. Instructors do <span className="font-bold text-primary-700">not pay a monthly membership fee in any period where they do not earn at least three times the membership amount</span> from lessons booked through the platform.
                      </p>
                      <div className="bg-white rounded-lg p-4 sm:p-5 border-2 border-amber-300 mt-3 sm:mt-4">
                        <p className="text-gray-800 font-semibold text-base sm:text-lg">
                          <span className="text-amber-700 font-bold">In other words:</span> Membership is only charged when the service is clearly helping you generate meaningful income.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visibility & Marketing Section */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-purple-200">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">📱</div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Enhanced Visibility & Marketing
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                        Driving instructors also have the opportunity to appear live through the platform and to add links to their social media accounts. This allows students to watch your content, understand your teaching style, and build trust before booking lessons.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership & Training Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass-card p-4 sm:p-6 lg:p-8 xl:p-12 shadow-xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                FOR THEORY TEACHERS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Theory Teacher Membership & Training
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6">
                Information for those interested in becoming a theory teacher
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Free Training */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="text-3xl sm:text-4xl flex-shrink-0 mx-auto sm:mx-0">🎓</div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Free Full Week Training
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base">
                      We provide comprehensive free training for a full week to help you get started. This includes teaching methodologies, course materials, platform training, and best practices for delivering effective driving theory instruction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Membership Fee */}
              <div className="bg-gradient-to-br from-blue-50 to-primary-50 border-2 border-blue-300 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💳</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Membership Fee Structure
                  </h3>
                  
                  {/* Main Highlight */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-md border-2 border-primary-200">
                    <p className="text-xl sm:text-2xl font-bold text-primary-700 mb-2">
                      Pay Only When You Earn 2x Monthly
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 font-medium">
                      No upfront costs • Start teaching immediately
                    </p>
                  </div>

                  {/* Simple Example */}
                  <div className="bg-white/80 rounded-lg p-4 sm:p-5 border border-blue-200">
                    <p className="text-sm sm:text-base text-gray-700 font-semibold">
                      <span className="text-primary-600 font-bold">Example:</span> If membership is £100/month, you only pay when you earn £200+ that month.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact for Details */}
              <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📞</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Want to Know More?
                </h3>
                <p className="text-gray-700 font-medium mb-4 sm:mb-6 text-sm sm:text-base">
                  Contact us to learn more about the membership fee amount, training schedule, and all the details about joining our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="mailto:wahidi.lina@allinonedrive.com?subject=Teaching%20Position%20Inquiry"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Contact Us for Details
                  </a>
                  <a
                    href="https://wa.me/447908853486?text=Hi,%20I%20have%20questions%20about%20teaching%20with%20All%20In%20One%20Drive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl text-center border border-white/20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 font-medium leading-relaxed max-w-2xl mx-auto">
              Join All In One Drive and help shape the future of driving theory education. Together, we can empower learners and build a more accessible learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:wahidi.lina@allinonedrive.com?subject=Teaching%20Position%20Application"
                className="bg-white hover:bg-gray-100 text-primary-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Apply via Email
              </a>
              <a
                href="https://wa.me/447908853486?text=Hi,%20I'm%20interested%20in%20teaching%20with%20All%20In%20One%20Drive"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact via WhatsApp
              </a>
            </div>
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
                "Empowering independence. One lesson at a time."
              </p>
            </div>
            
            {/* Middle Column - Quick Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Home
                </Link>
                <Link to="/about" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
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
                <Link to="/teach" className="block text-primary-400 font-medium">
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
                  <span className="text-white/80 font-medium">wahidi.lina@allinonedrive.com</span>
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

export default TeachWithUs;

