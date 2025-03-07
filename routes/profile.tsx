import { Head } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import ProtectedRoute from "../islands/ProtectedRoute.tsx";
import ProfileForm from "../islands/ProfileForm.tsx";
import ChangePasswordForm from "../islands/ChangePasswordForm.tsx";

export default function Profile() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  return (
    <ProtectedRoute>
      <Head>
        <title>Profile - MilestoneTracker</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <ProfileForm />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Security</h2>
              <button 
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {showPasswordForm ? "Cancel" : "Change Password"}
              </button>
            </div>
            
            {showPasswordForm && (
              <div className="mt-4">
                <ChangePasswordForm />
              </div>
            )}
            
            {!showPasswordForm && (
              <p className="text-gray-600">
                Manage your password and account security settings.
              </p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
