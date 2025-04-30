  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from './pages/Home';
  import WorkOrders from './pages/WorkOrders';
  import Navbar from './components/Navbar';
  import Footer from './components/Footer';

  function AppRouter() {
    return (
      <Router>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <div style={{ flex: "1" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workorders" element={<WorkOrders />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }

  export default AppRouter;
