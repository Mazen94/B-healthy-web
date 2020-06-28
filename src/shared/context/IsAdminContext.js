import { createContext } from 'react';

export const IsAdminContext = createContext(
  localStorage.getItem('admin') === '0'
);
