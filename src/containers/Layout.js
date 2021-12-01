import React from 'react';
import { useSelector } from 'react-redux';
import Router from '../router';
import Navbar from './Navbar';

function Layout() {
  const appTheme = useSelector(state => state.theme)
  console.log(appTheme)
  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
}

export default Layout;
