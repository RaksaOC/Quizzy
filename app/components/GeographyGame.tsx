'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe2, Star, CheckCircle, XCircle } from 'lucide-react'
import { useGameState } from '../hooks/useGameState'
import GameLayout from './shared/GameLayout'
import PlayerSetup from './shared/PlayerSetup'
import GameResults from './shared/GameResults'

interface GeographyGameProps {
    onBack: () => void
}

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
    type: 'continents' | 'countries' | 'landmarks' | 'nature' | 'climate'
    imageUrl?: string
}

const generateQuestions = (): Question[] => {
    const questions: Question[] = [
        {
            id: 1,
            type: 'continents',
            question: "Which continent has kangaroos?",
            options: ["Australia", "Africa", "Europe", "Asia"],
            correctAnswer: "Australia",
            explanation: "Kangaroos live in Australia! It's the only continent where these amazing jumping animals are found naturally. 🦘"
        },
        {
            id: 2,
            type: 'nature',
            question: "What is a desert?",
            options: ["A very dry place", "A forest", "A lake", "A mountain"],
            correctAnswer: "A very dry place",
            explanation: "A desert is a very dry place where it rarely rains. The Sahara Desert is the largest hot desert in the world! 🏜️"
        },
        {
            id: 3,
            type: 'climate',
            question: "Where can you find lots of ice all year?",
            options: ["The North Pole", "The beach", "The jungle", "The desert"],
            correctAnswer: "The North Pole",
            explanation: "The North Pole is covered in ice all year round because it's very cold there! ❄️"
        },
        {
            id: 4,
            type: 'landmarks',
            question: "What is the Great Wall of China?",
            options: ["A very long wall", "A tall mountain", "A big river", "A deep lake"],
            correctAnswer: "A very long wall",
            explanation: "The Great Wall of China is one of the longest walls ever built! It was made to protect China many years ago. 🏰"
        },
        {
            id: 5,
            type: 'nature',
            question: "What is a volcano?",
            options: ["A mountain that can erupt", "A big lake", "A deep cave", "A wide river"],
            correctAnswer: "A mountain that can erupt",
            explanation: "A volcano is a special mountain that can erupt, sending hot lava from deep inside the Earth! 🌋"
        },
        {
            id: 6,
            type: 'climate',
            question: "Where is it usually very hot?",
            options: ["Near the equator", "Near the poles", "In the mountains", "Under the sea"],
            correctAnswer: "Near the equator",
            explanation: "It's usually very hot near the equator because this part of Earth gets the most sunlight! ☀️"
        },
        {
            id: 7,
            type: 'nature',
            question: "What is a river?",
            options: ["Moving water", "Still water", "Ice", "Rain"],
            correctAnswer: "Moving water",
            explanation: "A river is water that flows from high places to low places. Many animals and plants live in and near rivers! 🌊"
        },
        {
            id: 8,
            type: 'landmarks',
            question: "What are pyramids?",
            options: ["Ancient buildings", "Modern houses", "Tall trees", "Big rocks"],
            correctAnswer: "Ancient buildings",
            explanation: "Pyramids are amazing buildings built long ago in Egypt. They were built as tombs for pharaohs! 🔺"
        },
        {
            id: 9,
            type: 'continents',
            question: "Which continent has pandas?",
            options: ["Asia", "Europe", "Africa", "South America"],
            correctAnswer: "Asia",
            explanation: "Giant pandas live in China, which is in Asia! They love eating bamboo and climbing trees. 🐼"
        },
        {
            id: 10,
            type: 'nature',
            question: "What is a mountain?",
            options: ["A very high land", "A flat land", "A body of water", "A hole in the ground"],
            correctAnswer: "A very high land",
            explanation: "A mountain is a very high piece of land that rises high above the surrounding area. Mount Everest is the highest mountain! ⛰️"
        },
        {
            id: 11,
            type: 'climate',
            question: "What makes it rain?",
            options: ["Clouds", "Trees", "Mountains", "Buildings"],
            correctAnswer: "Clouds",
            explanation: "Rain comes from clouds! When water droplets in clouds get heavy enough, they fall as rain. ☔"
        },
        {
            id: 12,
            type: 'landmarks',
            question: "What is the Eiffel Tower?",
            options: ["A tall tower", "A long bridge", "A big house", "A wide road"],
            correctAnswer: "A tall tower",
            explanation: "The Eiffel Tower is a famous tall tower in Paris, France. It's one of the most visited places in the world! 🗼"
        },
        {
            id: 13,
            type: 'nature',
            question: "What is an ocean?",
            options: ["A huge body of water", "A small lake", "A long river", "A wet forest"],
            correctAnswer: "A huge body of water",
            explanation: "An ocean is a huge body of salt water that covers most of Earth. Many amazing sea creatures live in oceans! 🌊"
        },
        {
            id: 14,
            type: 'climate',
            question: "Where can you find a rainforest?",
            options: ["Near the equator", "Near the poles", "In the desert", "On mountains"],
            correctAnswer: "Near the equator",
            explanation: "Rainforests are found near the equator where it's warm and rainy. They're home to many plants and animals! 🌴"
        },
        {
            id: 15,
            type: 'landmarks',
            question: "What is the Statue of Liberty?",
            options: ["A big statue", "A tall building", "A long bridge", "A wide road"],
            correctAnswer: "A big statue",
            explanation: "The Statue of Liberty is a huge statue in New York City. It represents freedom and welcomes people to America! 🗽"
        }
    ]

    return questions.sort(() => Math.random() - 0.5)
}

export default function GeographyGame({ onBack }: GeographyGameProps) {
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
            title="World Explorer"
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            timeLeft={gameState.timeLeft}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={onBack}
            gradientColors={{
                from: 'cyan-400',
                via: 'sky-500',
                to: 'blue-500',
                overlayFrom: 'cyan-300',
                overlayVia: 'sky-400',
                overlayTo: 'blue-400'
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
                                <div className="relative rounded-2xl overflow-hidden bg-sky-500/90 backdrop-blur-sm aspect-video max-w-2xl mx-auto mb-6 border-2 border-white/20 shadow-lg">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white/90 text-center p-8">
                                            <Globe2 className="w-16 h-16 mx-auto mb-4" />
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
                                                ? 'bg-sky-500/80 text-white hover:bg-sky-600/80 border-2 border-white/20'
                                                : isSelected
                                                    ? isCorrect
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-red-500/90 text-white border-2 border-red-400/50'
                                                    : isCorrect && showExplanation
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-sky-400/50 text-white/60 border-2 border-white/10'
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
                                    className="mt-8 p-6 bg-sky-600/80 backdrop-blur-sm rounded-xl text-white border-2 border-white/20 shadow-lg"
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