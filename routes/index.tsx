import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>MilestoneTracker - Track Your Achievements</title>
        <meta name="description" content="Track personal milestones, share achievements, and compare your progress" />
      </Head>
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-2/3">
          <h1 class="text-3xl font-bold mb-6">Achievement Feed</h1>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex space-x-4 mb-6">
              <button class="px-4 py-2 bg-gray-100 rounded-full font-medium">Following</button>
              <button class="px-4 py-2 rounded-full font-medium">You</button>
              <button class="px-4 py-2 rounded-full font-medium">Discover</button>
            </div>
            <div class="text-center py-8 text-gray-500">
              Start following people to see their achievements here!
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3">
          <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 class="text-2xl font-bold mb-4">Your Progress</h2>
            <p class="mb-2">2024 Goals Completed</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div class="bg-orange-500 h-2.5 rounded-full" style="width: 40%"></div>
            </div>
            <div class="flex justify-between">
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <span class="block text-2xl font-bold">12</span>
                <span class="text-gray-600">In progress</span>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <span class="block text-2xl font-bold">28</span>
                <span class="text-gray-600">Total achieved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
