import React from 'react';

const FrasersConcepts = () => {
  const iframeUrl = "https://frasers-ue1m9pk.gamma.site/frasers";

  return (
    <div className="w-full h-screen">
      <iframe 
        src={iframeUrl}
        className="w-full h-full border-none"
        title="Fraser Suites Concepts"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default FrasersConcepts;