import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(() => sessionStorage.getItem("username") || "");
  const [token, setToken] = useState(() => sessionStorage.getItem("token") || "");
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem("apiKey") || "");
  const [avatarUrl, setAvatarUrl] = useState(() => sessionStorage.getItem("avatarUrl") || "");
  const [bio, setBio] = useState(() => sessionStorage.getItem("bio") || "");
  const [venueManager, setVenueManager] = useState(() => sessionStorage.getItem("venueManager") === "true");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedApiKey = sessionStorage.getItem("apiKey");
    setIsAuthenticated(!!storedToken && !!storedApiKey);
  }, []);

  const login = (data, apiKey, venueManager) => {
    const { accessToken, name, avatar, bio } = data;
    if (accessToken && apiKey && avatar) {
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("username", name);
      sessionStorage.setItem("apiKey", apiKey);
      sessionStorage.setItem("avatarUrl", avatar.url);
      sessionStorage.setItem("bio", bio);
      sessionStorage.setItem("venueManager", venueManager);
      setIsAuthenticated(true);
      setUsername(name);
      setToken(accessToken);
      setApiKey(apiKey);
      setAvatarUrl(avatar.url);
      setBio(bio);
      setVenueManager(venueManager);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUsername("");
    setToken("");
    setApiKey("");
    setAvatarUrl("");
    setBio("");
    setVenueManager(false);
  };

  const updateAvatar = (newAvatarUrl) => {
    sessionStorage.setItem("avatarUrl", newAvatarUrl);
    setAvatarUrl(newAvatarUrl);
  };

  const updateBio = (newBio) => {
    sessionStorage.setItem("bio", newBio);
    setBio(newBio);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        token,
        apiKey,
        avatarUrl,
        bio,
        venueManager,
        login,
        logout,
        updateAvatar,
        updateBio,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
