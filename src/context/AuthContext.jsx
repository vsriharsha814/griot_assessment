import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "griot_auth";

const getInitialAuth = () => {
  try {
    const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) return null;
    return JSON.parse(rawValue);
  } catch (error) {
    console.error("Failed to parse auth storage:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuth);

  const login = (payload) => {
    setAuth(payload);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
