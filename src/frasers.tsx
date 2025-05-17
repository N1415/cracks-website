import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FrasersConcepts from './components/frasers/concepts';

function FrasersPage() {
  return (
    <div className="font-lato">
      <Navbar />
      <FrasersConcepts />
      <Footer />
    </div>
  );
}

export default FrasersPage; 