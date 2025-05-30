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
  duration: number;
  videoUrl: string;
  thumbnail?: string;
  products: IProduct[];
}

const SAMPLE_PRODUCT_IMAGE = "https://placehold.co/120x120";

export const videos: IVideo[] = [
  {
    id: 1,
    title: "Hướng dẫn phân biệt pin Maxell hàng thật-giả",
    duration: 45,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
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
    title: "Top 5 smartphone giá rẻ tốt nhất 2024",
    duration: 60,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    products: [
      {
        id: 3,
        name: "Xiaomi Redmi Note 12 Pro 5G - Smartphone giá rẻ tốt nhất",
        price: "5.990.000",
        originalPrice: "7.990.000",
        discount: "25%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 3,
    title: "Unboxing iPhone 15 Pro Max chính hãng",
    duration: 120,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    products: [
      {
        id: 4,
        name: "iPhone 15 Pro Max 256GB - Chính hãng VN/A",
        price: "29.990.000",
        originalPrice: "34.990.000",
        discount: "14%",
        image: SAMPLE_PRODUCT_IMAGE,
      },
    ],
  },
];
