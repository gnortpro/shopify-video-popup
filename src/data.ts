export type IMediaType = "image" | "video";

export interface IStoriesCarouselProps {
  stories: IVideo[];
  onStoryClick?: (id: number) => void;
}

export interface IStoryItemProps {
  story: IVideo;
  onClick: (story: IVideo) => void;
}

export interface IProductMediaType {
  type: IMediaType;
  url: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  mediaFiles: IProductMediaType[];
}

export interface IVideo {
  id: number;
  title: string;
  subtitle: string;
  duration: number;
  image?: string;
  gradient?: string;
  videoUrl?: string;
  mediaType: "image" | "video";
  isRead?: boolean;
  thumbnailUrl?: string;
  products: IProduct[];
}

export const VIDEO_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const SAMPLE_PRODUCT_IMAGE = "https://placehold.co/120x120";

export const VIDEOS: IVideo[] = [
  {
    id: 1,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Cải thiện tiếng Anh",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    mediaType: "image",
    duration: 60,
    products: [
      {
        id: 1,
        name: "Hộp 20 Viên Pin AA / AAA Maxell Alkaline 1,5V - Hàng chính hãng",
        price: "114.954",
        originalPrice: "209.000",
        discount: "44%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    image:
      "https://videos.pexels.com/video-files/32330745/13791049_1440_2560_30fps.mp4",
    mediaType: "video",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    duration: 60,
    products: [
      {
        id: 1,
        name: "Hộp 20 Viên Pin AA / AAA Maxell Alkaline 1,5V - Hàng chính hãng",
        price: "114.954",
        originalPrice: "209.000",
        discount: "44%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    image:
      "https://videos.pexels.com/video-files/17169505/17169505-hd_1080_1920_30fps.mp4",
    mediaType: "video",
    videoUrl:
      "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    duration: 60,
    products: [
      {
        id: 1,
        name: "Hộp 20 Viên Pin AA / AAA Maxell Alkaline 1,5V - Hàng chính hãng",
        price: "114.954",
        originalPrice: "209.000",
        discount: "44%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    image:
      "https://videos.pexels.com/video-files/15465878/15465878-hd_1080_1920_30fps.mp4",
    mediaType: "video",
    videoUrl:
      "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    duration: 60,
    products: [
      {
        id: 1,
        name: "Hộp 20 Viên Pin AA / AAA Maxell Alkaline 1,5V - Hàng chính hãng",
        price: "114.954",
        originalPrice: "209.000",
        discount: "44%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Cải thiện tiếng Anh",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    mediaType: "image",
    duration: 60,
    products: [
      {
        id: 1,
        name: "Hộp 20 Viên Pin AA / AAA Maxell Alkaline 1,5V - Hàng chính hãng",
        price: "114.954",
        originalPrice: "209.000",
        discount: "44%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          { type: "image", url: SAMPLE_PRODUCT_IMAGE },
        ],
      },
    ],
  },
  // ...repeat for all other items, replacing `image` or `videoUrl` with `mediaFiles: [url]`
  // and for products, replace `image` with `mediaFiles: [url]`
];

export const STORIES_SWIPER_BREAKPOINTS = {
  320: {
    slidesPerView: 4.5,
  },
  480: {
    slidesPerView: 5.5,
  },
  640: {
    slidesPerView: 6.5,
  },
  768: {
    slidesPerView: 7.5,
  },
  1024: {
    slidesPerView: 10,
  },
};
