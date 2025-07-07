import { AnimalQuestion } from "../types";
import { shuffleArray, shuffleChoices } from "./helpers";

export const animalQuestions: AnimalQuestion[] = [
  {
    id: 1,
    name: "Lion",
    emoji: "🦁",
    question: "Which animal is known as the King of the Jungle?",
    options: ["Lion 🦁", "Tiger 🐯", "Elephant 🐘", "Giraffe 🦒"],
    correctAnswer: "Lion 🦁",
    facts: [
      "Male lions have big manes!",
      "Lions live in groups called prides",
      "Lions can roar very loudly!",
      "Lions sleep up to 20 hours a day",
    ],
    explanation:
      "Lions are called the King of the Jungle because they're strong and brave! 👑",
  },
  {
    id: 2,
    name: "Elephant",
    emoji: "🐘",
    question: "Which animal has a long trunk?",
    options: ["Elephant 🐘", "Zebra 🦓", "Monkey 🐒", "Hippo 🦛"],
    correctAnswer: "Elephant 🐘",
    facts: [
      "Elephants have amazing memory!",
      "They use their trunks like a nose and hand",
      "Baby elephants are very playful",
      "Elephants are very smart animals",
    ],
    explanation: "Elephants use their trunks to grab food and drink water! 💦",
  },
  {
    id: 3,
    name: "Penguin",
    emoji: "🐧",
    question: "Which bird can swim but can't fly?",
    options: ["Penguin 🐧", "Eagle 🦅", "Parrot 🦜", "Duck 🦆"],
    correctAnswer: "Penguin 🐧",
    facts: [
      "Penguins are excellent swimmers!",
      "They live in very cold places",
      "They waddle when they walk",
      "They keep each other warm in groups",
    ],
    explanation: "Penguins are amazing swimmers and love to slide on ice! ❄️",
  },
  {
    id: 4,
    name: "Giraffe",
    emoji: "🦒",
    question: "Which animal has the longest neck?",
    options: ["Giraffe 🦒", "Horse 🐎", "Camel 🐪", "Deer 🦌"],
    correctAnswer: "Giraffe 🦒",
    facts: [
      "Giraffes are very tall!",
      "They eat leaves from tall trees",
      "Each giraffe has unique spots",
      "They can run very fast",
    ],
    explanation:
      "Giraffes use their long necks to reach leaves high in trees! 🌳",
  },
  {
    id: 5,
    name: "Dolphin",
    emoji: "🐬",
    question: "Which sea animal is known for being very smart?",
    options: ["Dolphin 🐬", "Fish 🐠", "Octopus 🐙", "Whale 🐋"],
    correctAnswer: "Dolphin 🐬",
    facts: [
      "Dolphins are very playful!",
      "They live in groups called pods",
      "They make clicking sounds",
      "They help each other",
    ],
    explanation:
      "Dolphins are super smart and love to play with their friends! 🌊",
  },
  {
    id: 6,
    name: "Kangaroo",
    emoji: "🦘",
    question: "Which animal carries its baby in a pouch?",
    options: ["Kangaroo 🦘", "Bear 🐻", "Rabbit 🐰", "Koala 🐨"],
    correctAnswer: "Kangaroo 🦘",
    facts: [
      "Kangaroos hop to move around!",
      "They have strong tails",
      "Baby kangaroos are called joeys",
      "They live in Australia",
    ],
    explanation: "Kangaroo moms keep their babies safe in their pouches! 🦘",
  },
  {
    id: 7,
    name: "Owl",
    emoji: "🦉",
    question: "Which bird can see well at night?",
    options: ["Owl 🦉", "Chicken 🐔", "Peacock 🦚", "Flamingo 🦩"],
    correctAnswer: "Owl 🦉",
    facts: [
      "Owls can turn their heads far!",
      "They fly very quietly",
      "They have excellent eyesight",
      "They hunt at night",
    ],
    explanation: "Owls are nocturnal and have big eyes to see in the dark! 🌙",
  },
  {
    id: 8,
    name: "Turtle",
    emoji: "🐢",
    question: "Which animal carries its house on its back?",
    options: ["Turtle 🐢", "Snake 🐍", "Lizard 🦎", "Frog 🐸"],
    correctAnswer: "Turtle 🐢",
    facts: [
      "Turtles move slowly but steadily!",
      "Their shell protects them",
      "Some turtles live very long",
      "They can swim and walk",
    ],
    explanation:
      "Turtles have a shell that keeps them safe wherever they go! 🏠",
  },
];

// Helper function to get a random subset of questions
export const getRandomAnimalQuestions = (
  count: number = 5
): AnimalQuestion[] => {
  return shuffleArray(animalQuestions)
    .slice(0, count)
    .map((question) => shuffleChoices(question));
};
