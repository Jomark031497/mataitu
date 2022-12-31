import loginHandler from "@/features/auth/api/loginHandler";
import logoutHandler from "@/features/auth/api/logoutHandler";
import meHandler from "@/features/auth/api/meHandler";
import signupHandler from "@/features/auth/api/signupHandler";
import { LoginInputs, SignUpInputs, UserType } from "@/features/auth/auth.schema";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: UserType | null;
  handleLogin: (payload: LoginInputs) => Promise<void>;
  handleSignup: (payload: SignUpInputs) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogin = async (payload: LoginInputs) => {
    try {
      const user = await loginHandler(payload);
      setUser(user);
      navigate("/");
    } catch (error) {
      throw new Error("Something went wrong", { cause: error });
    }
  };

  const handleSignup = async (payload: SignUpInputs) => {
    try {
      const user = await signupHandler(payload);
      setUser(user);
      navigate("/");
    } catch (error) {
      throw new Error("Something went wrong", { cause: error });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutHandler();
      setUser(null);
    } catch (error) {
      throw new Error("Something went wrong", { cause: error });
    }
  };

  useEffect(() => {
    meHandler()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setInitialLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
