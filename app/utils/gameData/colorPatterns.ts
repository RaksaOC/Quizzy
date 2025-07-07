import { ColorQuestion } from "../types";
import { shuffleArray } from "./helpers";

// Color options with emojis
const COLORS = {
  red: "🔴",
  blue: "🔵",
  yellow: "🟡",
  green: "🟢",
  purple: "🟣",
  orange: "🟠",
  white: "⚪",
  black: "⚫",
};

// Pattern templates
const PATTERN_TEMPLATES = [
  // Simple patterns
  ["red", "blue", "red", "blue"],
  ["green", "yellow", "green", "yellow"],
  ["purple", "orange", "purple", "orange"],
  ["white", "black", "white", "black"],

  // Complex patterns
  ["red", "blue", "yellow", "red", "blue", "yellow"],
  ["green", "purple", "orange", "green", "purple", "orange"],
  ["blue", "yellow", "blue", "yellow", "blue", "yellow"],

  // Mixed patterns
  ["red", "yellow", "blue", "red", "yellow", "blue"],
  ["purple", "green", "orange", "purple", "green", "orange"],
  ["white", "red", "black", "white", "red", "black"],
];

// Generate a color pattern question
const generateColorQuestion = (pattern: string[]): ColorQuestion => {
  const patternWithEmojis = pattern.map(
    (color) => COLORS[color as keyof typeof COLORS]
  );

  // Generate wrong options by shuffling parts of the pattern
  const generateWrongOption = () => {
    const shuffled = shuffleArray([...pattern]);
    return shuffled.map((color) => COLORS[color as keyof typeof COLORS]);
  };

  // Generate 3 wrong options
  const wrongOptions = [
    generateWrongOption(),
    generateWrongOption(),
    generateWrongOption(),
  ];

  // Add correct pattern and shuffle all options
  const allOptions = shuffleArray([patternWithEmojis, ...wrongOptions]);
  const correctAnswerIndex = allOptions.findIndex((opt) =>
    opt.every((color, i) => color === patternWithEmojis[i])
  );

  return {
    id: Date.now(),
    question: "Match the color pattern!",
    pattern: patternWithEmojis,
    options: allOptions,
    correctAnswer: correctAnswerIndex,
    explanation: "Great job matching the colors! 🎨",
  };
};

// Generate a set of color questions
export const generateColorQuestions = (count: number = 5): ColorQuestion[] => {
  const questions: ColorQuestion[] = [];
  const patterns = shuffleArray([...PATTERN_TEMPLATES]);

  for (let i = 0; i < count; i++) {
    const pattern = patterns[i % patterns.length];
    questions.push(generateColorQuestion(pattern));
  }

  return questions;
};

// Get all available colors
export const getAvailableColors = (): string[] => {
  return Object.values(COLORS);
};

// Get a random color
export const getRandomColor = (): string => {
  const colors = Object.values(COLORS);
  return colors[Math.floor(Math.random() * colors.length)];
};
