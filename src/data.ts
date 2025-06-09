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
  image?: string;
  color?: string;
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
        name: "iPhone 15 Pro Max - 256GB",
        price: "28.990.000",
        originalPrice: "31.990.000",
        discount: "9%",
        mediaFiles: [
          {
            type: "video",
            url: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwd-m6idc7bk1dpda8.16000081740145779.mp4",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1592286634082-4b8c21c68f25?w=400&h=400&fit=crop",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Storage",
            variant: {
              id: "iphone-15-pro-max-256gb-black",
              displayName: "256GB - Đen Titan",
              image:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "28.990.000",
              compareAtPrice: "31.990.000",
            },
          },
          {
            name: "Storage",
            variant: {
              id: "iphone-15-pro-max-256gb-white",
              displayName: "256GB - Trắng Titan",
              image:
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop",
              price: "28.990.000",
              compareAtPrice: "31.990.000",
            },
          },
          {
            name: "Storage",
            variant: {
              id: "iphone-15-pro-max-512gb-black",
              displayName: "512GB - Đen Titan",
              image:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "34.990.000",
              compareAtPrice: "37.990.000",
            },
          },
          {
            name: "Storage",
            variant: {
              id: "iphone-15-pro-max-1tb-black",
              displayName: "1TB - Đen Titan",
              image:
                "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              price: "40.990.000",
              compareAtPrice: "43.990.000",
            },
          },
        ],
      },
      {
        id: 2,
        name: "MacBook Air M3 13 inch",
        price: "26.990.000",
        originalPrice: "28.990.000",
        discount: "7%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "macbook-air-m3-silver",
              displayName: "8GB RAM + 256GB SSD - Bạc",
              image:
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=120&h=120&fit=crop",
              price: "26.990.000",
              compareAtPrice: "28.990.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "macbook-air-m3-space-gray",
              displayName: "8GB RAM + 256GB SSD - Xám",
              image:
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=120&h=120&fit=crop",
              price: "26.990.000",
              compareAtPrice: "28.990.000",
            },
          },
          {
            name: "Storage",
            variant: {
              id: "macbook-air-m3-512gb-silver",
              displayName: "8GB RAM + 512GB SSD - Bạc",
              image:
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=120&h=120&fit=crop",
              price: "31.990.000",
              compareAtPrice: "33.990.000",
            },
          },
        ],
      },
      {
        id: 3,
        name: "AirPods Pro 2nd Generation",
        price: "5.490.000",
        originalPrice: "6.190.000",
        discount: "11%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Model",
            variant: {
              id: "airpods-pro-2-usb-c",
              displayName: "USB-C Charging Case",
              image:
                "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=120&h=120&fit=crop",
              price: "5.490.000",
              compareAtPrice: "6.190.000",
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
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    mediaType: "video",
    videoUrl:
      "https://down-bs-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6ke14-llub0rk1yy1rdd.16000081695104243.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    duration: 45,
    products: [
      {
        id: 4,
        name: "Nike Air Max 270 React",
        price: "2.890.000",
        originalPrice: "3.290.000",
        discount: "12%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Size",
            variant: {
              id: "nike-air-max-270-size-39",
              displayName: "Size 39 - Trắng/Đen",
              image:
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop",
              price: "2.890.000",
              compareAtPrice: "3.290.000",
            },
          },
          {
            name: "Size",
            variant: {
              id: "nike-air-max-270-size-40",
              displayName: "Size 40 - Trắng/Đen",
              image:
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop",
              price: "2.890.000",
              compareAtPrice: "3.290.000",
            },
          },
          {
            name: "Size",
            variant: {
              id: "nike-air-max-270-size-41",
              displayName: "Size 41 - Trắng/Đen",
              image:
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop",
              price: "2.890.000",
              compareAtPrice: "3.290.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "nike-air-max-270-blue-size-40",
              displayName: "Size 40 - Xanh/Trắng",
              image:
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=120&h=120&fit=crop",
              price: "2.890.000",
              compareAtPrice: "3.290.000",
            },
          },
        ],
      },
      {
        id: 5,
        name: "Whey Protein Gold Standard",
        price: "1.590.000",
        originalPrice: "1.790.000",
        discount: "11%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Flavor",
            variant: {
              id: "whey-protein-vanilla",
              displayName: "2.27kg - Vanilla",
              image:
                "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=120&h=120&fit=crop",
              price: "1.590.000",
              compareAtPrice: "1.790.000",
            },
          },
          {
            name: "Flavor",
            variant: {
              id: "whey-protein-chocolate",
              displayName: "2.27kg - Chocolate",
              image:
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop",
              price: "1.590.000",
              compareAtPrice: "1.790.000",
            },
          },
          {
            name: "Flavor",
            variant: {
              id: "whey-protein-strawberry",
              displayName: "2.27kg - Strawberry",
              image:
                "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=120&h=120&fit=crop",
              price: "1.590.000",
              compareAtPrice: "1.790.000",
            },
          },
        ],
      },
      {
        id: 6,
        name: "Yoga Mat Premium TPE",
        price: "890.000",
        originalPrice: "1.190.000",
        discount: "25%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "yoga-mat-purple",
              displayName: "6mm - Tím",
              image:
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&h=120&fit=crop",
              price: "890.000",
              compareAtPrice: "1.190.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "yoga-mat-blue",
              displayName: "6mm - Xanh Dương",
              image:
                "https://images.unsplash.com/photo-1506629905607-8fc8bfaf567e?w=120&h=120&fit=crop",
              price: "890.000",
              compareAtPrice: "1.190.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "yoga-mat-pink",
              displayName: "6mm - Hồng",
              image:
                "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&h=120&fit=crop",
              price: "890.000",
              compareAtPrice: "1.190.000",
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "THỜI TRANG & PHONG CÁCH",
    subtitle: "Xu hướng mới nhất",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    mediaType: "video",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    duration: 35,
    products: [
      {
        id: 7,
        name: "Áo Sơ Mi Nam Premium Cotton",
        price: "650.000",
        originalPrice: "850.000",
        discount: "24%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Size",
            variant: {
              id: "shirt-white-size-m",
              displayName: "Size M - Trắng",
              image:
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&h=120&fit=crop",
              price: "650.000",
              compareAtPrice: "850.000",
            },
          },
          {
            name: "Size",
            variant: {
              id: "shirt-white-size-l",
              displayName: "Size L - Trắng",
              image:
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&h=120&fit=crop",
              price: "650.000",
              compareAtPrice: "850.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "shirt-blue-size-m",
              displayName: "Size M - Xanh Navy",
              image:
                "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=120&h=120&fit=crop",
              price: "650.000",
              compareAtPrice: "850.000",
            },
          },
        ],
      },
      {
        id: 8,
        name: "Túi Xách Nữ Da Thật",
        price: "1.290.000",
        originalPrice: "1.690.000",
        discount: "24%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Color",
            variant: {
              id: "handbag-brown",
              displayName: "Da Nâu",
              image:
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop",
              price: "1.290.000",
              compareAtPrice: "1.690.000",
            },
          },
          {
            name: "Color",
            variant: {
              id: "handbag-black",
              displayName: "Da Đen",
              image:
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop",
              price: "1.290.000",
              compareAtPrice: "1.690.000",
            },
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "NHÀ CỬA & ĐỜI SỐNG",
    subtitle: "Trang trí không gian",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    mediaType: "image",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    duration: 40,
    products: [
      {
        id: 9,
        name: "Đèn LED Thông Minh Philips Hue",
        price: "2.390.000",
        originalPrice: "2.690.000",
        discount: "11%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Type",
            variant: {
              id: "philips-hue-white-ambiance",
              displayName: "White Ambiance Starter Kit",
              image:
                "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&h=120&fit=crop",
              price: "2.390.000",
              compareAtPrice: "2.690.000",
            },
          },
          {
            name: "Type",
            variant: {
              id: "philips-hue-color",
              displayName: "Color Starter Kit",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
              price: "3.590.000",
              compareAtPrice: "3.990.000",
            },
          },
        ],
      },
      {
        id: 10,
        name: "Robot Hút Bụi Xiaomi",
        price: "4.990.000",
        originalPrice: "5.990.000",
        discount: "17%",
        mediaFiles: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
          },
        ],
        optionValues: [
          {
            name: "Model",
            variant: {
              id: "xiaomi-vacuum-s10",
              displayName: "Xiaomi Robot Vacuum S10",
              image:
                "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&h=120&fit=crop",
              price: "4.990.000",
              compareAtPrice: "5.990.000",
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
