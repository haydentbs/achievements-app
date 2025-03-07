import { Head } from "$fresh/runtime.ts";
import ProtectedRoute from "../islands/ProtectedRoute.tsx";
import ProfileForm from "../islands/ProfileForm.tsx";
import ChangePasswordForm from "../islands/ChangePasswordForm.tsx";

export default function Profile() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Profile - MilestoneTracker</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <ProfileForm />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
