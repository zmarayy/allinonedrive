import React from 'react';

function InstallButton({ deferredPrompt, setDeferredPrompt }) {
  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={handleInstall}
        className="glass-card w-full py-4 px-6 flex items-center justify-center space-x-3 text-lg font-semibold text-gray-900 hover:bg-white/20 transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span>Install App</span>
      </button>
    </div>
  );
}

export default InstallButton;

