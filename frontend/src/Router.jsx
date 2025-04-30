import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home       from './pages/Home.jsx';
import WorkOrders from './pages/WorkOrders.jsx';
import Navbar     from './components/Navbar.jsx';
import Footer     from './components/Footer.jsx';

export default function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workorders" element={<WorkOrders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
