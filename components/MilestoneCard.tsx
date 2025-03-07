import { JSX } from "preact";

interface MilestoneCardProps {
  author: string;
  time: string;
  category: string;
  title: string;
  description: string;
  badgeTitle?: string;
  badgeDescription?: string;
  likes?: number;
  comments?: number;
}

export function MilestoneCard({
  author,
  time,
  category,
  title,
  description,
  badgeTitle,
  badgeDescription,
  likes = 0,
  comments = 0,
}: MilestoneCardProps): JSX.Element {
  return (
    <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
          <div>
            <h3 class="font-medium">{author}</h3>
            <p class="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        <button class="text-gray-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
            <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor"/>
            <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <div class="mb-4">
        <span class="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-3">
          {category}
        </span>
        <h2 class="text-xl font-bold mb-2">{title}</h2>
        <p class="text-gray-700">{description}</p>
      </div>
      
      {badgeTitle && (
        <div class="bg-orange-50 p-4 rounded-lg mb-4">
          <div class="flex items-center">
            <span class="text-orange-500 mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                <path d="M19.5 9.5L17.5 6L14 4L10 4L6.5 6L4.5 9.5L4.5 14.5L6.5 18L10 20L14 20L17.5 18L19.5 14.5L19.5 9.5Z" fill="currentColor"/>
              </svg>
            </span>
            <div>
              <h3 class="font-bold">Milestone Achieved! {badgeTitle}</h3>
              <p class="text-sm text-gray-600">{badgeDescription}</p>
            </div>
          </div>
        </div>
      )}
      
      <div class="flex items-center space-x-4 text-gray-500">
        <button class="flex items-center space-x-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
          </svg>
          <span>{likes}</span>
        </button>
        <button class="flex items-center space-x-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="currentColor"/>
          </svg>
          <span>{comments}</span>
        </button>
      </div>
    </div>
  );
}
