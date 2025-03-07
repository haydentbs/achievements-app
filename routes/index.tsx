import { Head } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { useAuth } from "../islands/AuthContext.tsx";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (isClient && !isLoading) {
      if (isAuthenticated) {
        // Redirect to dashboard if authenticated
        window.location.href = "/dashboard";
      } else {
        // Redirect to login if not authenticated
        window.location.href = "/login";
      }
    }
  }, [isAuthenticated, isLoading, isClient]);

  return (
    <>
      <Head>
        <title>MilestoneTracker - Track Your Achievements</title>
        <meta name="description" content="Track personal milestones, share achievements, and compare progress with others." />
      </Head>
      <div class="flex justify-center items-center h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    </>
  );
}
