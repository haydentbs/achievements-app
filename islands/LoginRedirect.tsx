import { useEffect, useState } from "preact/hooks";
import { useAuth } from "./AuthContext.tsx";

export default function LoginRedirect() {
  const { isAuthenticated, isLoading } = useAuth();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    // Debug logging
    console.log("LoginRedirect state:", { isAuthenticated, isLoading, redirected });
    
    // If authenticated, not loading, and not already redirected, redirect to dashboard
    if (isAuthenticated && !isLoading && !redirected) {
      console.log("LoginRedirect: User is authenticated, redirecting to dashboard");
      setRedirected(true);
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, isLoading, redirected]);

  return null;
}
