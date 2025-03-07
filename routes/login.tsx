import { Head } from "$fresh/runtime.ts";
import { h, Fragment } from "preact";
import LoginForm from "../islands/LoginForm.tsx";
import LoginRedirect from "../islands/LoginRedirect.tsx";

export default function Login() {
  return (
    <Fragment>
      <Head>
        <title>Login - MilestoneTracker</title>
      </Head>
      <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <h1 class="text-3xl font-extrabold text-gray-900">MilestoneTracker</h1>
            <p class="mt-2 text-sm text-gray-600">
              Track your achievements and share your progress
            </p>
          </div>
          
          <LoginForm />
          <LoginRedirect />
        </div>
      </div>
    </Fragment>
  );
}
