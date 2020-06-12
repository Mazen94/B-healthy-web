import React, { useState } from 'react';
import './App.css';
import Route from './routes/Route';
import { AppBarContext } from './shared/context/AppBarContext';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <AppBarContext.Provider value={{ open, setOpen }}>
        <Route />
      </AppBarContext.Provider>
    </div>
  );
}

export default App;
