import { Head } from "$fresh/runtime.ts";
import RegisterForm from "../islands/RegisterForm.tsx";
import { useAuth } from "../islands/AuthContext.tsx";
import { useEffect, useState } from "preact/hooks";

export default function Register() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // If authenticated and not loading, redirect to dashboard
    if (isClient && isAuthenticated && !isLoading) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, isLoading, isClient]);

  return (
    <>
      <Head>
        <title>Register - MilestoneTracker</title>
      </Head>
      <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <h1 class="text-3xl font-extrabold text-gray-900">MilestoneTracker</h1>
            <p class="mt-2 text-sm text-gray-600">
              Create an account to start tracking your milestones
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
