import React from 'react';
import BottomNavbar from '../components/BottomNavbar';

function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">FAQ</h1>
        <div className="glass-card p-8 text-center">
          <p className="text-gray-600 font-medium">FAQ section coming soon!</p>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default FAQ;

