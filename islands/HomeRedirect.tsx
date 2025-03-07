import { useEffect } from "preact/hooks";
import { useAuth } from "./AuthContext.tsx";

export default function HomeRedirect() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);

  return null;
}
