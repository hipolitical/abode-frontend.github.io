import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Accounts from './containers/Accounts';
import MyAccounts from './containers/MyAccounts';
import Requests from './containers/Requests';
import AccountInfo from './containers/AccountInfo';
import AccountEdit from './containers/AccountEdit';
import Navbar from './shared/Navbar';
import Signin from './containers/Signin';

function RequireAuth({ children }) {
  let auth = localStorage.getItem('userId');
  let location = useLocation();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={
          <RequireAuth>
            <Accounts />
          </RequireAuth>
        } />
        <Route exact path="/login" element={<Signin />} />
        <Route exact path="/my-accounts" element={<MyAccounts />} />
        <Route exact path="/requests" element={<Requests />} />
        <Route exact path="/accounts/:id" element={<AccountInfo />} />
        <Route exact path="/accounts/:id/edit" element={<AccountEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;