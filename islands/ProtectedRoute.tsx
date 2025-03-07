import { useEffect, useState } from "preact/hooks";
import { useAuth } from "./AuthContext.tsx";

interface ProtectedRouteProps {
  children: preact.ComponentChildren;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // If not authenticated and not loading, redirect to login
    if (isClient && !isAuthenticated && !isLoading) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading, isClient]);

  // Show loading state while checking authentication
  if (isLoading || !isClient) {
    return (
      <div class="flex justify-center items-center h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // If authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
}
