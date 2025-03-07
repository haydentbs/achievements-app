import { Head } from "$fresh/runtime.ts";

export default function AddMilestone() {
  return (
    <>
      <Head>
        <title>Add Milestone - MilestoneTracker</title>
      </Head>
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Add New Milestone</h1>
        
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <form>
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2" for="title">
                Milestone Title
              </label>
              <input
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                id="title"
                placeholder="What did you achieve?"
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2" for="category">
                Category
              </label>
              <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                id="category"
              >
                <option value="">Select a category</option>
                <option value="language">Language</option>
                <option value="travel">Travel</option>
                <option value="reading">Reading</option>
                <option value="skills">Skills</option>
                <option value="fitness">Fitness</option>
                <option value="career">Career</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2" for="description">
                Description
              </label>
              <textarea
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                id="description"
                rows={4}
                placeholder="Tell us more about your achievement..."
              ></textarea>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">
                Privacy
              </label>
              <div class="flex space-x-4">
                <label class="flex items-center">
                  <input type="radio" name="privacy" value="public" class="mr-2" checked />
                  <span>Public</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="privacy" value="friends" class="mr-2" />
                  <span>Friends Only</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="privacy" value="private" class="mr-2" />
                  <span>Private</span>
                </label>
              </div>
            </div>
            
            <div class="flex justify-end">
              <a href="/" class="px-4 py-2 text-gray-600 mr-2">Cancel</a>
              <button
                type="submit"
                class="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Save Milestone
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
