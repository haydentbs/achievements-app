import { JSX } from "preact";
import { useAuth } from "../islands/AuthContext.tsx";

export function Navbar(): JSX.Element {
  // Get auth context
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <nav class="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <span class="text-orange-500 mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
              <path d="M12 3L4.5 10.5H7.5V16.5H16.5V10.5H19.5L12 3Z" fill="currentColor"/>
            </svg>
          </span>
          <span class="text-xl font-bold">MilestoneTracker</span>
        </a>
      </div>
      
      <div class="hidden md:flex space-x-8">
        <button class="text-sm text-gray-600">
          {isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </button>
        {isAuthenticated ? (
          <>
            <a href="/dashboard" class="text-gray-800 hover:text-orange-500">Dashboard</a>
            <a href="/goals" class="text-gray-800 hover:text-orange-500">Goals</a>
            <a href="/achievements" class="text-gray-800 hover:text-orange-500">Achievements</a>
            <a href="/community" class="text-gray-800 hover:text-orange-500">Community</a>
          </>
        ) : (
          <>
            <a href="/login" class="text-gray-800 hover:text-orange-500">Login</a>
            <a href="/register" class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Sign Up</a>
          </>
        )}
      </div>
      
      <div class="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span class="text-gray-800 font-medium">{user?.username}</span>
            <button class="ml-4 text-gray-800 hover:text-orange-500" aria-label="Notifications">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
              </svg>
            </button>
            <div class="relative flex items-center">
              <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src={user?.profile_image_url || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`}
                  alt="User profile"
                  class="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/40x40/orange/white?text=User";
                  }}
                />
              </div>
              <button 
                onClick={logout}
                class="ml-2 text-sm text-gray-600 hover:text-orange-500"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <a href="/login" class="text-gray-800 hover:text-orange-500">Login</a>
            <a href="/register" class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Sign Up</a>
          </>
        )}
      </div>
    </nav>
  );
}
