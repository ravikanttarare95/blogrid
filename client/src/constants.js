import {
  FaLaptopCode,
  FaHeartbeat,
  FaPlane,
  FaUtensils,
  FaMoneyBillWave,
  FaBook,
  FaLeaf,
  FaFilm,
  FaFutbol,
  FaFlask,
  FaPalette,
  FaLandmark,
  FaBalanceScale,
  FaGlobeAmericas,
  FaBriefcase,
  FaTheaterMasks,
  FaTshirt,
  FaCamera,
  FaTools,
  FaBaby,
  FaEllipsisH,
} from "react-icons/fa";

const BLOG_CATEGORIES = [
  "Technology",
  "Health",
  "Travel",
  "Finance",
  "Education",
  "Lifestyle",
  "Food",
  "Entertainment",
  "Sports",
  "Science",
  "Art",
  "History",
  "Politics",
  "Environment",
  "Business",
  "Culture",
  "Fashion",
  "Photography",
  "DIY",
  "Parenting",
  "Other",
];

const BLOG_CATEGORY_STYLE = {
  Technology: {
    className: "bg-blue-100 text-blue-800 border-blue-800/20",
    icon: FaLaptopCode,
  },
  Health: {
    className: "bg-green-100 text-green-800 border-green-800/20",
    icon: FaHeartbeat,
  },
  Travel: {
    className: "bg-yellow-100 text-yellow-800 border-yellow-800/20",
    icon: FaPlane,
  },
  Finance: {
    className: "bg-emerald-100 text-emerald-800 border-emerald-800/20",
    icon: FaMoneyBillWave,
  },
  Education: {
    className: "bg-indigo-100 text-indigo-800 border-indigo-800/20",
    icon: FaBook,
  },
  Lifestyle: {
    className: "bg-pink-100 text-pink-800 border-pink-800/20",
    icon: FaLeaf,
  },
  Food: {
    className: "bg-red-100 text-red-800 border-red-800/20",
    icon: FaUtensils,
  },
  Entertainment: {
    className: "bg-purple-100 text-purple-800 border-purple-800/20",
    icon: FaFilm,
  },
  Sports: {
    className: "bg-orange-100 text-orange-800 border-orange-800/20",
    icon: FaFutbol,
  },
  Science: {
    className: "bg-cyan-100 text-cyan-800 border-cyan-800/20",
    icon: FaFlask,
  },
  Art: {
    className: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-800/20",
    icon: FaPalette,
  },
  History: {
    className: "bg-stone-100 text-stone-800 border-stone-800/20",
    icon: FaLandmark,
  },
  Politics: {
    className: "bg-lime-100 text-lime-800 border-lime-800/20",
    icon: FaBalanceScale,
  },
  Environment: {
    className: "bg-green-50 text-green-700 border-green-700/20",
    icon: FaGlobeAmericas,
  },
  Business: {
    className: "bg-gray-100 text-gray-800 border-gray-800/20",
    icon: FaBriefcase,
  },
  Culture: {
    className: "bg-violet-100 text-violet-800 border-violet-800/20",
    icon: FaTheaterMasks,
  },
  Fashion: {
    className: "bg-rose-100 text-rose-800 border-rose-800/20",
    icon: FaTshirt,
  },
  Photography: {
    className: "bg-sky-100 text-sky-800 border-sky-800/20",
    icon: FaCamera,
  },
  DIY: {
    className: "bg-amber-100 text-amber-800 border-amber-800/20",
    icon: FaTools,
  },
  Parenting: {
    className: "bg-teal-100 text-teal-800 border-teal-800/20",
    icon: FaBaby,
  },
  Other: {
    className: "bg-neutral-100 text-neutral-800 border-neutral-800/20",
    icon: FaEllipsisH,
  },
};

export { BLOG_CATEGORIES, BLOG_CATEGORY_STYLE };
