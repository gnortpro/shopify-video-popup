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

export interface IProductOptionValue {
  name: string;
  variant: IProductVariant;
}

export interface IProductVariant {
  id: string;
  displayName: string;
  imageUrl: string;
  price: string;
  compareAtPrice?: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  mediaFiles: IProductMediaType[];
  optionValues?: IProductOptionValue[];
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

export const VIDEOS: IVideo[] = [
  {
    id: 1,
    title: "VIỆC ĐI HỌC VÀ ĐI LÀM",
    subtitle: "Cải thiện tiếng Anh",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    mediaType: "video",
    videoUrl:
      "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6ke15-ltno3gyz7oct71.16004111727745367.mp4",
    duration: 60,
    products: [
      {
        id: 1,
        name: "iPhone 15 Pro Max - Nhiều Màu Sắc",
        price: "24.990.000",
        originalPrice: "26.990.000",
        discount: "7%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1592286634082-4b8c21c68f25?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-black",
              displayName: "256GB - Đen",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-hong",
              displayName: "256GB - Hồng",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-xanh",
              displayName: "256GB - Xanh",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
        ],
      },
      {
        id: 2,
        name: "Áo Thun Nam Nữ Basic Tee - Nhiều Size",
        price: "299.000",
        originalPrice: "399.000",
        discount: "25%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-black",
              displayName: "256GB - Đen",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-hong",
              displayName: "256GB - Hồng",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-xanh",
              displayName: "256GB - Xanh",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
        ],
      },
      {
        id: 3,
        name: "Son Môi Lâu Trôi - Bộ Sưu Tập Màu Sắc",
        price: "450.000",
        originalPrice: "550.000",
        discount: "18%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-black",
              displayName: "256GB - Đen",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-hong",
              displayName: "256GB - Hồng",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-xanh",
              displayName: "256GB - Xanh",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "CUỘC SỐNG KHỎE MẠNH",
    subtitle: "Thể thao và dinh dưỡng",
    gradient: "from-green-400 via-blue-400 to-purple-400",
    image:
      "https://videos.pexels.com/video-files/32330745/13791049_1440_2560_30fps.mp4",
    mediaType: "video",
    videoUrl:
      "https://down-bs-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6ke14-llub0rk1yy1rdd.16000081695104243.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    duration: 45,
    products: [
      {
        id: 4,
        name: "Giày Thể Thao Nam Nữ - Đa Dạng Size",
        price: "1.299.000",
        originalPrice: "1.599.000",
        discount: "19%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-black",
              displayName: "256GB - Đen",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-hong",
              displayName: "256GB - Hồng",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-xanh",
              displayName: "256GB - Xanh",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
        ],
      },
      {
        id: 5,
        name: "Serum Dưỡng Da - Công Thức Đặc Biệt",
        price: "399.000",
        originalPrice: "499.000",
        discount: "20%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-black",
              displayName: "256GB - Đen",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-hong",
              displayName: "256GB - Hồng",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "iphone-15-256gb-xanh",
              displayName: "256GB - Xanh",
              imageUrl:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
            },
          },
        ],
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
