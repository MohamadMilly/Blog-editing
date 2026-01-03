import { Navigate } from "react-router";
import { useAuth } from "../contexts/authContext";

export function ProtectedRoute({ children }) {
  const { token, user } = useAuth();
  if (!token || !user) {
    return <Navigate to="/unauthorized" />;
  } else {
    return children;
  }
}
