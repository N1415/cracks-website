import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import './index.css';

// Lazy load pages for better performance
const FrasersPage = lazy(() => import('./frasers.tsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.tsx'));

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
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
