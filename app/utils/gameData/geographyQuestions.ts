import { GeographyQuestion } from "../types";
import { shuffleArray, shuffleChoices } from "./helpers";

export const geographyQuestions: GeographyQuestion[] = [
  {
    id: 1,
    name: "Eiffel Tower",
    type: "landmark",
    question: "Which famous tower is in Paris, France?",
    options: [
      "Eiffel Tower 🗼",
      "Big Ben 🕰️",
      "Leaning Tower 🗿",
      "CN Tower 🌆",
    ],
    correctAnswer: "Eiffel Tower 🗼",
    facts: [
      "Built in 1889!",
      "Named after Gustave Eiffel",
      "324 meters tall",
      "Made of iron",
    ],
    explanation: "The Eiffel Tower is a famous symbol of Paris, France! 🇫🇷",
  },
  {
    id: 2,
    name: "Great Wall",
    type: "landmark",
    question: "Which long wall can be seen from space?",
    options: [
      "Great Wall 🧱",
      "Berlin Wall 🏛️",
      "Castle Wall 🏰",
      "City Wall 🏘️",
    ],
    correctAnswer: "Great Wall 🧱",
    facts: [
      "Built over 2000 years ago!",
      "Over 13,000 miles long",
      "Made of stone and brick",
      "Protected ancient China",
    ],
    explanation: "The Great Wall of China is the longest wall in the world! 🇨🇳",
  },
  {
    id: 3,
    name: "Tokyo",
    type: "city",
    question: "Which city has the most people in Japan?",
    options: ["Tokyo 🗼", "Osaka 🏯", "Kyoto ⛩️", "Sapporo 🏙️"],
    correctAnswer: "Tokyo 🗼",
    facts: [
      "Capital of Japan!",
      "Has many tall buildings",
      "Famous for technology",
      "Very busy city",
    ],
    explanation: "Tokyo is the biggest and busiest city in Japan! 🇯🇵",
  },
  {
    id: 4,
    name: "Egypt",
    type: "country",
    question: "Which country has the pyramids?",
    options: ["Egypt 🔺", "Greece 🏺", "Italy 🏛️", "India 🕌"],
    correctAnswer: "Egypt 🔺",
    facts: [
      "Home to ancient pyramids!",
      "Has the River Nile",
      "Very hot desert climate",
      "Rich in history",
    ],
    explanation: "Egypt is famous for its amazing pyramids! 🇪🇬",
  },
  {
    id: 5,
    name: "Brazil",
    type: "country",
    question: "Which country has the Amazon Rainforest?",
    options: ["Brazil 🌴", "Mexico 🌵", "Canada 🌲", "Australia 🦘"],
    correctAnswer: "Brazil 🌴",
    facts: [
      "Largest rainforest!",
      "Many unique animals",
      "Very wet climate",
      "Important for Earth",
    ],
    explanation: "Brazil has the amazing Amazon Rainforest! 🇧🇷",
  },
  {
    id: 6,
    name: "London",
    type: "city",
    question: "Which city has Big Ben?",
    options: ["London 🕰️", "Paris 🗼", "Rome 🏛️", "New York 🗽"],
    correctAnswer: "London 🕰️",
    facts: [
      "Capital of England!",
      "Has red buses",
      "River Thames flows through",
      "Very historic city",
    ],
    explanation: "London is home to the famous Big Ben clock tower! 🇬🇧",
  },
  {
    id: 7,
    name: "Australia",
    type: "country",
    question: "Which country has kangaroos?",
    options: ["Australia 🦘", "China 🐼", "India 🐘", "Canada 🦌"],
    correctAnswer: "Australia 🦘",
    facts: [
      "Island continent!",
      "Has unique animals",
      "Very sunny climate",
      "Great Barrier Reef",
    ],
    explanation: "Australia is home to kangaroos and koalas! 🇦🇺",
  },
  {
    id: 8,
    name: "Mount Everest",
    type: "landmark",
    question: "Which mountain is the tallest in the world?",
    options: ["Mount Everest 🏔️", "Mount Fuji ⛰️", "Alps 🗻", "Rockies 🌄"],
    correctAnswer: "Mount Everest 🏔️",
    facts: [
      "Highest mountain!",
      "Very cold at top",
      "In the Himalayas",
      "Dangerous to climb",
    ],
    explanation: "Mount Everest is the highest mountain on Earth! 🏔️",
  },
];

// Helper function to get a random subset of questions
export const getRandomGeographyQuestions = (
  count: number = 5
): GeographyQuestion[] => {
  return shuffleArray(geographyQuestions)
    .slice(0, count)
    .map((question) => shuffleChoices(question));
};

// Helper function to get questions by type
export const getQuestionsByType = (
  type: "country" | "city" | "landmark"
): GeographyQuestion[] => {
  return geographyQuestions
    .filter((q) => q.type === type)
    .map((question) => shuffleChoices(question));
};
