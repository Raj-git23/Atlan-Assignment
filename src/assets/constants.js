import {
  Calendar,
  Clock,
  Heart,
  Coffee,
  Mountain,
  Film,
  Book,
  Utensils,
  Music,
  Search,
  Filter,
  Gamepad2,
  Palette,
  Camera,
  Dumbbell,
  Plane,
  ShoppingBag,
  Waves,
  TreePine,
  Users,
  Sun,
  Moon,
  Plus,
  X,
  Download,
  LayoutGrid,
  Baseline as Timeline,
  GripVertical,
  GlassWater, Bike, ChefHat, Puzzle, Drama, Brain, MapPin, Building, Mic, Snowflake, Trophy
} from "lucide-react";

export const activities = [
  // Food & Dining
  {
    id: 1,
    name: "Morning Brunch",
    category: "food",
    icon: "Coffee",
    duration: "2h",
    mood: "relaxed",
    description: "Cozy breakfast spot with amazing pancakes and fresh coffee",
    price: "$$",
    img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Dinner Date",
    category: "food",
    icon: "Utensils",
    duration: "2h",
    mood: "romantic",
    description: "Fine dining at that new restaurant downtown",
    price: "$$$",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Food Truck Festival",
    category: "food",
    icon: "Utensils",
    duration: "3h",
    mood: "exciting",
    description: "Sample diverse cuisines from local food trucks",
    price: "$",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Coffee Shop Visit",
    category: "food",
    icon: "Coffee",
    duration: "1h",
    mood: "cozy",
    description: "Artisan coffee and pastries at a local cafe",
    price: "$",
    img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Wine Tasting",
    category: "food",
    icon: "GlassWater",
    duration: "2.5h",
    mood: "sophisticated",
    description: "Sample premium wines at a local vineyard",
    price: "$$$",
    img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&h=300&fit=crop"
  },

  // Outdoor Activities
  {
    id: 6,
    name: "Hiking Trail",
    category: "outdoor",
    icon: "Mountain",
    duration: "3h",
    mood: "energetic",
    description: "Scenic mountain trail with beautiful valley views",
    price: "Free",
    img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Beach Day",
    category: "outdoor",
    icon: "Waves",
    duration: "4h",
    mood: "relaxed",
    description: "Relax by the ocean with sun, sand, and waves",
    price: "Free",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop"
  },
  {
    id: 8,
    name: "City Park Picnic",
    category: "outdoor",
    icon: "TreePine",
    duration: "2h",
    mood: "peaceful",
    description: "Enjoy nature in the heart of the city",
    price: "Free",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Rock Climbing",
    category: "outdoor",
    icon: "Mountain",
    duration: "3h",
    mood: "energetic",
    description: "Challenge yourself at the local climbing gym",
    price: "$$",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Cycling Adventure",
    category: "outdoor",
    icon: "Bike",
    duration: "2.5h",
    mood: "energetic",
    description: "Explore scenic routes on two wheels",
    price: "$",
    img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Kayaking",
    category: "outdoor",
    icon: "Waves",
    duration: "3h",
    mood: "adventurous",
    description: "Paddle through calm waters and enjoy nature",
    price: "$$",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop"
  },

  // Indoor Activities
  {
    id: 12,
    name: "Movie Night",
    category: "indoor",
    icon: "Film",
    duration: "2.5h",
    mood: "cozy",
    description: "Latest blockbuster at the premium cinema",
    price: "$$",
    img: "https://images.unsplash.com/photo-1489599735734-79b4477dd6ce?w=500&h=300&fit=crop"
  },
  {
    id: 13,
    name: "Reading Time",
    category: "indoor",
    icon: "Book",
    duration: "1h",
    mood: "peaceful",
    description: "Quiet time with your favorite book and tea",
    price: "Free",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop"
  },
  {
    id: 14,
    name: "Art Gallery Visit",
    category: "indoor",
    icon: "Palette",
    duration: "2h",
    mood: "inspiring",
    description: "Explore contemporary art at the local gallery",
    price: "$",
    img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop"
  },
  {
    id: 15,
    name: "Gaming Session",
    category: "indoor",
    icon: "Gamepad2",
    duration: "3h",
    mood: "exciting",
    description: "Play the latest games with friends",
    price: "$",
    img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop"
  },
  {
    id: 16,
    name: "Cooking Class",
    category: "indoor",
    icon: "ChefHat",
    duration: "2.5h",
    mood: "creative",
    description: "Learn to cook authentic Italian cuisine",
    price: "$$",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop"
  },
  {
    id: 17,
    name: "Board Game Night",
    category: "indoor",
    icon: "Puzzle",
    duration: "3h",
    mood: "fun",
    description: "Strategic games and friendly competition",
    price: "$",
    img: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=300&fit=crop"
  },

  // Entertainment
  {
    id: 18,
    name: "Live Music",
    category: "entertainment",
    icon: "Music",
    duration: "3h",
    mood: "exciting",
    description: "Local band performing at the downtown venue",
    price: "$$",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop"
  },
  {
    id: 19,
    name: "Comedy Show",
    category: "entertainment",
    icon: "Users",
    duration: "2h",
    mood: "fun",
    description: "Stand-up comedy night with local comedians",
    price: "$$",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop"
  },
  {
    id: 20,
    name: "Theater Performance",
    category: "entertainment",
    icon: "Drama",
    duration: "2.5h",
    mood: "sophisticated",
    description: "Broadway-style musical at the local theater",
    price: "$$$",
    img: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=500&h=300&fit=crop"
  },
  {
    id: 21,
    name: "Dance Class",
    category: "entertainment",
    icon: "Music",
    duration: "1.5h",
    mood: "energetic",
    description: "Learn salsa dancing with a professional instructor",
    price: "$$",
    img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop"
  },

  // Fitness & Wellness
  {
    id: 22,
    name: "Yoga Class",
    category: "wellness",
    icon: "Dumbbell",
    duration: "1h",
    mood: "peaceful",
    description: "Morning yoga session in the park",
    price: "$",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop"
  },
  {
    id: 23,
    name: "Gym Workout",
    category: "wellness",
    icon: "Dumbbell",
    duration: "1.5h",
    mood: "energetic",
    description: "Full body workout at the fitness center",
    price: "$",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
  },
  {
    id: 24,
    name: "Spa Day",
    category: "wellness",
    icon: "Heart",
    duration: "4h",
    mood: "relaxed",
    description: "Massage and wellness treatments for ultimate relaxation",
    price: "$$$",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop"
  },
  {
    id: 25,
    name: "Meditation Session",
    category: "wellness",
    icon: "Brain",
    duration: "45min",
    mood: "peaceful",
    description: "Guided meditation for mindfulness and stress relief",
    price: "$",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop"
  },

  // Shopping & Lifestyle
  {
    id: 26,
    name: "Farmers Market",
    category: "shopping",
    icon: "ShoppingBag",
    duration: "2h",
    mood: "relaxed",
    description: "Fresh produce and local crafts",
    price: "$",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&h=300&fit=crop"
  },
  {
    id: 27,
    name: "Vintage Shopping",
    category: "shopping",
    icon: "ShoppingBag",
    duration: "2.5h",
    mood: "inspiring",
    description: "Hunt for unique treasures at vintage stores",
    price: "$$",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop"
  },
  {
    id: 28,
    name: "Photography Walk",
    category: "creative",
    icon: "Camera",
    duration: "2h",
    mood: "inspiring",
    description: "Capture the city's hidden gems",
    price: "Free",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop"
  },
  {
    id: 29,
    name: "Pottery Workshop",
    category: "creative",
    icon: "Palette",
    duration: "3h",
    mood: "creative",
    description: "Create beautiful ceramics with your hands",
    price: "$$",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop"
  },

  // Travel & Adventure
  {
    id: 30,
    name: "Day Trip",
    category: "travel",
    icon: "Plane",
    duration: "8h",
    mood: "adventurous",
    description: "Explore a nearby town or attraction",
    price: "$$$",
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop"
  },
  {
    id: 31,
    name: "City Walking Tour",
    category: "travel",
    icon: "MapPin",
    duration: "3h",
    mood: "educational",
    description: "Discover local history and architecture",
    price: "$",
    img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&h=300&fit=crop"
  },
  {
    id: 32,
    name: "Museum Visit",
    category: "travel",
    icon: "Building",
    duration: "2.5h",
    mood: "educational",
    description: "Explore history and science exhibitions",
    price: "$$",
    img: "https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=500&h=300&fit=crop"
  },

  // Social & Community
  {
    id: 33,
    name: "Volunteering",
    category: "community",
    icon: "Heart",
    duration: "3h",
    mood: "fulfilling",
    description: "Help at the local animal shelter",
    price: "Free",
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop"
  },
  {
    id: 34,
    name: "Book Club Meeting",
    category: "community",
    icon: "Users",
    duration: "2h",
    mood: "intellectual",
    description: "Discuss this month's selected novel",
    price: "Free",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop"
  },
  {
    id: 35,
    name: "Karaoke Night",
    category: "entertainment",
    icon: "Mic",
    duration: "3h",
    mood: "fun",
    description: "Sing your heart out with friends",
    price: "$$",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=300&fit=crop"
  },

  // Seasonal Activities
  {
    id: 36,
    name: "Ice Skating",
    category: "outdoor",
    icon: "Snowflake",
    duration: "2h",
    mood: "playful",
    description: "Glide across the ice at the outdoor rink",
    price: "$$",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop"
  },
  {
    id: 37,
    name: "Mini Golf",
    category: "entertainment",
    icon: "Trophy",
    duration: "1.5h",
    mood: "playful",
    description: "Fun mini golf course with creative obstacles",
    price: "$",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
  },
  {
    id: 38,
    name: "Stargazing",
    category: "outdoor",
    icon: "Moon",
    duration: "2h",
    mood: "romantic",
    description: "Watch the stars at a dark sky location",
    price: "Free",
    img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop"
  }
];

