import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Regulamin from './pages/Regulamin';
import CinematicIntro from './components/CinematicIntro';

function Home() {
  const [, setIntroDone] = useState(false);

  return (
    <>
      <CinematicIntro onComplete={() => setIntroDone(true)} />
      <Navbar />
      <Hero />
      <FAQ />
      <Gallery />
      <CTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regulamin" element={<Regulamin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
