'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Laptop, Timer, Star, Trophy, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { useGameState } from '../hooks/useGameState'
import GameLayout from './shared/GameLayout'
import PlayerSetup from './shared/PlayerSetup'
import GameResults from './shared/GameResults'
import AnimatedBackground from './shared/AnimatedBackground'

interface DigitalLiteracyGameProps {
    onBack: () => void
}

interface Question {
    id: number
    question: string
    imageUrl?: string
    options: string[]
    correctAnswer: string
    explanation: string
}

const generateQuestions = (): Question[] => {
    const questions = [
        {
            id: 1,
            question: "Which device helps us learn and do homework?",
            imageUrl: "/images/laptop.jpg",
            options: ["Computer 💻", "Game Console 🎮", "TV 📺", "Radio 📻"],
            correctAnswer: "Computer 💻",
            explanation: "Computers help us learn, do homework, and find information! 🌟"
        },
        {
            id: 2,
            question: "What should you do when a stranger messages you?",
            imageUrl: "/images/message.jpg",
            options: ["Tell an Adult 🤝", "Reply Back 💬", "Share Address 🏠", "Make Friends 👥"],
            correctAnswer: "Tell an Adult 🤝",
            explanation: "Always tell a grown-up when strangers try to talk to you online! 🛡️"
        },
        {
            id: 3,
            question: "Which password is the safest to use?",
            imageUrl: "/images/password.jpg",
            options: ["Kj9#mP2$vL 🔒", "password123 🔑", "your_name 👤", "birthday 🎂"],
            correctAnswer: "Kj9#mP2$vL 🔒",
            explanation: "Mix letters, numbers, and symbols to make strong passwords! 💪"
        },
        {
            id: 4,
            question: "What should you NOT share online?",
            imageUrl: "/images/sharing.jpg",
            options: ["Home Address 🏠", "Favorite Color 🎨", "Favorite Game 🎮", "Favorite Food 🍕"],
            correctAnswer: "Home Address 🏠",
            explanation: "Keep personal information private to stay safe! 🛡️"
        },
        {
            id: 5,
            question: "Which is safe to post online?",
            imageUrl: "/images/social.jpg",
            options: ["Art You Made 🎨", "Phone Number 📱", "School Name 🏫", "House Keys 🔑"],
            correctAnswer: "Art You Made 🎨",
            explanation: "Sharing your creativity is fun and safe! 🌈"
        }
    ]

    return [...questions].sort(() => Math.random() - 0.5)
}

