import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserType = { name: string; email: string; password: string };

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = (name: string, email: string, password: string) => {
    if (name && email && password) {
      console.log("login");
      setIsAuthenticated(true);
      setUser({ name, email, password });
      navigate("/");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({ name: "", email: "", password: "" });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
