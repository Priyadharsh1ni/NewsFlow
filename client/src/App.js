import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Containers/login';
import Register from './Containers/register';
import Dashboard from './Containers/dashboard';
import History from './Containers/history';
import Profile from './Containers/profile';
import PrivateRoute from './Components/privateRoute';
import Header from './Containers/header';

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ['/', '/register'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
