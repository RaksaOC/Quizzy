import { ImageQuestion, MultipleChoiceQuestion } from "../types";
import { shuffleArray, shuffleChoices } from "./helpers";

export const digitalLiteracyQuestions: ImageQuestion[] = [
  {
    id: 1,
    question: "Which device helps us learn and do homework?",
    imageUrl: "/images/laptop.jpg",
    options: ["Computer 💻", "Game Console 🎮", "TV 📺", "Radio 📻"],
    correctAnswer: "Computer 💻",
    explanation:
      "Computers help us learn, do homework, and find information! 🌟",
  },
  {
    id: 2,
    question: "What should you do when a stranger messages you?",
    imageUrl: "/images/message.jpg",
    options: [
      "Tell an Adult 🤝",
      "Reply Back 💬",
      "Share Address 🏠",
      "Make Friends 👥",
    ],
    correctAnswer: "Tell an Adult 🤝",
    explanation:
      "Always tell a grown-up when strangers try to talk to you online! 🛡️",
  },
  {
    id: 3,
    question: "Which password is the safest to use?",
    imageUrl: "/images/password.jpg",
    options: ["Kj9#mP2$vL 🔒", "password123 🔑", "your_name 👤", "birthday 🎂"],
    correctAnswer: "Kj9#mP2$vL 🔒",
    explanation:
      "Mix letters, numbers, and symbols to make strong passwords! 💪",
  },
  {
    id: 4,
    question: "What should you NOT share online?",
    imageUrl: "/images/sharing.jpg",
    options: [
      "Home Address 🏠",
      "Favorite Color 🎨",
      "Favorite Game 🎮",
      "Favorite Food 🍕",
    ],
    correctAnswer: "Home Address 🏠",
    explanation: "Keep personal information private to stay safe! 🛡️",
  },
  {
    id: 5,
    question: "Which is safe to post online?",
    imageUrl: "/images/social.jpg",
    options: [
      "Art You Made 🎨",
      "Phone Number 📱",
      "School Name 🏫",
      "House Keys 🔑",
    ],
    correctAnswer: "Art You Made 🎨",
    explanation: "Sharing your creativity is fun and safe! 🌈",
  },
  {
    id: 6,
    question: "What should you do before downloading a new app?",
    imageUrl: "/images/download.jpg",
    options: [
      "Ask Parents 👨‍👩‍👧‍👦",
      "Download Fast ⚡",
      "Click All Buttons 🔘",
      "Share Link 🔗",
    ],
    correctAnswer: "Ask Parents 👨‍👩‍👧‍👦",
    explanation: "Always get permission before downloading new apps! 📱",
  },
  {
    id: 7,
    question: "How long should you use screens before taking a break?",
    imageUrl: "/images/screen-time.jpg",
    options: ["20 Minutes ⏰", "3 Hours ⌚", "All Day 📅", "Never Stop 🔄"],
    correctAnswer: "20 Minutes ⏰",
    explanation: "Take regular breaks to protect your eyes! 👀",
  },
  {
    id: 8,
    question: "What makes a good online friend?",
    imageUrl: "/images/friends.jpg",
    options: [
      "Kind Words 💭",
      "Asking for Money 💰",
      "Mean Comments 😠",
      "Sharing Secrets 🤫",
    ],
    correctAnswer: "Kind Words 💭",
    explanation: "Good friends are kind and respectful online! 🤗",
  },
];

// Helper function to get a random subset of questions
export const getRandomDigitalLiteracyQuestions = (
  count: number = 5
): MultipleChoiceQuestion[] => {
  return shuffleArray(digitalLiteracyQuestions)
    .slice(0, count)
    .map((question) => shuffleChoices(question));
};
