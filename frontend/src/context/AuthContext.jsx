import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('english');

  const translations = {
    english: {
      login: 'Login',
      signup: 'Sign Up',
      dashboard: 'Dashboard',
      workers: 'Workers',
      households: 'Households',
      expenditure: 'Expenditure',
      personDays: 'Person Days',
      completionRate: 'Completion Rate',
      selectDistrict: 'Select District',
      workProvided: 'Work Provided',
      totalExpenditure: 'Total Expenditure'
    },
    hindi: {
      login: 'लॉगिन',
      signup: 'साइन अप',
      dashboard: 'डैशबोर्ड',
      workers: 'श्रमिक',
      households: 'परिवार',
      expenditure: 'व्यय',
      personDays: 'व्यक्ति दिवस',
      completionRate: 'पूर्णता दर',
      selectDistrict: 'जिला चुनें',
      workProvided: 'कार्य प्रदान',
      totalExpenditure: 'कुल व्यय'
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'hindi' : 'english');
  };

  const t = (key) => translations[language][key] || key;

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      signup,
      logout,
      language,
      toggleLanguage,
      t
    }}>
      {children}
    </AuthContext.Provider>
  );
};