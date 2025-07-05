'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain } from 'lucide-react'
import { useGameState, Player } from '../hooks/useGameState'
import GameLayout from './shared/GameLayout'
import PlayerSetup from './shared/PlayerSetup'
import GameResults from './shared/GameResults'

interface QuizGameProps {
    onBack: () => void
}

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: string
    category: string
    emoji: string
}

const CATEGORIES = [
    { name: 'Nature', emoji: '🌿' },
    { name: 'Animals', emoji: '🐾' },
    { name: 'Food', emoji: '🍔' },
    { name: 'Science', emoji: '🔬' },
    { name: 'Space', emoji: '🚀' }
]

const generateQuestions = (): Question[] => {
    // This is a simplified version - you would have a larger question bank
    return [
        {
            id: 1,
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Mercury"],
            correctAnswer: "Mars",
            category: "Space",
            emoji: "🚀"
        },
        {
            id: 2,
            question: "What is the largest animal on Earth?",
            options: ["Blue Whale", "African Elephant", "Giraffe", "Hippopotamus"],
            correctAnswer: "Blue Whale",
            category: "Animals",
            emoji: "🐋"
        },
        // Add more questions...
    ]
}

export default function QuizGame({ onBack }: QuizGameProps) {
    const [questions] = useState(generateQuestions())
    const [showSetup, setShowSetup] = useState(true)

    const {
        gameState,
        initializePlayers,
        handleAnswer,
        forfeitGame,
        isTimerRunning
    } = useGameState({
        initialRounds: questions.length,
        timePerTurn: 15,
        generateQuestion: () => questions[gameState.currentRound - 1]
    })

    const handlePlayerSetup = (
        player1Name: string,
        player1Avatar: string,
        player2Name: string,
        player2Avatar: string
    ) => {
        initializePlayers(player1Name, player1Avatar, player2Name, player2Avatar)
        setShowSetup(false)
    }

    const handleAnswerSelect = (answer: string) => {
        const isCorrect = answer === gameState.currentQuestion.correctAnswer
        const timeBonus = Math.round((gameState.timeLeft / 15) * 5) // Up to 5 bonus points based on speed
        handleAnswer(gameState.currentPlayerIndex, isCorrect, timeBonus)
    }

    if (showSetup) {
        return <PlayerSetup onComplete={handlePlayerSetup} />
    }

    if (gameState.isGameOver) {
        const winner = gameState.players[0].score > gameState.players[1].score ?
            gameState.players[0] : gameState.players[1]
        const loser = winner === gameState.players[0] ?
            gameState.players[1] : gameState.players[0]

        return (
            <GameResults
                winner={winner}
                loser={loser}
                onPlayAgain={() => window.location.reload()}
                onBack={onBack}
            />
        )
    }

    return (
        <GameLayout
            title="Fun Quiz"
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            timeLeft={gameState.timeLeft}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={onBack}
            gradientColors={{
                from: 'blue-400',
                via: 'purple-500',
                to: 'pink-600',
                overlayFrom: 'cyan-400',
                overlayVia: 'blue-500',
                overlayTo: 'indigo-500'
            }}
        >
            <div className="space-y-8">
                {/* Category Badge */}
                <div className="flex justify-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                    >
                        <span className="text-white font-medium">
                            {gameState.currentQuestion.category} {gameState.currentQuestion.emoji}
                        </span>
                    </motion.div>
                </div>

                {/* Question */}
                <motion.div
                    key={gameState.currentQuestion.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-8">
                        {gameState.currentQuestion.question}
                    </h3>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {gameState.currentQuestion.options.map((option: string, index: number) => (
                            <motion.button
                                key={option}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={gameState.hasAnswered[gameState.currentPlayerIndex]}
                                className={`
                                    w-full p-4 rounded-xl text-left font-medium
                                    ${gameState.hasAnswered[gameState.currentPlayerIndex]
                                        ? option === gameState.currentQuestion.correctAnswer
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white/10 text-white/60'
                                        : 'bg-white/20 text-white hover:bg-white/30'}
                                    transition-colors
                                `}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </GameLayout>
    )
} 