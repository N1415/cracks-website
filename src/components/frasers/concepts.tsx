import React, { useState } from 'react';

const FrasersConcepts = () => {
  const [displayMode, setDisplayMode] = useState<'iframe' | 'link'>('iframe');
  const iframeUrl = "https://frasers-ue1m9pk.gamma.site/frasers";

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Fraser Suites Concepts</h1>
        <div className="space-x-2">
          <button 
            onClick={() => setDisplayMode('iframe')}
            className={`px-3 py-1 rounded ${displayMode === 'iframe' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Embedded View
          </button>
          <button 
            onClick={() => setDisplayMode('link')}
            className={`px-3 py-1 rounded ${displayMode === 'link' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Direct Link
          </button>
        </div>
      </div>
      
      <div className="flex-grow relative">
        {displayMode === 'iframe' ? (
          <iframe 
            src={iframeUrl}
            className="absolute top-0 left-0 w-full h-full border-none"
            title="Fraser Suites Concepts"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Direct Access Link</h2>
            <p className="mb-4">If the embedded view isn't working, you can access the content directly using the link below:</p>
            <a 
              href={iframeUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Open Fraser Suites Concepts
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrasersConcepts;