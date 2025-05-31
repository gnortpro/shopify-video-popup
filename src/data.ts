export type IMediaType = "image" | "video";

export interface IStoriesCarouselProps {
  stories: IVideo[];
  onStoryClick?: (id: number) => void;
}

export interface IStoryItemProps {
  story: IVideo;
  onClick: (story: IVideo) => void;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 2,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://videos.pexels.com/video-files/32330745/13791049_1440_2560_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 3,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    videoUrl:
      "https://videos.pexels.com/video-files/17169505/17169505-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 4,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    videoUrl:
      "https://videos.pexels.com/video-files/15465878/15465878-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 6,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://videos.pexels.com/video-files/15283135/15283135-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 7,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    videoUrl:
      "https://videos.pexels.com/video-files/17687289/17687289-uhd_1440_2560_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 8,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    videoUrl:
      "https://videos.pexels.com/video-files/15439741/15439741-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 9,
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 10,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://videos.pexels.com/video-files/27831511/12237761_2560_1440_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 11,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    videoUrl:
      "https://videos.pexels.com/video-files/15000517/15000517-uhd_1296_2304_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 12,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    videoUrl:
      "https://videos.pexels.com/video-files/27880315/12253981_1440_2560_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 13,
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 14,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://videos.pexels.com/video-files/15283210/15283210-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 15,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    videoUrl:
      "https://videos.pexels.com/video-files/14993748/14993748-uhd_1296_2304_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 16,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    videoUrl:
      "https://videos.pexels.com/video-files/15283199/15283199-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 17,
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 18,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://videos.pexels.com/video-files/17687290/17687290-uhd_2560_1440_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 19,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    videoUrl:
      "https://videos.pexels.com/video-files/15283202/15283202-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 20,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    videoUrl:
      "https://videos.pexels.com/video-files/15283155/15283155-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 21,
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 22,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://videos.pexels.com/video-files/15670923/15670923-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 23,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    videoUrl:
      "https://videos.pexels.com/video-files/15283174/15283174-hd_1080_1920_30fps.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 24,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    videoUrl:
      "https://file-examples.com/storage/fe9a9edbcbadda6b69e2dc9/2017/10/file_example_MP4_640_3MG.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 25,
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 26,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 27,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Kinh nghiệm du học",
    videoUrl:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 28,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Tìm việc làm hiệu quả",
    videoUrl:
      "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 29,
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 30,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Những lưu ý khi",
    gradient: "from-red-400 via-pink-400 to-blue-400",
    videoUrl:
      "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_5MB.mp4",
    mediaType: "video",
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
        image: SAMPLE_PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
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
