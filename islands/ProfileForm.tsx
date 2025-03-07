import { useEffect, useState } from "preact/hooks";
import { useAuth } from "./AuthContext.tsx";

interface ProfileData {
  username: string;
  email: string;
  full_name: string;
  bio: string;
  profile_image_url: string;
}

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    email: "",
    full_name: "",
    bio: "",
    profile_image_url: "",
  });

  useEffect(() => {
    // If we already have user data from auth context, use it
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        full_name: user.full_name || "",
        bio: user.bio || "",
        profile_image_url: user.profile_image_url || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setProfileData({
      ...profileData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      // Get the auth token from cookies
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
      const authToken = authCookie ? authCookie.trim().substring(5) : '';
      
      if (!authToken) {
        throw new Error("You are not authenticated. Please log in again.");
      }
      
      // Make an API call to update the profile
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          full_name: profileData.full_name,
          bio: profileData.bio,
          profile_image_url: profileData.profile_image_url,
        }),
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      // Update the profile data with the response
      const updatedData = await response.json();
      setProfileData({
        ...profileData,
        ...updatedData,
      });
      
      // Update the auth context with the new profile image
      if (user) {
        user.profile_image_url = profileData.profile_image_url;
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData.username) {
    return <div className="text-center py-4">Loading profile data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={profileData.username}
          disabled
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500">Username cannot be changed</p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profileData.email}
          disabled
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
      </div>

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={profileData.full_name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          value={profileData.bio}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label htmlFor="profile_image_url" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              id="profile_image_url"
              name="profile_image_url"
              value={profileData.profile_image_url}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="mt-1">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={profileData.profile_image_url || `https://ui-avatars.com/api/?name=${profileData.username || 'User'}&background=random`}
                alt="Profile preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://placehold.co/48x48/orange/white?text=User";
                }}
              />
            </div>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">Enter a URL for your profile image</p>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {success && (
        <div className="text-green-500 text-sm">Profile updated successfully!</div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