export const categoryColors = {
  food: "bg-orange-100 text-orange-800 border-orange-200",
  outdoor: "bg-green-100 text-green-800 border-green-200",
  indoor: "bg-blue-100 text-blue-800 border-blue-200",
  entertainment: "bg-purple-100 text-purple-800 border-purple-200",
  wellness: "bg-teal-100 text-teal-800 border-teal-200",
  shopping: "bg-pink-100 text-pink-800 border-pink-200",
  creative: "bg-yellow-100 text-yellow-800 border-yellow-200",
  travel: "bg-indigo-100 text-indigo-800 border-indigo-200",
  community: "bg-rose-100 text-rose-800 border-rose-200",
};

export const moodColors = {
  relaxed: "bg-blue-50 text-blue-700",
  energetic: "bg-red-50 text-red-700",
  cozy: "bg-amber-50 text-amber-700",
  peaceful: "bg-green-50 text-green-700",
  romantic: "bg-pink-50 text-pink-700",
  exciting: "bg-purple-50 text-purple-700",
  inspiring: "bg-cyan-50 text-cyan-700",
  fun: "bg-orange-50 text-orange-700",
  adventurous: "bg-emerald-50 text-emerald-700",
  sophisticated: "bg-slate-50 text-slate-700",
  creative: "bg-yellow-50 text-yellow-700",
  educational: "bg-indigo-50 text-indigo-700",
  fulfilling: "bg-teal-50 text-teal-700",
  intellectual: "bg-violet-50 text-violet-700",
  playful: "bg-lime-50 text-lime-700",
};

export const timeSlots = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
];


export const weekendVibes = [
  "lazy", 
  "family", 
  "adventure", 
  "creative", 
  "active",
  "social", 
  "selfCare",
  "romantic", 
  "cultural", 
  "travel", 
  "foodie", 
  "productive", 
];


export const recommendedSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];
