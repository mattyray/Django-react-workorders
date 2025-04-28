function Footer() {
    const footerStyle = {
      background: "#1a1a1a",
      padding: "1rem",
      color: "white",
      textAlign: "center",
    };
  
    const containerStyle = {
      maxWidth: '1200px',
      margin: '0 auto',
    };
  
    return (
      <footer style={footerStyle}>
        <div style={containerStyle}>
          © 2025 Work Orders App
        </div>
      </footer>
    );
  }
  
  export default Footer;
  