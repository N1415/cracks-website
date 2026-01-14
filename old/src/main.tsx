import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import './index.css';

// Lazy load pages for better performance
const FrasersPage = lazy(() => import('./frasers.tsx'));
const BimPage = lazy(() => import('./Bim.tsx'));
const ShangriLaPage = lazy(() => import('./ShangriLa.tsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.tsx'));
const AppPrivacyPolicy = lazy(() => import('./pages/AppPrivacyPolicy.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route 
            path="/frasers" 
            element={
              <Suspense 
                fallback={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <LoadingSpinner size="lg" text="Loading Fraser Suites Concepts..." />
                  </div>
                }
              >
                <FrasersPage />
              </Suspense>
            } 
          />
          <Route 
            path="/bim" 
            element={
              <Suspense 
                fallback={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <LoadingSpinner size="lg" text="Loading BIM Company..." />
                  </div>
                }
              >
                <BimPage />
              </Suspense>
            } 
          />
          <Route 
            path="/shangri-la" 
            element={
              <Suspense 
                fallback={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <LoadingSpinner size="lg" text="Loading Shangri-La..." />
                  </div>
                }
              >
                <ShangriLaPage />
              </Suspense>
            } 
          />
          <Route 
            path="/privacy-policy" 
            element={
              <Suspense 
                fallback={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <LoadingSpinner size="lg" text="Loading Privacy Policy..." />
                  </div>
                }
              >
                <PrivacyPolicy />
              </Suspense>
            } 
          />
          <Route 
            path="/app-privacy-policy" 
            element={
              <Suspense 
                fallback={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <LoadingSpinner size="lg" text="Loading App Privacy Policy..." />
                  </div>
                }
              >
                <AppPrivacyPolicy />
              </Suspense>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
