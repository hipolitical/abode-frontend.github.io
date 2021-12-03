import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Accounts from './containers/Accounts';
import Navbar from './containers/Navbar';

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/accounts" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;