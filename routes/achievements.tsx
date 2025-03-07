import { Head } from "$fresh/runtime.ts";
import { MilestoneCard } from "../components/MilestoneCard.tsx";

export default function Achievements() {
  return (
    <>
      <Head>
        <title>Achievements - MilestoneTracker</title>
      </Head>
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Your Achievements</h1>
          <a href="/add-milestone" class="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Add Milestone
          </a>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">All Milestones</h2>
            <div class="flex space-x-2">
              <select class="px-3 py-2 border border-gray-300 rounded-md">
                <option>All Categories</option>
                <option>Language</option>
                <option>Travel</option>
                <option>Reading</option>
                <option>Skills</option>
              </select>
              <select class="px-3 py-2 border border-gray-300 rounded-md">
                <option>Most Recent</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
          
          <MilestoneCard 
            author="You"
            time="Today at 2:30 PM"
            category="Language"
            title="Reached B1 Level in Spanish"
            description="After 6 months of consistent practice, I've reached intermediate level!"
            badgeTitle="Language Enthusiast"
            badgeDescription="Learn the basics of 3 different languages"
            likes={24}
            comments={3}
          />
          
          <MilestoneCard 
            author="You"
            time="March 1, 2024"
            category="Reading"
            title="Finished 15th Book This Year"
            description="Just completed 'The Midnight Library' by Matt Haig. Great read!"
            badgeTitle="Bookworm"
            badgeDescription="Read 15 books this year"
            likes={18}
            comments={5}
          />
          
          <MilestoneCard 
            author="You"
            time="February 15, 2024"
            category="Travel"
            title="Visited Japan - 10th Country!"
            description="Explored Tokyo, Kyoto, and Osaka. Amazing experience!"
            badgeTitle="World Explorer"
            badgeDescription="Visited 10 countries"
            likes={32}
            comments={7}
          />
        </div>
      </div>
    </>
  );
}
