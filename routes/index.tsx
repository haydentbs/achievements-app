import { Head } from "$fresh/runtime.ts";
import { MilestoneCard } from "../components/MilestoneCard.tsx";
import FeedTabs from "../islands/FeedTabs.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>MilestoneTracker - Track Your Achievements</title>
        <meta name="description" content="Track personal milestones, share achievements, and compare your progress" />
      </Head>
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-2/3">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">Achievement Feed</h1>
            <a href="/add-milestone" class="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Add Milestone
            </a>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
            <FeedTabs />
            
            <MilestoneCard 
              author="Alex Johnson"
              time="Today at 2:30 PM"
              category="Language"
              title="Reached B1 Level in Spanish"
              description="After 6 months of consistent practice, I've reached intermediate level!"
              badgeTitle="Language Enthusiast"
              badgeDescription="Learn the basics of 3 different languages"
              likes={24}
              comments={3}
            />
            
            <div class="text-center py-4 text-gray-500">
              No more achievements to show
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3">
          <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 class="text-2xl font-bold mb-4">Your Progress</h2>
            <div class="flex items-center justify-between mb-2">
              <p>2024 Goals Completed</p>
              <p class="font-bold">4 / 10</p>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div class="bg-orange-500 h-2.5 rounded-full" style="width: 40%"></div>
            </div>
            <div class="flex justify-between">
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="flex items-center justify-center mb-2 text-orange-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L6.5 12.5H17.5L12 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span class="block text-2xl font-bold">12</span>
                <span class="text-gray-600">In progress</span>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="flex items-center justify-center mb-2 text-orange-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span class="block text-2xl font-bold">28</span>
                <span class="text-gray-600">Total achieved</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-2xl font-bold mb-4">Recent Milestones</h2>
            
            <div class="mb-4 p-4 bg-orange-50 rounded-lg">
              <div class="flex items-center">
                <span class="text-orange-500 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22ZM12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM10.5 17L5.5 12L7 10.5L10.5 14L17 7.5L18.5 9L10.5 17Z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <h3 class="font-bold">World Explorer</h3>
                  <p class="text-sm text-gray-600">Visited 10 countries</p>
                </div>
              </div>
            </div>
            
            <div class="mb-4 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center">
                <span class="text-blue-500 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <h3 class="font-bold">Bookworm</h3>
                  <p class="text-sm text-gray-600">Read 15 books this year</p>
                </div>
              </div>
            </div>
            
            <div class="p-4 bg-green-50 rounded-lg">
              <div class="flex items-center">
                <span class="text-green-500 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <h3 class="font-bold">Skill Master</h3>
                  <p class="text-sm text-gray-600">Completed advanced photography course</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
