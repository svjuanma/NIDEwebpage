import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);
export const AuthProvider = ({ children }: any) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || null;
  });

  const login = (id: string) => {
    setUserId(id);
    localStorage.setItem('userId', id); 
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId'); 
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);