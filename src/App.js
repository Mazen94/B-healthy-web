import React, { useState } from 'react';
import './App.css';
import Route from './routes/Route';
import { AppBarContext } from './shared/context/AppBarContext';
import { IsActivateContext } from './shared/context/IsActivateContext';
import { IsAdminContext } from './shared/context/IsAdminContext';

function App() {
  const [open, setOpen] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin') === '0');
  return (
    <div className="App">
      <AppBarContext.Provider value={{ open, setOpen }}>
        <IsActivateContext.Provider value={{ isActivate, setIsActivate }}>
          <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <Route />
          </IsAdminContext.Provider>
        </IsActivateContext.Provider>
      </AppBarContext.Provider>
    </div>
  );
}

export default App;
