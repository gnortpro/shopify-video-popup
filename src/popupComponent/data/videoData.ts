export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  sold: string;
  image: string;
  tags: string[];
  favorite: boolean;
}

export interface Video {
  id: number;
  title: string;
  username: string;
  hashtags: string;
  discount: string;
  productCount: number;
  views: string;
  comments: number;
  likes: number;
  isLiked: boolean;
  duration: number;
  videoUrl: string;
  thumbnail?: string;
  products: Product[];
}

export const videos: Video[] = [
  {
    id: 1,
    title: "Hướng dẫn phân biệt pin Maxell hàng thật-giả",
    username: "@Hồng Ngọc Review",
    hashtags: "#VideohangDoiSong #VideoReview #PinMaxell",
    discount: "Giảm 15%",
    productCount: 2,
    views: "2.3K",
    comments: 0,
    likes: 8,
    isLiked: false,
    duration: 45,
    videoUrl: "/1.mp4",
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    products: [
      {
        id: 1,
        name: "Hộp 20 Viên Pin AA / AAA Maxell Alkaline 1,5V - Hàng chính hãng",
        price: "114.954",
        originalPrice: "209.000",
        discount: "44%",
        rating: 4.9,
        sold: "5,3K",
        image: "/api/placeholder/80/80",
        tags: ["Content Xtra", "Video Voucher", "Giảm 15%", "COD"],
        favorite: true
      },
      {
        id: 2,
        name: "Vỉ 2 Viên Pin AA - AAA (Pin Tiểu) Maxell Alkaline - Chính Hãng",
        price: "14.000",
        originalPrice: "20.000",
        discount: "30%",
        rating: 5,
        sold: "10K+",
        image: "/api/placeholder/80/80",
        tags: ["Rẻ Vô Địch", "Content Xtra", "Video Voucher", "Giảm 15%"],
        favorite: true
      }
    ]
  },
  {
    id: 2,
    title: "Top 5 smartphone giá rẻ tốt nhất 2024",
    username: "@Tech Review VN",
    hashtags: "#Smartphone #TechReview #GiaRe",
    discount: "Giảm 25%",
    productCount: 5,
    views: "15.2K",
    comments: 23,
    likes: 156,
    isLiked: false,
    duration: 60,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    products: [
      {
        id: 3,
        name: "Xiaomi Redmi Note 12 Pro 5G - Smartphone giá rẻ tốt nhất",
        price: "5.990.000",
        originalPrice: "7.990.000",
        discount: "25%",
        rating: 4.8,
        sold: "2,1K",
        image: "/api/placeholder/80/80",
        tags: ["Giảm 25%", "Trả góp 0%"],
        favorite: false
      }
    ]
  },
  {
    id: 3,
    title: "Unboxing iPhone 15 Pro Max chính hãng",
    username: "@Apple Việt Nam",
    hashtags: "#iPhone15ProMax #Unboxing #Apple",
    discount: "Trả góp 0%",
    productCount: 1,
    views: "89.5K",
    comments: 342,
    likes: 1240,
    isLiked: true,
    duration: 120,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    products: [
      {
        id: 4,
        name: "iPhone 15 Pro Max 256GB - Chính hãng VN/A",
        price: "29.990.000",
        originalPrice: "34.990.000",
        discount: "14%",
        rating: 4.9,
        sold: "856",
        image: "/api/placeholder/80/80",
        tags: ["Trả góp 0%", "Chính hãng"],
        favorite: true
      }
    ]
  }
];