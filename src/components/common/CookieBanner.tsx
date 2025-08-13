import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    
    // Initialize analytics if accepted
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setShowBanner(false);
  };

  const savePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(savedPreferences));
    setShowBanner(false);
    setShowSettings(false);

    // Update analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': preferences.analytics ? 'granted' : 'denied',
        'ad_storage': preferences.marketing ? 'granted' : 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {!showSettings ? (
          // Main banner
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">We use cookies</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your experience, analyze site traffic, and improve our services. 
                  You can manage your preferences or learn more in our{' '}
                  <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <Settings size={14} />
                Settings
              </button>
              <button
                onClick={acceptNecessaryOnly}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Settings panel
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield size={20} />
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Required for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-3 border border-gray-200 rounded">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-3 border border-gray-200 rounded">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Used to deliver personalized advertisements and track campaign performance.
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePreferences}
                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
