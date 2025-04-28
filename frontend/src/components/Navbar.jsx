import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();  // Helps highlight active link later

  const navStyle = {
    backgroundColor: '#1a1a1a',
    padding: '1rem 2rem',
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
    borderBottom: '2px solid #4CAF50',  // Green underline if active
  };

  return (
    <nav style={navStyle}>
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
    </nav>
  );
}

export default Navbar;
