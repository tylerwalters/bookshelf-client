import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const GlobalContext = createContext({});

function GlobalProvider(props) {
  const [globalState, setGlobalState] = useState({ auth: {} });

  return (
    <GlobalContext.Provider value={[globalState, setGlobalState]}>
      {props.children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export { GlobalContext, GlobalProvider };
