import { MultipleChoiceQuestion } from "../types";
import { shuffleArray, shuffleChoices } from "./helpers";

// Quiz Categories
const CATEGORIES = [
  { name: "Nature", emoji: "🌿" },
  { name: "Animals", emoji: "🐾" },
  { name: "Food", emoji: "🍔" },
  { name: "Science", emoji: "🔬" },
  { name: "Space", emoji: "🚀" },
];

// Quiz Questions Bank
const QUIZ_QUESTIONS: MultipleChoiceQuestion[] = [
  {
    id: 1,
    category: "Space",
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    explanation:
      "Mars is called the Red Planet because of the reddish iron oxide (rust) on its surface! 🔴",
  },
  {
    id: 2,
    category: "Animals",
    question: "What is the largest animal on Earth?",
    options: ["Blue Whale", "African Elephant", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    explanation:
      "The Blue Whale is the largest animal ever known to exist, reaching lengths of up to 100 feet! 🐋",
  },
  {
    id: 3,
    category: "Science",
    question: "What is the hardest natural substance on Earth?",
    options: ["Diamond", "Gold", "Iron", "Platinum"],
    correctAnswer: "Diamond",
    explanation:
      "Diamonds are the hardest natural substance, formed deep within the Earth under extreme pressure! 💎",
  },
  {
    id: 4,
    category: "Nature",
    question: "Which tree is known as the tallest tree species?",
    options: ["Redwood", "Oak", "Pine", "Maple"],
    correctAnswer: "Redwood",
    explanation:
      "Redwood trees can grow over 300 feet tall - that's taller than a 30-story building! 🌲",
  },
  {
    id: 5,
    category: "Food",
    question: "Which fruit is known as the 'King of Fruits'?",
    options: ["Durian", "Mango", "Apple", "Banana"],
    correctAnswer: "Durian",
    explanation:
      "The Durian is called the King of Fruits in Southeast Asia, known for its strong smell and unique taste! 👑",
  },
  {
    id: 6,
    category: "Space",
    question: "What is the closest star to Earth?",
    options: ["The Sun", "Proxima Centauri", "Alpha Centauri", "Sirius"],
    correctAnswer: "The Sun",
    explanation:
      "The Sun is our closest star - it's about 93 million miles away from Earth! ☀️",
  },
  {
    id: 7,
    category: "Animals",
    question: "Which bird can fly backwards?",
    options: ["Hummingbird", "Eagle", "Parrot", "Penguin"],
    correctAnswer: "Hummingbird",
    explanation:
      "Hummingbirds are the only birds that can fly backwards and even upside down! 🐦",
  },
  {
    id: 8,
    category: "Science",
    question: "What is the smallest unit of matter?",
    options: ["Atom", "Cell", "Molecule", "Electron"],
    correctAnswer: "Atom",
    explanation:
      "Atoms are the basic building blocks of all matter - everything is made of atoms! ⚛️",
  },
  {
    id: 9,
    category: "Nature",
    question: "What causes rainbows?",
    options: ["Sunlight and Water", "Clouds", "Wind", "Heat"],
    correctAnswer: "Sunlight and Water",
    explanation:
      "Rainbows appear when sunlight hits water droplets in the air, splitting into different colors! 🌈",
  },
  {
    id: 10,
    category: "Food",
    question: "Which vegetable is known as the 'Night Shade'?",
    options: ["Tomato", "Carrot", "Potato", "Lettuce"],
    correctAnswer: "Tomato",
    explanation:
      "Tomatoes belong to the nightshade family of plants - they're actually fruits, not vegetables! 🍅",
  },
  {
    id: 11,
    category: "Space",
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    correctAnswer: "Jupiter",
    explanation:
      "Jupiter is so big that all other planets in our solar system could fit inside it! 🌟",
  },
  {
    id: 12,
    category: "Animals",
    question: "How many hearts does an octopus have?",
    options: ["3", "1", "2", "4"],
    correctAnswer: "3",
    explanation:
      "Octopuses have three hearts - two pump blood to the gills, one pumps it to the rest of the body! 🐙",
  },
  {
    id: 13,
    category: "Science",
    question: "What is the fastest speed that anything can travel?",
    options: [
      "Speed of Light",
      "Speed of Sound",
      "Speed of Wind",
      "Speed of Thought",
    ],
    correctAnswer: "Speed of Light",
    explanation:
      "Nothing can travel faster than the speed of light - that's 186,282 miles per second! ⚡",
  },
  {
    id: 14,
    category: "Nature",
    question: "What is the largest flower in the world?",
    options: ["Rafflesia", "Sunflower", "Rose", "Tulip"],
    correctAnswer: "Rafflesia",
    explanation:
      "The Rafflesia flower can grow up to 3 feet across and weigh up to 24 pounds! 🌺",
  },
  {
    id: 15,
    category: "Food",
    question: "What is the most expensive spice in the world?",
    options: ["Saffron", "Vanilla", "Cardamom", "Cinnamon"],
    correctAnswer: "Saffron",
    explanation:
      "Saffron is worth more than its weight in gold - it takes 150 flowers to make just 1 gram! 🌷",
  },
];

// Helper function to get a random subset of questions
export const getRandomQuizQuestions = (
  count: number = 5
): MultipleChoiceQuestion[] => {
  return shuffleArray(QUIZ_QUESTIONS)
    .slice(0, count)
    .map((question) => shuffleChoices(question));
};

// Get questions by category
export const getQuestionsByCategory = (
  category: string,
  count: number = 5
): MultipleChoiceQuestion[] => {
  const categoryQuestions = QUIZ_QUESTIONS.filter(
    (q) => q.category === category
  );
  return shuffleArray([...categoryQuestions]).slice(0, count);
};

// Get all categories
export const getQuizCategories = () => CATEGORIES;

// Get a random category
export const getRandomCategory = () => {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
};
