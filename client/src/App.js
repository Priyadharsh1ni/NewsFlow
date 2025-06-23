import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Containers/login';
import Dashboard from './Containers/dashboard';
import Register from './Containers/register';
import History from './Containers/history';
import Header from './Containers/header';
import Profile from './Containers/profile';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;