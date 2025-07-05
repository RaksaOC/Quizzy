'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cat, Star, CheckCircle, XCircle } from 'lucide-react'
import { useGameState } from '../hooks/useGameState'
import GameLayout from './shared/GameLayout'
import PlayerSetup from './shared/PlayerSetup'
import GameResults from './shared/GameResults'

interface AnimalsGameProps {
    onBack: () => void
}

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
    type: 'mammals' | 'birds' | 'reptiles' | 'fish' | 'insects'
    imageUrl?: string
}

const generateQuestions = (): Question[] => {
    const questions: Question[] = [
        {
            id: 1,
            type: 'mammals',
            question: "Which animal is known as the king of the jungle?",
            options: ["Lion", "Tiger", "Elephant", "Giraffe"],
            correctAnswer: "Lion",
            explanation: "Lions are called the kings of the jungle because they are strong and brave! Male lions have big manes that look like crowns. 🦁"
        },
        {
            id: 2,
            type: 'mammals',
            question: "Which animal has black and white stripes?",
            options: ["Zebra", "Giraffe", "Horse", "Cow"],
            correctAnswer: "Zebra",
            explanation: "Zebras have beautiful black and white stripes that make them unique! These stripes help protect them from predators. 🦓"
        },
        {
            id: 3,
            type: 'mammals',
            question: "Which animal has a very long neck?",
            options: ["Giraffe", "Horse", "Elephant", "Lion"],
            correctAnswer: "Giraffe",
            explanation: "Giraffes have very long necks that help them eat leaves from tall trees! They are the tallest land animals. 🦒"
        },
        {
            id: 4,
            type: 'birds',
            question: "Which bird cannot fly?",
            options: ["Penguin", "Eagle", "Parrot", "Duck"],
            correctAnswer: "Penguin",
            explanation: "Penguins can't fly in the air, but they are excellent swimmers! They use their wings like flippers to swim fast. 🐧"
        },
        {
            id: 5,
            type: 'mammals',
            question: "Which animal has a trunk?",
            options: ["Elephant", "Rhino", "Hippo", "Giraffe"],
            correctAnswer: "Elephant",
            explanation: "Elephants use their long trunks to grab food, drink water, and even give themselves baths! 🐘"
        },
        {
            id: 6,
            type: 'reptiles',
            question: "Which animal changes color to hide?",
            options: ["Chameleon", "Snake", "Lizard", "Turtle"],
            correctAnswer: "Chameleon",
            explanation: "Chameleons can change their color to match their surroundings! This helps them hide from danger. 🦎"
        },
        {
            id: 7,
            type: 'mammals',
            question: "Which animal hops and carries babies in a pouch?",
            options: ["Kangaroo", "Rabbit", "Deer", "Horse"],
            correctAnswer: "Kangaroo",
            explanation: "Kangaroos are special animals that hop on two legs and carry their babies in pouches! 🦘"
        },
        {
            id: 8,
            type: 'birds',
            question: "Which bird makes a 'hoot' sound?",
            options: ["Owl", "Duck", "Chicken", "Eagle"],
            correctAnswer: "Owl",
            explanation: "Owls make a 'hoot' sound and can see very well at night! They are nocturnal birds. 🦉"
        },
        {
            id: 9,
            type: 'fish',
            question: "Which fish is orange and white with stripes?",
            options: ["Clownfish", "Shark", "Goldfish", "Tuna"],
            correctAnswer: "Clownfish",
            explanation: "Clownfish are small, colorful fish that live in the sea! They are orange with white stripes. 🐠"
        },
        {
            id: 10,
            type: 'mammals',
            question: "Which animal likes to eat bamboo?",
            options: ["Panda", "Bear", "Tiger", "Lion"],
            correctAnswer: "Panda",
            explanation: "Giant pandas love to eat bamboo! They can eat up to 40 pounds of bamboo every day. 🐼"
        },
        {
            id: 11,
            type: 'insects',
            question: "Which insect makes honey?",
            options: ["Bee", "Ant", "Butterfly", "Spider"],
            correctAnswer: "Bee",
            explanation: "Bees are amazing insects that make honey! They also help flowers grow by spreading pollen. 🐝"
        },
        {
            id: 12,
            type: 'reptiles',
            question: "Which animal carries its house on its back?",
            options: ["Turtle", "Snake", "Lizard", "Frog"],
            correctAnswer: "Turtle",
            explanation: "Turtles carry their shells everywhere they go! The shell is like a house that protects them. 🐢"
        },
        {
            id: 13,
            type: 'birds',
            question: "Which bird swims in water?",
            options: ["Duck", "Eagle", "Parrot", "Chicken"],
            correctAnswer: "Duck",
            explanation: "Ducks are great swimmers! They have special webbed feet that help them paddle in the water. 🦆"
        },
        {
            id: 14,
            type: 'mammals',
            question: "Which animal barks and is called man's best friend?",
            options: ["Dog", "Cat", "Horse", "Rabbit"],
            correctAnswer: "Dog",
            explanation: "Dogs are friendly animals that make great pets! They are loyal and love to play with people. 🐕"
        },
        {
            id: 15,
            type: 'insects',
            question: "Which insect turns into a beautiful butterfly?",
            options: ["Caterpillar", "Ant", "Spider", "Bee"],
            correctAnswer: "Caterpillar",
            explanation: "Caterpillars turn into beautiful butterflies! This amazing change is called metamorphosis. 🐛 → 🦋"
        }
    ]

    return questions.sort(() => Math.random() - 0.5)
}

export default function AnimalsGame({ onBack }: AnimalsGameProps) {
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
            title="Animal Kingdom"
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            timeLeft={gameState.timeLeft}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={onBack}
            gradientColors={{
                from: 'emerald-400',
                via: 'green-500',
                to: 'teal-500',
                overlayFrom: 'emerald-300',
                overlayVia: 'green-400',
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
                                            <Cat className="w-16 h-16 mx-auto mb-4" />
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