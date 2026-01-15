import React from 'react';
import FrasersConcepts from './components/frasers/concepts';

function FrasersPage() {
  // Set the document title
  React.useEffect(() => {
    document.title = "Fraser Suites Concepts";
    
    // Remove any body classes that might be coming from the main site
    document.body.className = "";
    
    // Ensure full height of the page
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden"; // Prevent scrolling

    return () => {
      // Cleanup when component unmounts
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 9999 
      }}>
        <FrasersConcepts />
      </div>
    </>
  );
}

export default FrasersPage; 