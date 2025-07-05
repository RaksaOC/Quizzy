import { useState, useEffect, useCallback } from "react";

export interface Player {
  name: string;
  avatar: string;
  score: number;
  roundsWon: number;
}

export interface GameState {
  players: [Player, Player];
  currentPlayerIndex: number;
  timeLeft: number;
  currentRound: number;
  totalRounds: number;
  isGameOver: boolean;
  currentQuestion: any;
  hasAnswered: boolean[];
}

interface UseGameStateProps {
  initialRounds: number;
  timePerTurn: number;
  generateQuestion: () => any;
}

export function useGameState({
  initialRounds,
  timePerTurn,
  generateQuestion,
}: UseGameStateProps) {
  const [gameState, setGameState] = useState<GameState>({
    players: [
      { name: "", avatar: "", score: 0, roundsWon: 0 },
      { name: "", avatar: "", score: 0, roundsWon: 0 },
    ],
    currentPlayerIndex: 0,
    timeLeft: timePerTurn,
    currentRound: 1,
    totalRounds: initialRounds,
    isGameOver: false,
    currentQuestion: null,
    hasAnswered: [false, false],
  });

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && gameState.timeLeft > 0 && !gameState.isGameOver) {
      timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, gameState.timeLeft, gameState.isGameOver]);

  // Watch for time running out
  useEffect(() => {
    if (gameState.timeLeft === 0 && !gameState.isGameOver) {
      handleTimeUp();
    }
  }, [gameState.timeLeft]);

  const initializePlayers = (
    player1Name: string,
    player1Avatar: string,
    player2Name: string,
    player2Avatar: string
  ) => {
    setGameState((prev) => ({
      ...prev,
      players: [
        { name: player1Name, avatar: player1Avatar, score: 0, roundsWon: 0 },
        { name: player2Name, avatar: player2Avatar, score: 0, roundsWon: 0 },
      ],
      currentQuestion: generateQuestion(),
      timeLeft: timePerTurn,
      currentPlayerIndex: 0,
      hasAnswered: [false, false],
    }));
    setIsTimerRunning(true);
  };

  const moveToNextPlayer = (currentState: GameState): GameState => {
    const nextPlayerIndex = 1 - currentState.currentPlayerIndex;

    // If both players have answered, move to next round
    if (currentState.hasAnswered[0] && currentState.hasAnswered[1]) {
      // Determine round winner
      const roundScores = [
        currentState.players[0].score,
        currentState.players[1].score,
      ];

      if (roundScores[0] > roundScores[1]) {
        currentState.players[0].roundsWon++;
      } else if (roundScores[1] > roundScores[0]) {
        currentState.players[1].roundsWon++;
      }

      // Check if game is over
      if (currentState.currentRound === currentState.totalRounds) {
        currentState.isGameOver = true;
        return currentState;
      }

      // Setup next round
      return {
        ...currentState,
        currentRound: currentState.currentRound + 1,
        currentPlayerIndex: 0,
        hasAnswered: [false, false],
        timeLeft: timePerTurn,
        currentQuestion: generateQuestion(),
      };
    }

    // Just move to next player within the same round
    return {
      ...currentState,
      currentPlayerIndex: nextPlayerIndex,
      timeLeft: timePerTurn,
    };
  };

  const handleAnswer = (
    playerIndex: number,
    isCorrect: boolean,
    timeBonus: number = 0
  ) => {
    setGameState((prev) => {
      // Update current player's answer and score
      const newState = { ...prev };
      const points = isCorrect ? 10 + timeBonus : 0;
      newState.players[playerIndex].score += points;
      newState.hasAnswered[playerIndex] = true;

      // Move to next player or round
      const updatedState = moveToNextPlayer(newState);

      // Restart timer for next player/round if game isn't over
      if (!updatedState.isGameOver) {
        setIsTimerRunning(true);
      }

      return updatedState;
    });
  };

  const handleTimeUp = () => {
    setIsTimerRunning(false);

    // Auto-submit wrong answer for current player if they haven't answered
    if (!gameState.hasAnswered[gameState.currentPlayerIndex]) {
      handleAnswer(gameState.currentPlayerIndex, false, 0);
    }
  };

  const forfeitGame = (playerIndex: number) => {
    setGameState((prev) => {
      const newState = { ...prev };
      newState.isGameOver = true;
      return newState;
    });
    setIsTimerRunning(false);
  };

  return {
    gameState,
    initializePlayers,
    handleAnswer,
    forfeitGame,
    isTimerRunning,
  };
}
