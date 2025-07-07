// Player Types
export interface Player {
  name: string;
  avatar: string;
  score: number;
  roundsWon: number;
}

// Question Types
export interface BaseQuestion {
  id: number;
  question: string;
  explanation: string;
  image?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  options: string[];
  correctAnswer: string;
  category?: string;
}

export interface ImageQuestion extends MultipleChoiceQuestion {
  imageUrl?: string;
}

export interface MathQuestion extends BaseQuestion {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
  options: number[];
  correctAnswer: string;
}

export interface ColorQuestion extends BaseQuestion {
  pattern: string[];
  options: string[][];
  correctAnswer: number;
}

export interface AnimalQuestion extends BaseQuestion {
  name: string;
  emoji: string;
  options: string[];
  facts: string[];
  correctAnswer: string;
}

export interface GeographyQuestion extends BaseQuestion {
  name: string;
  type: "country" | "city" | "landmark";
  options: string[];
  facts: string[];
  correctAnswer: string;
}

export interface ScienceQuestion extends BaseQuestion {
  category: "biology" | "chemistry" | "physics" | "space" | "earth";
  options: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
}

// Game Settings Types
export interface GameColors {
  from: string;
  via: string;
  to: string;
  overlayFrom: string;
  overlayVia: string;
  overlayTo: string;
}

export interface PlayerGameState {
  hasAnswered: boolean;
  timeLeft: number;
  currentQuestion: any;
  answeredQuestions: number[]; // Track question IDs that have been answered
}

export interface GameState {
  players: [Player, Player];
  currentPlayerIndex: number;
  currentRound: number;
  totalRounds: number;
  isGameOver: boolean;
  playerStates: [PlayerGameState, PlayerGameState];
  remainingQuestions: any[]; // Questions that haven't been used yet
}
