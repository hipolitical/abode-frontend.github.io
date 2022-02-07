import React from 'react';
import { Navigate } from 'react-router-dom';
import SignInForm from './SignInForm';
import { useOktaAuth } from '@okta/okta-react';

const SignIn = () => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ?
    <Navigate to={{ pathname: '/' }}/> :
    <SignInForm />;
};

export default SignIn;
