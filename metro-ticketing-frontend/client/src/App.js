import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { jwtDecode } from 'jwt-decode'; 


const Home = () => {
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;
  console.log("Decoded User:", user); 

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>🚇 Metro Ticket App is Running!</h1>
      <p>Welcome to the Metro Ticket System.</p>
      {user ? (
        <div>
          <h3>Logged in as: <strong>{user.role}</strong></h3>
          <p>User ID: {user._id}</p>
        </div>
      ) : (
        <p><em>You are not logged in.</em></p>
      )}
    </div>
  );
}
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
