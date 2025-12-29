import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export function AuthenticatingPage() {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const navigate = useNavigate();

  // extracting the temporary token from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tempToken = queryParams.get("tempToken");

  useEffect(() => {
    const validateToken = async () => {
      try {
        setIsloading(true);
        setError(null);
        const response = await fetch(`${API_URL}/auth/code/validate`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tempToken: tempToken,
          }),
        });
        console.log(response);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "Something went wrong while authenticating token"
          );
        }
        const token = result.token;
        const user = result.user;
        login(token, user);
        navigate("/dashboard");
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsloading(false);
      }
    };
    validateToken();
  }, [tempToken, login, navigate]);
  if (isLoading) {
    return <p>Authenticating...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
}
