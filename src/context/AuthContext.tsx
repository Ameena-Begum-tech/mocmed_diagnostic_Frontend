// Language: TypeScript (React)

import { createContext, useContext, useEffect, useState } from "react";

interface UserType {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserType | null;
  role: string | null;
  loading: boolean;
  loginUser: (data: any) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ⭐ important

  // Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (token && storedUser && storedRole) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }

    setLoading(false); // ⭐ auth check finished
  }, []);

  const loginUser = (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);

    setIsLoggedIn(true);
    setUser(data.user);
    setRole(data.user.role);
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        role,
        loading, // ⭐ expose loading
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};
