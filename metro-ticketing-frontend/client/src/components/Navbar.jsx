import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ margin: '20px' }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
