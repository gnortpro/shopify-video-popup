export interface ShopifyImage {
  src: string;
  height: number;
  width: number;
  media_type: string;
}

export interface ShopifyVariantInOption {
  price: string | number;
  image?: ShopifyImage;
}

export interface ShopifyOptionValue {
  id: string;
  name: string;
  available: boolean;
  image?: string; // lấy từ swatch.image qua filter | image_url
  color?: string; // hex converted from swatch.color.rgb | color_to_hex
  price: string; // lấy từ variant.price converted by | money
}

export interface ShopifyOptionWithValues {
  name: string;
  position: number;
  values: ShopifyOptionValue[];
}

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
  optionWithValues: ShopifyOptionWithValues[];
  description?: string;
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
        description:
          "iPhone 15 Pro Max 256GB là siêu phẩm mới nhất từ Apple, sở hữu thiết kế sang trọng với khung viền titan bền bỉ và mặt kính cường lực. Máy trang bị màn hình Super Retina XDR sắc nét, hiệu năng vượt trội nhờ chip A17 Pro mạnh mẽ, đáp ứng mọi nhu cầu từ công việc đến giải trí. Cụm camera cải tiến cho phép chụp ảnh, quay video chuyên nghiệp với nhiều chế độ sáng tạo. Dung lượng pin lớn, hỗ trợ sạc nhanh và kết nối 5G giúp bạn luôn sẵn sàng mọi lúc mọi nơi. Sản phẩm phù hợp cho người yêu công nghệ và đam mê trải nghiệm mới.",
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
        optionWithValues: [
          {
            name: "Storage",
            position: 1,
            values: [
              {
                id: "1",
                name: "64gb",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "128gb",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
          },
          {
            name: "Color",
            position: 2,
            values: [
              {
                id: "1",
                name: "Black",
                available: true,
                price: "28.990.000đ",
                color: "#000000",
              },
              {
                id: "2",
                name: "Red",
                available: true,
                price: "28.990.000đ",
                color: "#ff2d00",
              },
              {
                id: "3",
                name: "Green",
                available: false,
                price: "28.990.000đ",
                color: "#00ff8f",
              },
            ],
          },
          {
            name: "Material",
            position: 3,
            values: [
              {
                id: "1",
                name: "Titan",
                available: true,
                price: "28.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
              {
                id: "2",
                name: "Gold",
                available: false,
                price: "34.990.000đ",
                image:
                  "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=120&h=120&fit=crop",
              },
            ],
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
