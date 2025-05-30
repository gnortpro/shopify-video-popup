export type IMediaType = "image" | "video";

export interface IStory {
  id: number;
  username: string;
  avatar: string;
  videoUrl?: string;
  mediaType: IMediaType;
  thumbnailUrl?: string;
  hasNewStory?: boolean;
}

export interface IStoryItemProps {
  story: IStory;
  onClick: (story: IStory) => void;
}

export interface IStoriesCarouselProps {
  stories?: IStory[];
  onStoryClick?: (id: number) => void;
}
