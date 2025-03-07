import { Head } from "$fresh/runtime.ts";

export default function Goals() {
  return (
    <>
      <Head>
        <title>Goals - MilestoneTracker</title>
      </Head>
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Your Goals</h1>
          <button class="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Add New Goal
          </button>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 class="text-xl font-bold mb-4">2024 Goals</h2>
          <div class="flex items-center justify-between mb-2">
            <p>Progress</p>
            <p class="font-bold">4 / 10 Completed</p>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div class="bg-orange-500 h-2.5 rounded-full" style="width: 40%"></div>
          </div>
          
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 rounded-lg flex items-center">
              <input type="checkbox" class="mr-4 h-5 w-5 text-orange-500" checked />
              <div class="flex-1">
                <h3 class="font-medium">Read 15 books</h3>
                <p class="text-sm text-gray-600">Completed on March 1, 2024</p>
              </div>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg flex items-center">
              <input type="checkbox" class="mr-4 h-5 w-5 text-orange-500" checked />
              <div class="flex-1">
                <h3 class="font-medium">Visit 3 new countries</h3>
                <p class="text-sm text-gray-600">Completed on February 15, 2024</p>
              </div>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg flex items-center">
              <input type="checkbox" class="mr-4 h-5 w-5 text-orange-500" />
              <div class="flex-1">
                <h3 class="font-medium">Learn Spanish to B2 level</h3>
                <p class="text-sm text-gray-600">In progress - Currently at B1</p>
              </div>
              <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">In Progress</span>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg flex items-center">
              <input type="checkbox" class="mr-4 h-5 w-5 text-orange-500" />
              <div class="flex-1">
                <h3 class="font-medium">Complete photography course</h3>
                <p class="text-sm text-gray-600">Started on January 10, 2024</p>
              </div>
              <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">In Progress</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
