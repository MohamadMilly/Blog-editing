import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";
import Spinner from "../components/Spinner";

const API_URL = import.meta.env.VITE_API_URL;

export function AuthenticatingPage() {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const { login, token } = useAuth();

  const navigate = useNavigate();

  // extracting the temporary token from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tempToken = queryParams.get("tempToken");

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        return navigate("/dashboard");
      }
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
        navigate("/unauthorized");
        console.error(err);
      } finally {
        setIsloading(false);
      }
    };
    validateToken();
  }, [tempToken, login, navigate, token]);
  if (isLoading) {
    return (
      <main className="grid min-h-full place-items-center bg-slate-950 px-6 py-24 sm:py-32 lg:px-8 text-gray-200">
        <div className="flex flex-col gap-2">
          <Spinner />
          <span>Authorizing...</span>
        </div>
      </main>
    );
  }
}
