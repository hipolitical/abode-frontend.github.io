import React from 'react';
import { useSelector } from 'react-redux';
import Router from './router';
import './App.css';

function App() {
  const appTheme = useSelector(state => state.theme)
  console.log(appTheme)
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