export default function DigitalLiteracyGame({ onBack }: DigitalLiteracyGameProps) {
    const [questions] = useState(generateQuestions())
    const [showSetup, setShowSetup] = useState(true)
    const [showExplanation, setShowExplanation] = useState(false)
    const [showForfeitModal, setShowForfeitModal] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [usedQuestions] = useState(new Set<number>())

    const getNextQuestion = () => {
        let availableQuestions = questions.filter(q => !usedQuestions.has(q.id))
        if (availableQuestions.length === 0) {
            // Reset if all questions have been used
            usedQuestions.clear()
            availableQuestions = questions
        }
        const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        usedQuestions.add(question.id)
        return question
    }

    const {
        gameState,
        initializePlayers,
        handleAnswer,
        isTimerRunning
    } = useGameState({
        initialRounds: questions.length,
        timePerTurn: 20,
        generateQuestion: getNextQuestion
    })

    // Reset explanation when player/round changes
    useEffect(() => {
        setShowExplanation(false)
        setSelectedAnswer(null)
    }, [gameState.currentPlayerIndex, gameState.currentRound])

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
        if (gameState.hasAnswered[gameState.currentPlayerIndex] || showExplanation) {
            return
        }

        setSelectedAnswer(answer)
        const isCorrect = answer === gameState.currentQuestion.correctAnswer
        const timeBonus = Math.round((gameState.timeLeft / 20) * 10) // More points for faster answers

        setShowExplanation(true)

        setTimeout(() => {
            handleAnswer(gameState.currentPlayerIndex, isCorrect, timeBonus)
        }, 2000)
    }

    const handleForfeit = () => {
        setShowForfeitModal(true)
    }

    if (showSetup) {
        return <PlayerSetup onComplete={handlePlayerSetup} />
    }

    if (gameState.isGameOver || showForfeitModal) {
        const winner = gameState.players[0].score > gameState.players[1].score
            ? gameState.players[0]
            : gameState.players[1]
        const loser = winner === gameState.players[0]
            ? gameState.players[1]
            : gameState.players[0]

        return (
            <GameResults
                winner={winner}
                loser={loser}
                onPlayAgain={() => window.location.reload()}
                onBack={onBack}
                forfeit={showForfeitModal}
            />
        )
    }

    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    const currentQuestion = gameState.currentQuestion
    const timeLeftPercentage = (gameState.timeLeft / 20) * 100

    return (
        <GameLayout
            title="Digital Literacy"
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            timeLeft={gameState.timeLeft}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={onBack}
            gradientColors={{
                from: 'cyan-400',
                via: 'blue-500',
                to: 'indigo-600',
                overlayFrom: 'teal-400',
                overlayVia: 'cyan-500',
                overlayTo: 'blue-500'
            }}
        >
            <div className="space-y-8">
                {/* Player Turn and Score */}
                <div className="flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center"
                    >
                        <h3 className="text-xl text-white font-medium">
                            {currentPlayer.name}'s Turn
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                    >
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-300" />
                            <span className="text-white font-bold">Score: {currentPlayer.score}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Timer Bar */}
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: `${timeLeftPercentage}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full transition-colors ${timeLeftPercentage > 50 ? 'bg-green-500' :
                            timeLeftPercentage > 25 ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}
                    />
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${gameState.currentRound}-${gameState.currentPlayerIndex}`}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="text-center"
                    >
                        {/* Question */}
                        <div className="mb-8">
                            {currentQuestion.imageUrl && (
                                <div className="relative rounded-2xl overflow-hidden bg-indigo-600/90 backdrop-blur-sm aspect-video max-w-2xl mx-auto mb-6 border-2 border-white/20 shadow-lg">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white/90 text-center p-8">
                                            <Laptop className="w-16 h-16 mx-auto mb-4" />
                                            <span className="text-xl font-medium">Round {gameState.currentRound}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h3 className="text-3xl font-bold text-white mb-8 text-shadow-lg">
                                {currentQuestion.question}
                            </h3>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {currentQuestion.options.map((option: string, index: number) => {
                                const isSelected = selectedAnswer === option
                                const isCorrect = option === currentQuestion.correctAnswer

                                return (
                                    <motion.button
                                        key={index}
                                        whileHover={{
                                            scale: !selectedAnswer ? 1.05 : 1,
                                            y: !selectedAnswer ? -5 : 0
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswerSelect(option)}
                                        disabled={!!selectedAnswer}
                                        className={`
                                            relative p-6 rounded-xl text-left font-medium
                                            ${!selectedAnswer
                                                ? 'bg-indigo-500/80 text-white hover:bg-indigo-600/80 border-2 border-white/20'
                                                : isSelected
                                                    ? isCorrect
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-red-500/90 text-white border-2 border-red-400/50'
                                                    : isCorrect && showExplanation
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-indigo-400/50 text-white/60 border-2 border-white/10'
                                            }
                                            transition-all duration-300 shadow-lg
                                        `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-3 text-lg">
                                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                {option}
                                            </span>
                                            {selectedAnswer && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {isCorrect ? (
                                                        <CheckCircle className="w-6 h-6" />
                                                    ) : isSelected ? (
                                                        <XCircle className="w-6 h-6" />
                                                    ) : null}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Explanation */}
                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mt-8 p-6 bg-indigo-600/80 backdrop-blur-sm rounded-xl text-white border-2 border-white/20 shadow-lg"
                                >
                                    <p className="text-xl font-medium">
                                        {currentQuestion.explanation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>

                {/* Forfeit Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleForfeit}
                    className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all"
                >
                    Forfeit Game
                </motion.button>
            </div>
        </GameLayout>
    )
} 