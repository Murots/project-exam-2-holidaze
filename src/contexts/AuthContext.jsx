import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(() => sessionStorage.getItem("username") || "");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (data) => {
    const { accessToken, name } = data;
    if (accessToken) {
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("username", name);
      setIsAuthenticated(true);
      setUsername(name);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  return <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
