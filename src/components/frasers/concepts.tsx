import React from 'react';

const FrasersConcepts = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-grow relative">
        <iframe 
          src="https://frasers-ue1m9pk.gamma.site/frasers"
          className="absolute top-0 left-0 w-full h-full border-none"
          title="Fraser Suites Concepts"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default FrasersConcepts;