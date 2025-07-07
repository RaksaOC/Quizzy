// Shuffle array helper
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate random number within range
export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Get random items from array
export const getRandomItems = <T>(array: T[], count: number): T[] =>
  shuffleArray(array).slice(0, count);

// Calculate time bonus based on time left
export const calculateTimeBonus = (timeLeft: number, maxTime: number): number =>
  Math.round((timeLeft / maxTime) * 10);

// Format time for display (mm:ss)
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Generate unique ID
export const generateId = (): number => Date.now();

// Check if arrays are equal (for color patterns)
export const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
};

// Capitalize first letter of string
export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Get random emoji from list
export const getRandomEmoji = (emojiList: string[]): string =>
  emojiList[Math.floor(Math.random() * emojiList.length)];

// Calculate percentage
export const calculatePercentage = (value: number, total: number): number =>
  Math.round((value / total) * 100);

// Generate feedback based on score
export const generateFeedback = (score: number, maxScore: number): string => {
  const percentage = calculatePercentage(score, maxScore);
  if (percentage >= 90) return "Amazing! 🌟";
  if (percentage >= 70) return "Great job! 👏";
  if (percentage >= 50) return "Good effort! 💪";
  return "Keep practicing! 📚";
};
