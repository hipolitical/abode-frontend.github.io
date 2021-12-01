import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const appTheme = useSelector(state => state.theme)
  console.log(appTheme)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
