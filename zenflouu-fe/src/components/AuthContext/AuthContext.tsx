"use client";
import { decodeToken } from "@/apis/userManagementService";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthToken {
  businessType: string;
}

interface AuthContextType {
  token: AuthToken | null;
  setToken: (token: AuthToken | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<AuthToken | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        try {
          const decodedToken = decodeToken(storedToken);
          setToken({ businessType: decodedToken.businessType });
        } catch (error) {
          console.error("Error decoding auth token:", error);
          localStorage.removeItem("authToken");
        }
      }
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
