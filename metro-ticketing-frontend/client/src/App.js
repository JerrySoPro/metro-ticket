import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBalance from './pages/AddBalance';
import TopupHistory from './pages/TopupHistory';
import Profile from './pages/Profile';
import TrainStatus from './pages/TrainStatus';
import FareCalculator from './pages/FareCalculator';
import EntryPass from './pages/EntryPass';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/add-balance" element={<Layout><AddBalance /></Layout>} />
      <Route path="/topup-history" element={<Layout><TopupHistory /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/train-status" element={<Layout><TrainStatus /></Layout>} />
      <Route path="/fare-calculator" element={<Layout><FareCalculator /></Layout>} />
      <Route path="/entry-pass" element={<Layout><EntryPass /></Layout>} />

    </Routes>
  );
}

export default App;
