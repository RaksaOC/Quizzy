'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Microscope, Star, CheckCircle, XCircle } from 'lucide-react'
import { useGameState } from '../hooks/useGameState'
import GameLayout from './shared/GameLayout'
import PlayerSetup from './shared/PlayerSetup'
import GameResults from './shared/GameResults'

interface ScienceGameProps {
    onBack: () => void
}

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
    type: 'biology' | 'chemistry' | 'physics' | 'earth' | 'space'
    imageUrl?: string
}

const generateQuestions = (): Question[] => {
    const questions: Question[] = [
        {
            id: 1,
            type: 'biology',
            question: "What do plants need to grow?",
            options: ["Sunlight and water", "Ice cream", "Television", "Video games"],
            correctAnswer: "Sunlight and water",
            explanation: "Plants need sunlight and water to make their own food through a process called photosynthesis! 🌱"
        },
        {
            id: 2,
            type: 'biology',
            question: "Which animal lays eggs?",
            options: ["Chicken", "Dog", "Cat", "Cow"],
            correctAnswer: "Chicken",
            explanation: "Chickens lay eggs! Many birds, reptiles, and some other animals lay eggs too. 🥚"
        },
        {
            id: 3,
            type: 'chemistry',
            question: "What happens to water when it gets very cold?",
            options: ["It turns to ice", "It disappears", "It turns to juice", "It becomes hot"],
            correctAnswer: "It turns to ice",
            explanation: "When water gets very cold (below 0°C or 32°F), it freezes and becomes ice! ❄️"
        },
        {
            id: 4,
            type: 'physics',
            question: "What makes things fall down?",
            options: ["Gravity", "Wind", "Magic", "Music"],
            correctAnswer: "Gravity",
            explanation: "Gravity is a force that pulls everything toward Earth. That's why things fall down! 🌍"
        },
        {
            id: 5,
            type: 'physics',
            question: "What makes rainbows appear?",
            options: ["Sunlight and rain", "Magic wands", "Paint", "Crayons"],
            correctAnswer: "Sunlight and rain",
            explanation: "Rainbows appear when sunlight shines through water droplets in the air! 🌈"
        },
        {
            id: 6,
            type: 'space',
            question: "What is the closest star to Earth?",
            options: ["The Sun", "The Moon", "Mars", "Jupiter"],
            correctAnswer: "The Sun",
            explanation: "The Sun is our closest star! It gives us light and heat every day. ☀️"
        },
        {
            id: 7,
            type: 'biology',
            question: "Which body part helps us breathe?",
            options: ["Lungs", "Stomach", "Feet", "Hair"],
            correctAnswer: "Lungs",
            explanation: "Our lungs help us breathe! They take in oxygen from the air and help remove carbon dioxide. 🫁"
        },
        {
            id: 8,
            type: 'chemistry',
            question: "What gas do we need to live?",
            options: ["Oxygen", "Chocolate", "Sugar", "Salt"],
            correctAnswer: "Oxygen",
            explanation: "We need oxygen to live! It's an important gas in the air we breathe. 💨"
        },
        {
            id: 9,
            type: 'space',
            question: "What gives us light during the day?",
            options: ["The Sun", "The Moon", "Light bulbs", "Stars"],
            correctAnswer: "The Sun",
            explanation: "The Sun gives us light and warmth during the day! ☀️"
        },
        {
            id: 10,
            type: 'earth',
            question: "What covers most of Earth?",
            options: ["Water", "Sand", "Rocks", "Trees"],
            correctAnswer: "Water",
            explanation: "Most of Earth is covered by water in our oceans! 🌊"
        },
        {
            id: 11,
            type: 'space',
            question: "What orbits around Earth?",
            options: ["The Moon", "The Sun", "Stars", "Clouds"],
            correctAnswer: "The Moon",
            explanation: "The Moon is Earth's only natural satellite! It orbits around our planet. 🌙"
        },
        {
            id: 12,
            type: 'biology',
            question: "What do baby animals need to grow?",
            options: ["Food and care", "Toys", "Books", "Phones"],
            correctAnswer: "Food and care",
            explanation: "Like human babies, baby animals need food and care from their parents to grow healthy! 🐣"
        },
        {
            id: 13,
            type: 'chemistry',
            question: "What happens to ice cream in the sun?",
            options: ["It melts", "It grows", "It jumps", "It sings"],
            correctAnswer: "It melts",
            explanation: "Ice cream melts when it gets warm! This is called a state change from solid to liquid. 🍦"
        },
        {
            id: 14,
            type: 'physics',
            question: "Why do boats float on water?",
            options: ["Water pushing up", "Magic", "Wings", "Wheels"],
            correctAnswer: "Water pushing up",
            explanation: "Boats float because water pushes up on them! This force is called buoyancy. ⛵"
        },
        {
            id: 15,
            type: 'earth',
            question: "What are clouds made of?",
            options: ["Water vapor", "Cotton", "Smoke", "Paint"],
            correctAnswer: "Water vapor",
            explanation: "Clouds form when water vapor in the air cools and forms tiny water droplets! ☁️"
        }
    ]

    return questions.sort(() => Math.random() - 0.5)
}

export default function ScienceGame({ onBack }: ScienceGameProps) {
    const [questions] = useState(generateQuestions())
    const [showSetup, setShowSetup] = useState(true)
    const [showExplanation, setShowExplanation] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showForfeitModal, setShowForfeitModal] = useState(false)
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
            title="Science Explorer"
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            timeLeft={gameState.timeLeft}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={onBack}
            gradientColors={{
                from: 'green-400',
                via: 'emerald-500',
                to: 'teal-500',
                overlayFrom: 'green-300',
                overlayVia: 'emerald-400',
                overlayTo: 'teal-400'
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
                                <div className="relative rounded-2xl overflow-hidden bg-emerald-500/90 backdrop-blur-sm aspect-video max-w-2xl mx-auto mb-6 border-2 border-white/20 shadow-lg">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white/90 text-center p-8">
                                            <Microscope className="w-16 h-16 mx-auto mb-4" />
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
                                                ? 'bg-emerald-500/80 text-white hover:bg-emerald-600/80 border-2 border-white/20'
                                                : isSelected
                                                    ? isCorrect
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-red-500/90 text-white border-2 border-red-400/50'
                                                    : isCorrect && showExplanation
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-emerald-400/50 text-white/60 border-2 border-white/10'
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
                                    className="mt-8 p-6 bg-emerald-600/80 backdrop-blur-sm rounded-xl text-white border-2 border-white/20 shadow-lg"
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