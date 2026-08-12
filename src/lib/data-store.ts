// Shared data store for books and store products
// Uses localStorage for persistence, with hardcoded defaults as fallback

export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  category: string;
  rating: number;
  description: string;
  audience: string;
  isbn: string;
  publisher: string;
  image: string;
  link: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  whyItHelps: string;
  category: "timers" | "math" | "organization" | "kitchen" | "focus";
  price: string;
  image: string;
  amazonUrl: string;
  rating: number;
  badge?: string;
}

const BOOKS_KEY = "cmi_admin_books";
const STORE_KEY = "cmi_admin_store";

/**
 * Amazon Associates tracking ID. Applies to every book link below and
 * every store product. Replace with the real tag (e.g. "countmein-21")
 * when provided; until then links work but earn nothing.
 */
export const AMAZON_AFFILIATE_TAG = "YOUR_AFFILIATE_TAG";

/** UK storefront: for print books the ASIN equals the ISBN-10. */
export const amazonBookLink = (isbn10: string) =>
  `https://www.amazon.co.uk/dp/${isbn10}?tag=${AMAZON_AFFILIATE_TAG}`;

export const defaultBooks: Book[] = [
  {
    id: "book-1",
    title: "The Dyscalculia Toolkit",
    author: "Ronit Bird",
    year: "2017",
    category: "Educational Resource",
    rating: 4.8,
    description: "Comprehensive practical strategies for supporting learners with dyscalculia in educational settings. Includes assessment tools and intervention techniques.",
    audience: "Educators, Parents",
    isbn: "9781473974265",
    publisher: "SAGE Publications",
    image: "/covers/dyscalculia-toolkit.jpg",
    link: amazonBookLink("1473974267"),
  },
  {
    id: "book-2",
    title: "Dyscalculia: From Science to Education",
    author: "Brian Butterworth",
    year: "2019",
    category: "Academic Research",
    rating: 4.7,
    description: "The leading researcher's authoritative guide to the neurological basis of dyscalculia and what it means for learning and teaching.",
    audience: "Researchers, Professionals",
    isbn: "9781138688612",
    publisher: "Routledge",
    image: "/covers/dyscalculia-science-education.jpg",
    link: amazonBookLink("1138688614"),
  },
  {
    id: "book-3",
    title: "The Number Sense",
    author: "Stanislas Dehaene",
    year: "2011",
    category: "Cognitive Science",
    rating: 4.6,
    description: "Foundational text on how the mind creates mathematics, providing insights into numerical cognition and mathematical learning differences.",
    audience: "General Public, Students",
    isbn: "9780199753871",
    publisher: "Oxford University Press",
    image: "/covers/number-sense.jpg",
    link: amazonBookLink("0199753873"),
  },
  {
    id: "book-4",
    title: "The Oxford Handbook of Numerical Cognition",
    author: "Edited by Roi Cohen Kadosh & Ann Dowker",
    year: "2015",
    category: "Academic Research",
    rating: 4.5,
    description: "The definitive academic handbook on numerical cognition: how the brain represents number, how maths ability develops, and what goes wrong in dyscalculia.",
    audience: "Researchers, Educators",
    isbn: "9780199642342",
    publisher: "Oxford University Press",
    image: "/covers/oxford-handbook-numerical-cognition.jpg",
    link: amazonBookLink("0199642346"),
  },
  {
    id: "book-5",
    title: "Overcoming Difficulties with Number",
    author: "Ronit Bird",
    year: "2009",
    category: "Practical Guide",
    rating: 4.4,
    description: "Practical strategies for supporting children and adults who struggle with mathematics due to learning differences.",
    audience: "Parents, Teachers",
    isbn: "9781448607118",
    publisher: "SAGE Publications",
    image: "/covers/overcoming-difficulties-number.jpg",
    link: amazonBookLink("1448607116"),
  },
  {
    id: "book-7",
    title: "Why Is Math So Hard for Some Children?",
    author: "Edited by Daniel B. Berch & Michèle M. M. Mazzocco",
    year: "2007",
    category: "Academic Research",
    rating: 4.2,
    description: "Landmark research anthology on the nature and origins of mathematical learning difficulties and disabilities, from leading scholars in the field.",
    audience: "Researchers, Professionals",
    isbn: "9781557668646",
    publisher: "Paul H. Brookes Publishing",
    image: "/covers/why-is-math-so-hard.jpg",
    link: amazonBookLink("1557668647"),
  },
  {
    id: "book-8",
    title: "The Dyscalculia Solution",
    author: "Jane Emerson & Patricia Babtie",
    year: "2014",
    category: "Teaching Resource",
    rating: 4.6,
    description: "Step-by-step teaching programme built around number sense, with concrete activities and games for learners who struggle with maths.",
    audience: "Teachers, Tutors",
    isbn: "9781441129512",
    publisher: "Bloomsbury Education",
    image: "/covers/dyscalculia-solution.jpg",
    link: amazonBookLink("1441129510"),
  },
];

