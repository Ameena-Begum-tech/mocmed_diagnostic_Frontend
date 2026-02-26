import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  name: string;
  username: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
  role: string;
}

interface AuthType {
  isLoggedIn: boolean;
  role: string | null;
  user: User | null;
  login: (token: string, role: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Fetch user from backend
  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setRole(res.data.role);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user");
      logoutUser();
    }
  };

  // On page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser(token);
    }
  }, []);

  const login = async (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    await fetchUser(token);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, user, login, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
