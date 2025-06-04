import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';

const Layout = () => {
  return (
    <div style={{ backgroundColor: '#edf3f7', minHeight: '100vh' }}>
      <Header />
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
