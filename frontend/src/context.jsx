import React from 'react';

export const Store = React.createContext({
  isAuthenticated: 'false',
  setIsAuthenticated: () => {},
});