export const defaultStoreProducts: StoreProduct[] = [
  {
    id: "time-timer",
    name: "Time Timer MOD (Visual Timer)",
    description: "A visual countdown timer that shows the passage of time with a disappearing red disk. No numbers needed to read it.",
    whyItHelps: "Makes abstract time concrete and visible. Ideal for time-blindness and task management without relying on number reading.",
    category: "timers",
    price: "~\u20AC35",
    image: "https://images.unsplash.com/photo-1607823477495-682ec53827b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B00JGFRMFK?tag=YOUR_AFFILIATE_TAG",
    rating: 4.7,
    badge: "Top Pick",
  },
  {
    id: "analog-clock",
    name: "Color-Coded Learning Clock",
    description: "Wall clock with colour-coded hour and minute segments. Each section is distinct, making time-telling intuitive.",
    whyItHelps: "Reduces the cognitive load of translating clock positions into numbers. Colour cues bypass numerical processing.",
    category: "timers",
    price: "~\u20AC20",
    image: "https://images.unsplash.com/photo-1591539050041-9e248f05e160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B07ZQ3YJKM?tag=YOUR_AFFILIATE_TAG",
    rating: 4.5,
  },
  {
    id: "smartwatch",
    name: "Smartwatch with Vibrating Alarms",
    description: "Digital watch with customizable vibrating reminders, timers, and calendar alerts on your wrist.",
    whyItHelps: "Gentle physical prompts help manage time-blindness without relying on reading a clock face. Set it and forget it.",
    category: "timers",
    price: "~\u20AC40\u2013\u20AC200",
    image: "https://images.unsplash.com/photo-1696688713460-de12ac76ebc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B0BDHQD1CK?tag=YOUR_AFFILIATE_TAG",
    rating: 4.4,
  },
  {
    id: "talking-calculator",
    name: "Talking Calculator (Large Display)",
    description: "Calculator that reads numbers aloud as you type and announces results. Extra-large buttons and high-contrast display.",
    whyItHelps: "Audio feedback confirms each digit, reducing transposition errors. Multi-sensory input reinforces number processing.",
    category: "math",
    price: "~\u20AC15",
    image: "https://images.unsplash.com/photo-1694753736023-ddad6cfc8263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B000EDBXIS?tag=YOUR_AFFILIATE_TAG",
    rating: 4.3,
    badge: "Budget-Friendly",
  },
  {
    id: "math-manipulatives",
    name: "Base Ten Blocks Set",
    description: "Hands-on manipulatives with units, rods, flats, and cubes for understanding place value and arithmetic visually.",
    whyItHelps: "Turns abstract number concepts into tangible, physical objects. Builds number sense through spatial reasoning.",
    category: "math",
    price: "~\u20AC18",
    image: "https://images.unsplash.com/photo-1698743280921-bcfb3bffc21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B000F8VBHY?tag=YOUR_AFFILIATE_TAG",
    rating: 4.6,
  },
  {
    id: "coin-counter",
    name: "Digital Coin Counting Jar",
    description: "Automatically counts coins as you drop them in and displays a running total. No mental arithmetic needed.",
    whyItHelps: "Eliminates the stress of counting money manually. Great for building confidence with everyday financial tasks.",
    category: "math",
    price: "~\u20AC15",
    image: "https://images.unsplash.com/photo-1624332901601-1da89d3ee916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B07L4RPLFZ?tag=YOUR_AFFILIATE_TAG",
    rating: 4.1,
  },
  {
    id: "visual-planner",
    name: "Magnetic Visual Daily Planner",
    description: "Colour-coded, icon-based planner with moveable magnetic tiles for scheduling without heavy number use.",
    whyItHelps: "Replaces time-based scheduling with visual blocks. Reduces reliance on reading digital times and durations.",
    category: "organization",
    price: "~\u20AC25",
    image: "https://images.unsplash.com/photo-1657040298726-7189d3090d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B09MQ97TQX?tag=YOUR_AFFILIATE_TAG",
    rating: 4.5,
    badge: "Favourite",
  },
  {
    id: "colour-measuring-cups",
    name: "Colour-Coded Measuring Cups & Spoons",
    description: "Each size is a different colour with large, clear markings. Includes both metric and imperial measurements.",
    whyItHelps: "Colour association removes the need to read tiny fraction numbers. 'Use the blue one' is easier than '1/3 cup'.",
    category: "kitchen",
    price: "~\u20AC12",
    image: "https://images.unsplash.com/photo-1589313815891-3e32def41118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B074MHXBKL?tag=YOUR_AFFILIATE_TAG",
    rating: 4.7,
    badge: "Essential",
  },
  {
    id: "digital-scale",
    name: "Talking Digital Kitchen Scale",
    description: "Reads weight aloud with a clear display. Auto-converts between grams, ounces, and pounds at the press of a button.",
    whyItHelps: "Audio confirmation prevents misreading numbers on the display. Unit conversion removes a common dyscalculia pain point.",
    category: "kitchen",
    price: "~\u20AC25",
    image: "https://images.unsplash.com/photo-1640270287737-42c9a15db98f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B07FMK7RP3?tag=YOUR_AFFILIATE_TAG",
    rating: 4.4,
  },
  {
    id: "noise-cancelling",
    name: "Noise-Cancelling Headphones",
    description: "Over-ear headphones that block distracting background noise. Lightweight and comfortable for all-day wear.",
    whyItHelps: "Reduces sensory overload when working with numbers. A quieter environment improves focus and reduces anxiety around maths tasks.",
    category: "focus",
    price: "~\u20AC50\u2013\u20AC300",
    image: "https://images.unsplash.com/photo-1645014135532-d6d870ae04a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B0BX8M9CVX?tag=YOUR_AFFILIATE_TAG",
    rating: 4.6,
  },
  {
    id: "fidget-tool",
    name: "Quiet Fidget Cube",
    description: "Discreet desk fidget with six sides of silent tactile features: click, glide, flip, breathe, roll, and spin.",
    whyItHelps: "Provides a tactile outlet for anxiety during maths tasks. Keeps hands busy so the brain can focus, especially helpful for ADHD + dyscalculia.",
    category: "focus",
    price: "~\u20AC10",
    image: "https://images.unsplash.com/photo-1770963583867-b6517ec8bd28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    amazonUrl: "https://www.amazon.com/dp/B07BKPXT1D?tag=YOUR_AFFILIATE_TAG",
    rating: 4.3,
  },
];

// --- localStorage helpers ---

export function getBooks(): Book[] {
  try {
    const stored = localStorage.getItem(BOOKS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultBooks;
}

export function saveBooks(books: Book[]) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

export function getStoreProducts(): StoreProduct[] {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultStoreProducts;
}

export function saveStoreProducts(products: StoreProduct[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
}