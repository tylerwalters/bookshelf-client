import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import { GlobalProvider } from '../shared/context/global';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes />
      </Router>
    </GlobalProvider>
  );
}

export default App;
