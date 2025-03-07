import { useEffect } from "preact/hooks";
import { useAuth } from "./AuthContext.tsx";

export default function LoginRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // If authenticated and not loading, redirect to dashboard
    if (isAuthenticated && !isLoading) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, isLoading]);

  return null;
}
