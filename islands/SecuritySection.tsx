import { useState } from "preact/hooks";
import ChangePasswordForm from "./ChangePasswordForm.tsx";

export default function SecuritySection() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  return (
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
  );
}
