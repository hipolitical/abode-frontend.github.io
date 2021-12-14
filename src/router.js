import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Accounts from './containers/Accounts';
import Users from './containers/Users';
import Company from './containers/Company';
import Navbar from './containers/Navbar';
import Signin from './containers/Signin';

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Signin />} />
        <Route exact path="/accounts" element={<Accounts />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/company-profile" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;