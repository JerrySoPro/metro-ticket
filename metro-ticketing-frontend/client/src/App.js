import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  
import Register from './pages/Register';
import Login from './pages/Login';
import AddBalance from './pages/AddBalance';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-balance" element={<AddBalance />} />
    </Routes>
  );
}

export default App;
