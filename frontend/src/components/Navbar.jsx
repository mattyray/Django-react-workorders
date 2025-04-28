import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#1a1a1a',
    padding: '1rem 2rem',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    <nav style={navStyle}>
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
