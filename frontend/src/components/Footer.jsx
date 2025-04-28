function Footer() {
    const footerWrapperStyle = {
      background: "#1a1a1a",
      padding: "1rem 0",
      color: "white",
      textAlign: "center",
    };
  
    const containerStyle = {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
    };
  
    return (
      <footer style={footerWrapperStyle}>
        <div style={containerStyle}>
          © 2025 Work Orders App
        </div>
      </footer>
    );
  }
  
  export default Footer;
  