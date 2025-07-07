import { MathQuestion } from "../types";

// Helper function to generate random number within range
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate wrong answers
const generateWrongAnswers = (
  correctAnswer: number,
  min: number,
  max: number,
  count: number = 3
): number[] => {
  const wrongAnswers = new Set<number>();
  while (wrongAnswers.size < count) {
    const wrong = getRandomNumber(min, max);
    if (wrong !== correctAnswer) {
      wrongAnswers.add(wrong);
    }
  }
  return Array.from(wrongAnswers);
};

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a math question
export const generateMathQuestion = (
  difficulty: "easy" | "medium" | "hard"
): MathQuestion => {
  let num1 = 0;
  let num2 = 0;
  let answer = 0;
  const operators = ["+", "-", "×", "÷"];
  let operator = operators[Math.floor(Math.random() * operators.length)];
  let explanation = "";

  switch (difficulty) {
    case "hard":
      num1 = getRandomNumber(10, 50);
      num2 = getRandomNumber(10, 50);
      break;
    case "medium":
      num1 = getRandomNumber(5, 25);
      num2 = getRandomNumber(5, 25);
      break;
    default: // easy
      num1 = getRandomNumber(1, 10);
      num2 = getRandomNumber(1, 10);
      break;
  }

  // Ensure division results in whole numbers
  if (operator === "÷") {
    answer = num1;
    num1 = num2 * answer;
  } else {
    switch (operator) {
      case "+":
        answer = num1 + num2;
        explanation = `${num1} plus ${num2} equals ${answer}`;
        break;
      case "-":
        // Ensure no negative numbers
        if (num2 > num1) [num1, num2] = [num2, num1];
        answer = num1 - num2;
        explanation = `${num1} minus ${num2} equals ${answer}`;
        break;
      case "×":
        answer = num1 * num2;
        explanation = `${num1} times ${num2} equals ${answer}`;
        break;
    }
  }

  // Generate wrong answers within a reasonable range
  const minWrong = Math.max(0, answer - 10);
  const maxWrong = answer + 10;
  const wrongAnswers = generateWrongAnswers(answer, minWrong, maxWrong);

  // Create options array with correct and wrong answers
  const options = shuffleArray([answer, ...wrongAnswers]);

  return {
    id: Date.now(),
    question: `What is ${num1} ${operator} ${num2}?`,
    num1,
    num2,
    operator,
    answer,
    options,
    correctAnswer: answer.toString(),
    explanation: `The answer is ${answer}. ${explanation}! 🎯`,
  };
};

// Generate a set of math questions
export const generateMathQuestions = (count: number = 10): MathQuestion[] => {
  const questions: MathQuestion[] = [];
  const difficulties: ("easy" | "medium" | "hard")[] = [
    "easy",
    "medium",
    "hard",
  ];

  for (let i = 0; i < count; i++) {
    const difficulty = difficulties[Math.floor(i / (count / 3))] || "medium";
    questions.push(generateMathQuestion(difficulty));
  }

  return questions;
};
