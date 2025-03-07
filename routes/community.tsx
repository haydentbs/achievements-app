import { Head } from "$fresh/runtime.ts";

export default function Community() {
  return (
    <>
      <Head>
        <title>Community - MilestoneTracker</title>
      </Head>
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Community</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold mb-4">Leaderboards</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    <img 
                      src="https://ui-avatars.com/api/?name=Sarah+Chen&background=random" 
                      alt="Sarah Chen"
                      class="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/40x40/orange/white?text=SC";
                      }}
                    />
                  </div>
                  <div>
                    <h3 class="font-medium">Sarah Chen</h3>
                    <p class="text-sm text-gray-500">42 Milestones</p>
                  </div>
                </div>
                <span class="text-xl font-bold text-orange-500">1</span>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    <img 
                      src="https://ui-avatars.com/api/?name=Michael+Rodriguez&background=random" 
                      alt="Michael Rodriguez"
                      class="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/40x40/orange/white?text=MR";
                      }}
                    />
                  </div>
                  <div>
                    <h3 class="font-medium">Michael Rodriguez</h3>
                    <p class="text-sm text-gray-500">38 Milestones</p>
                  </div>
                </div>
                <span class="text-xl font-bold text-orange-500">2</span>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    <img 
                      src="https://ui-avatars.com/api/?name=Alex+Johnson&background=random" 
                      alt="Alex Johnson"
                      class="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/40x40/orange/white?text=AJ";
                      }}
                    />
                  </div>
                  <div>
                    <h3 class="font-medium">Alex Johnson</h3>
                    <p class="text-sm text-gray-500">35 Milestones</p>
                  </div>
                </div>
                <span class="text-xl font-bold text-orange-500">3</span>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-orange-200">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    <img 
                      src="https://ui-avatars.com/api/?name=You&background=orange" 
                      alt="You"
                      class="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/40x40/orange/white?text=You";
                      }}
                    />
                  </div>
                  <div>
                    <h3 class="font-medium">You</h3>
                    <p class="text-sm text-gray-500">28 Milestones</p>
                  </div>
                </div>
                <span class="text-xl font-bold text-orange-500">7</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold mb-4">Popular Challenges</h2>
            <div class="space-y-4">
              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-bold">30-Day Reading Challenge</h3>
                  <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">245 Participants</span>
                </div>
                <p class="text-gray-600 mb-3">Read for at least 30 minutes every day for a month</p>
                <button class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full">
                  Join Challenge
                </button>
              </div>
              
              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-bold">Language Learning Sprint</h3>
                  <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">189 Participants</span>
                </div>
                <p class="text-gray-600 mb-3">Learn 500 new words in a language of your choice</p>
                <button class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full">
                  Join Challenge
                </button>
              </div>
              
              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-bold">Photography Portfolio</h3>
                  <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">132 Participants</span>
                </div>
                <p class="text-gray-600 mb-3">Create a portfolio of 20 high-quality photographs</p>
                <button class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full">
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-bold mb-4">Find People to Follow</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 border border-gray-200 rounded-lg text-center">
              <div class="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                <img 
                  src="https://ui-avatars.com/api/?name=Emma+Wilson&background=random&size=64" 
                  alt="Emma Wilson"
                  class="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/64x64/orange/white?text=EW";
                  }}
                />
              </div>
              <h3 class="font-medium">Emma Wilson</h3>
              <p class="text-sm text-gray-500 mb-3">31 Milestones</p>
              <button class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full">
                Follow
              </button>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg text-center">
              <div class="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                <img 
                  src="https://ui-avatars.com/api/?name=David+Kim&background=random&size=64" 
                  alt="David Kim"
                  class="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/64x64/orange/white?text=DK";
                  }}
                />
              </div>
              <h3 class="font-medium">David Kim</h3>
              <p class="text-sm text-gray-500 mb-3">27 Milestones</p>
              <button class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full">
                Follow
              </button>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg text-center">
              <div class="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                <img 
                  src="https://ui-avatars.com/api/?name=Sophia+Martinez&background=random&size=64" 
                  alt="Sophia Martinez"
                  class="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/64x64/orange/white?text=SM";
                  }}
                />
              </div>
              <h3 class="font-medium">Sophia Martinez</h3>
              <p class="text-sm text-gray-500 mb-3">24 Milestones</p>
              <button class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
