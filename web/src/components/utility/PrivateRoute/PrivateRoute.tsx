import useAuth from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default PrivateRoute;
