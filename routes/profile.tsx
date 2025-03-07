import { Head } from "$fresh/runtime.ts";
import ProtectedRoute from "../islands/ProtectedRoute.tsx";
import ProfileForm from "../islands/ProfileForm.tsx";
import SecuritySection from "../islands/SecuritySection.tsx";

export default function Profile() {
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
          
          <SecuritySection />
        </div>
      </div>
    </ProtectedRoute>
  );
}
