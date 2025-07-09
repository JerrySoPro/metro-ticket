import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopLayout from './components/TopLayout';

// Import your existing pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBalance from './pages/AddBalance';
import TopupHistory from './pages/TopupHistory';
import Profile from './pages/Profile';
import TrainStatus from './pages/TrainStatus';
import FareCalculator from './pages/FareCalculator';
import EntryPass from './pages/EntryPass';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      
        <TopLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-balance" element={<AddBalance />} />
            <Route path="/topup-history" element={<TopupHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/train-status" element={<TrainStatus />} />
            <Route path="/fare-calculator" element={<FareCalculator />} />
            <Route path="/entry-pass" element={<EntryPass />} />
          </Routes>
        </TopLayout>
      
    </UserProvider>
  );
}

export default App;