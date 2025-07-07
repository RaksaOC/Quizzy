import { useState, useEffect, useCallback } from "react";
import { Player, GameState, PlayerGameState } from "../utils/types";

interface UseGameStateProps {
  initialRounds: number;
  timePerTurn: number;
  generateQuestion: (playerIndex: number) => any;
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
    currentRound: 1,
    totalRounds: initialRounds,
    isGameOver: false,
    playerStates: [
      {
        hasAnswered: false,
        timeLeft: timePerTurn,
        currentQuestion: null,
        answeredQuestions: [],
      },
      {
        hasAnswered: false,
        timeLeft: timePerTurn,
        currentQuestion: null,
        answeredQuestions: [],
      },
    ],
    remainingQuestions: [],
  });

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      isTimerRunning &&
      gameState.playerStates[gameState.currentPlayerIndex].timeLeft > 0 &&
      !gameState.isGameOver
    ) {
      timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          playerStates: [
            prev.currentPlayerIndex === 0
              ? {
                  ...prev.playerStates[0],
                  timeLeft: prev.playerStates[0].timeLeft - 1,
                }
              : prev.playerStates[0],
            prev.currentPlayerIndex === 1
              ? {
                  ...prev.playerStates[1],
                  timeLeft: prev.playerStates[1].timeLeft - 1,
                }
              : prev.playerStates[1],
          ] as [PlayerGameState, PlayerGameState],
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [
    isTimerRunning,
    gameState.playerStates,
    gameState.currentPlayerIndex,
    gameState.isGameOver,
  ]);

  // Watch for time running out
  useEffect(() => {
    if (
      gameState.playerStates[gameState.currentPlayerIndex].timeLeft === 0 &&
      !gameState.isGameOver
    ) {
      handleTimeUp();
    }
  }, [gameState.playerStates, gameState.currentPlayerIndex]);

  const getNewQuestion = useCallback(
    (playerIndex: number) => {
      const question = generateQuestion(playerIndex);
      return question;
    },
    [generateQuestion]
  );

  const initializePlayers = (
    player1Name: string,
    player1Avatar: string,
    player2Name: string,
    player2Avatar: string
  ) => {
    const question1 = getNewQuestion(0);
    const question2 = getNewQuestion(1);

    setGameState((prev) => ({
      ...prev,
      players: [
        { name: player1Name, avatar: player1Avatar, score: 0, roundsWon: 0 },
        { name: player2Name, avatar: player2Avatar, score: 0, roundsWon: 0 },
      ],
      playerStates: [
        {
          hasAnswered: false,
          timeLeft: timePerTurn,
          currentQuestion: question1,
          answeredQuestions: [],
        },
        {
          hasAnswered: false,
          timeLeft: timePerTurn,
          currentQuestion: question2,
          answeredQuestions: [],
        },
      ],
      currentPlayerIndex: 0,
    }));
    setIsTimerRunning(true);
  };

  const moveToNextPlayer = (currentState: GameState): GameState => {
    const nextPlayerIndex = 1 - currentState.currentPlayerIndex;

    // If both players have answered, move to next round
    if (
      currentState.playerStates[0].hasAnswered &&
      currentState.playerStates[1].hasAnswered
    ) {
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

      // Generate new questions for next round
      const question1 = getNewQuestion(0);
      const question2 = getNewQuestion(1);

      // Setup next round
      return {
        ...currentState,
        currentRound: currentState.currentRound + 1,
        currentPlayerIndex: 0,
        playerStates: [
          {
            hasAnswered: false,
            timeLeft: timePerTurn,
            currentQuestion: question1,
            answeredQuestions: [],
          },
          {
            hasAnswered: false,
            timeLeft: timePerTurn,
            currentQuestion: question2,
            answeredQuestions: [],
          },
        ] as [PlayerGameState, PlayerGameState],
      };
    }

    // Just move to next player within the same round
    return {
      ...currentState,
      currentPlayerIndex: nextPlayerIndex,
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

      // Mark current question as answered
      newState.playerStates[playerIndex].hasAnswered = true;
      newState.playerStates[playerIndex].answeredQuestions.push(
        newState.playerStates[playerIndex].currentQuestion.id
      );

      // Move to next player or round
      const updatedState = moveToNextPlayer(newState);

      // Restart timer for next player/round if game isn't over
      if (!updatedState.isGameOver) {
        updatedState.playerStates[updatedState.currentPlayerIndex].timeLeft =
          timePerTurn;
        setIsTimerRunning(true);
      }

      return updatedState;
    });
  };

  const handleTimeUp = () => {
    setIsTimerRunning(false);

    // Auto-submit wrong answer for current player if they haven't answered
    if (!gameState.playerStates[gameState.currentPlayerIndex].hasAnswered) {
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
