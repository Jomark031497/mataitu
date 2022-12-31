import useAuth from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const AuthRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (user) return <Navigate to="/" />;

  return <>{children}</>;
};

export default AuthRoute;
