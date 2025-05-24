import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home                    from './pages/Home.jsx';
import WorkOrders              from './pages/WorkOrders.jsx';
import CreateWorkOrderPage     from './pages/CreateWorkOrderPage.jsx';
import WorkOrderDetailPage     from './pages/WorkOrderDetailPage.jsx';
import EditWorkOrderPage       from './pages/EditWorkOrderPage.jsx';
import NotFound                from './pages/NotFound.jsx'; // ✅ New import
import Navbar                  from './components/Navbar.jsx';
import Footer                  from './components/Footer.jsx';

export default function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workorders" element={<WorkOrders />} />
            <Route path="/workorders/new" element={<CreateWorkOrderPage />} />
            <Route path="/workorders/:id" element={<WorkOrderDetailPage />} />
            <Route path="/workorders/:id/edit" element={<EditWorkOrderPage />} />
            <Route path="*" element={<NotFound />} /> {/* ✅ Replaces Navigate */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
