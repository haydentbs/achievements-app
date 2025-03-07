import { useState } from "preact/hooks";
import { useAuth } from "./AuthContext.tsx";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("LoginForm: Attempting to log in with email:", email);
      await login(email, password);
      console.log("LoginForm: Login successful, redirect should happen via LoginRedirect");
      // Redirect will be handled by the LoginRedirect component
    } catch (err) {
      console.error("LoginForm: Login error:", err);
      setError(err.message || "Failed to login. Please check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Log In</h2>
      
      {error && (
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <input
              id="remember"
              type="checkbox"
              class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-700" for="remember">
              Remember me
            </label>
          </div>
          
          <a href="#" class="text-sm text-orange-500 hover:text-orange-700">
            Forgot password?
          </a>
        </div>
        
        <button
          type="submit"
          class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" class="text-orange-500 hover:text-orange-700 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
