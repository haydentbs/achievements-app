import { Head } from "$fresh/runtime.ts";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - MilestoneTracker</title>
      </Head>
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold mb-4">Your Progress</h2>
            <p class="mb-2">2024 Goals Completed: 4/10</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div class="bg-orange-500 h-2.5 rounded-full" style="width: 40%"></div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold mb-4">Quick Stats</h2>
            <div class="flex justify-between">
              <div>
                <p class="text-2xl font-bold">12</p>
                <p class="text-gray-600">In progress</p>
              </div>
              <div>
                <p class="text-2xl font-bold">28</p>
                <p class="text-gray-600">Total achieved</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Recent Milestones</h2>
            <a href="/achievements" class="text-orange-500 hover:underline">View all</a>
          </div>
          <p class="text-gray-500 text-center py-8">You haven't added any milestones yet.</p>
          <div class="text-center">
            <a href="/add-milestone" class="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Add Milestone
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
