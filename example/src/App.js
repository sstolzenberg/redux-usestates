import logo from './logo.svg';
import './App.css';

import { useRSwr }  from '@globalsw/redux-usestates';
//import { useRSwr }  from './ReduxStateMiddleware';
import { useStore } from 'react-redux'; 
import { useState } from 'react'; 

export const App = () => {
  const store = useStore();
  const [belvar, setBelVar] = useRSwr(store, 'belastungsfallNewMetaData');
  console.log("belvar", belvar)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>{belvar.var1}</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

