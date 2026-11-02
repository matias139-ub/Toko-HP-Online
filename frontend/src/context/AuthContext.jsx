import { createContext, useContext, useState } from "react";
import { identifyLogRocketUser } from "../monitoring";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  function saveLogin(data) {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    identifyLogRocketUser(data.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, saveLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}