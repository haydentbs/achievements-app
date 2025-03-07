import { useState } from "preact/hooks";

export default function FeedTabs() {
  const [activeTab, setActiveTab] = useState("following");
  
  return (
    <div class="flex space-x-4 mb-6">
      <button 
        class={`px-4 py-2 rounded-full font-medium ${activeTab === "following" ? "bg-gray-100" : ""}`}
        onClick={() => setActiveTab("following")}
      >
        Following
      </button>
      <button 
        class={`px-4 py-2 rounded-full font-medium ${activeTab === "you" ? "bg-gray-100" : ""}`}
        onClick={() => setActiveTab("you")}
      >
        You
      </button>
      <button 
        class={`px-4 py-2 rounded-full font-medium ${activeTab === "discover" ? "bg-gray-100" : ""}`}
        onClick={() => setActiveTab("discover")}
      >
        Discover
      </button>
    </div>
  );
}
