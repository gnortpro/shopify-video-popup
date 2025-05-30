export interface Story {
  id: number;
  username: string;
  avatar: string;
  videoUrl?: string;
  mediaType: IMediaType;
  thumbnailUrl?: string;
  hasNewStory?: boolean;
}

export interface StoryItemProps {
  story: Story;
  onClick: (story: Story) => void;
}

export interface StoriesCarouselProps {
  stories?: Story[];
  onStoryClick?: (id: number) => void;
}

export type IMediaType = "image" | "video";
