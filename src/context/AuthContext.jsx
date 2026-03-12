import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize the mock "database" of users
  useEffect(() => {
    // Check if we already have our mock users table in local storage
    const usersDB = localStorage.getItem('usersDB');
    if (!usersDB) {
      // Pull secure default values from the .env file
      const adminEmail = import.meta.env.VITE_MOCK_USER_EMAIL || 'admin@test.com';
      const adminPass = import.meta.env.VITE_MOCK_USER_PASSWORD || 'password123';
      const adminName = import.meta.env.VITE_MOCK_USER_NAME || 'Site Engineer';

      // If not, "register" the default test user and save to local storage
      const defaultUsers = {
        [adminEmail]: { password: adminPass, name: adminName }
      };
      localStorage.setItem('usersDB', JSON.stringify(defaultUsers));
    }

    // Check if the user is currently logged in from a previous session
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedAuth === 'true' && storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
       
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // 1. Fetch our "database" from the browser
    const usersDB = JSON.parse(localStorage.getItem('usersDB') || '{}');

    // 2. Check if the user exists in our database
    const registeredUser = usersDB[email];

    // 3. Verify the password
    if (registeredUser && registeredUser.password === password) {
      setIsAuthenticated(true);
      const userInfo = { email, name: registeredUser.name };
      setUser(userInfo);
      
      // Save session
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      return true;
    }
    
    // Login failed
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

