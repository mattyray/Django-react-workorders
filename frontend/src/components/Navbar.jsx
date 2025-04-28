import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navWrapperStyle = {
    backgroundColor: '#1a1a1a',
    padding: '1rem 0',   // <-- no side padding here
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',  // <-- now inside container
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '1rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    paddingBottom: '2px',
    borderBottom: '2px solid transparent',
  };

  const activeLinkStyle = {
    ...linkStyle,
    borderBottom: '2px solid #4CAF50',
  };

  return (
    <nav style={navWrapperStyle}>
      <div style={containerStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          WorkOrdersApp
        </div>
        <div>
          <Link
            to="/"
            style={location.pathname === '/' ? activeLinkStyle : linkStyle}
          >
            Home
          </Link>
          <Link
            to="/workorders"
            style={location.pathname === '/workorders' ? activeLinkStyle : linkStyle}
          >
            Work Orders
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
