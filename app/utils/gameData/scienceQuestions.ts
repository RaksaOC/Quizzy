import { ScienceQuestion } from "../types";
import { shuffleArray } from "./helpers";

export const scienceQuestions: ScienceQuestion[] = [
  {
    id: 1,
    category: "space",
    question: "Which planet is closest to the Sun?",
    options: ["Mercury 🌎", "Venus 🌍", "Earth 🌏", "Mars 🔴"],
    correctAnswer: "Mercury 🌎",
    difficulty: "easy",
    explanation: "Mercury is the smallest and closest planet to the Sun! 🌟",
  },
  {
    id: 2,
    category: "biology",
    question: "What do plants need to make their food?",
    options: ["Sunlight ☀️", "Pizza 🍕", "Ice Cream 🍦", "Candy 🍬"],
    correctAnswer: "Sunlight ☀️",
    difficulty: "easy",
    explanation:
      "Plants use sunlight to make their own food through photosynthesis! 🌱",
  },
  {
    id: 3,
    category: "physics",
    question: "What pulls everything down to Earth?",
    options: ["Gravity 🌍", "Wind 💨", "Magic ✨", "Clouds ☁️"],
    correctAnswer: "Gravity 🌍",
    difficulty: "easy",
    explanation: "Gravity is a force that pulls everything toward Earth! 🎯",
  },
  {
    id: 4,
    category: "chemistry",
    question: "What is water made of?",
    options: ["H2O 💧", "ABC 📝", "XYZ 🔤", "123 🔢"],
    correctAnswer: "H2O 💧",
    difficulty: "medium",
    explanation: "Water (H2O) is made of hydrogen and oxygen! 💦",
  },
  {
    id: 5,
    category: "earth",
    question: "What makes a rainbow appear?",
    options: ["Rain and Sun 🌈", "Moon 🌙", "Stars ⭐", "Snow ❄️"],
    correctAnswer: "Rain and Sun 🌈",
    difficulty: "easy",
    explanation: "Rainbows appear when sunlight hits raindrops! 🌈",
  },
  {
    id: 6,
    category: "biology",
    question: "Which animal can change its color?",
    options: ["Chameleon 🦎", "Lion 🦁", "Elephant 🐘", "Giraffe 🦒"],
    correctAnswer: "Chameleon 🦎",
    difficulty: "medium",
    explanation: "Chameleons can change color to match their surroundings! 🎨",
  },
  {
    id: 7,
    category: "space",
    question: "What gives us light during the day?",
    options: ["Sun ☀️", "Moon 🌙", "Stars ⭐", "Clouds ☁️"],
    correctAnswer: "Sun ☀️",
    difficulty: "easy",
    explanation: "The Sun is our closest star and gives us light and heat! 🌞",
  },
  {
    id: 8,
    category: "physics",
    question: "What happens to ice when it gets warm?",
    options: ["Melts 💧", "Grows 📏", "Jumps 🦘", "Sings 🎵"],
    correctAnswer: "Melts 💧",
    difficulty: "easy",
    explanation: "Ice melts and turns into water when it gets warm! 💧",
  },
  {
    id: 9,
    category: "chemistry",
    question: "What gas do we breathe in?",
    options: ["Oxygen 💨", "Helium 🎈", "Steam 💭", "Smoke 💭"],
    correctAnswer: "Oxygen 💨",
    difficulty: "medium",
    explanation: "We need oxygen from the air to breathe! 🫁",
  },
  {
    id: 10,
    category: "earth",
    question: "What causes waves in the ocean?",
    options: ["Wind 🌊", "Fish 🐠", "Boats ⛵", "Sand 🏖️"],
    correctAnswer: "Wind 🌊",
    difficulty: "medium",
    explanation: "Wind blowing over the water creates ocean waves! 🌊",
  },
];

// Helper function to get a random subset of questions
export const getRandomScienceQuestions = (
  count: number = 5
): ScienceQuestion[] => {
  return shuffleArray(scienceQuestions).slice(0, count);
};

// Helper function to get questions by category
export const getQuestionsByCategory = (
  category: "biology" | "chemistry" | "physics" | "space" | "earth"
): ScienceQuestion[] => {
  return scienceQuestions.filter((q) => q.category === category);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: "easy" | "medium" | "hard"
): ScienceQuestion[] => {
  return scienceQuestions.filter((q) => q.difficulty === difficulty);
};
