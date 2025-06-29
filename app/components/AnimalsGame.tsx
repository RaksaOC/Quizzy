'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, Star, Trophy, PawPrint } from 'lucide-react'

interface AnimalsGameProps {
    onBack: () => void
    onScoreUpdate: (points: number) => void
}

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    category: string
    emoji: string
    difficulty: string
}

const questions: Question[] = [
    // Farm Animals
    {
        id: 1,
        question: "What animal gives us milk?",
        options: ["Pig", "Cow", "Sheep", "Chicken"],
        correctAnswer: 1,
        category: "Farm",
        emoji: "🐄",
        difficulty: "Easy"
    },
    {
        id: 2,
        question: "What animal lays eggs?",
        options: ["Cow", "Pig", "Chicken", "Sheep"],
        correctAnswer: 2,
        category: "Farm",
        emoji: "🐔",
        difficulty: "Easy"
    },
    {
        id: 3,
        question: "What animal says 'Oink oink'?",
        options: ["Cow", "Pig", "Sheep", "Horse"],
        correctAnswer: 1,
        category: "Farm",
        emoji: "🐷",
        difficulty: "Easy"
    },
    {
        id: 4,
        question: "What animal gives us wool?",
        options: ["Cow", "Pig", "Sheep", "Goat"],
        correctAnswer: 2,
        category: "Farm",
        emoji: "🐑",
        difficulty: "Easy"
    },
    {
        id: 5,
        question: "What animal can pull a cart?",
        options: ["Pig", "Sheep", "Horse", "Chicken"],
        correctAnswer: 2,
        category: "Farm",
        emoji: "🐎",
        difficulty: "Easy"
    },

    // Wild Animals
    {
        id: 6,
        question: "What is the king of the jungle?",
        options: ["Tiger", "Lion", "Elephant", "Gorilla"],
        correctAnswer: 1,
        category: "Wild",
        emoji: "🦁",
        difficulty: "Easy"
    },
    {
        id: 7,
        question: "What animal has stripes?",
        options: ["Lion", "Tiger", "Elephant", "Giraffe"],
        correctAnswer: 1,
        category: "Wild",
        emoji: "🐯",
        difficulty: "Easy"
    },
    {
        id: 8,
        question: "What animal has a long neck?",
        options: ["Elephant", "Giraffe", "Zebra", "Lion"],
        correctAnswer: 1,
        category: "Wild",
        emoji: "🦒",
        difficulty: "Easy"
    },
    {
        id: 9,
        question: "What animal has a trunk?",
        options: ["Giraffe", "Elephant", "Rhino", "Hippo"],
        correctAnswer: 1,
        category: "Wild",
        emoji: "🐘",
        difficulty: "Easy"
    },
    {
        id: 10,
        question: "What animal has black and white stripes?",
        options: ["Tiger", "Zebra", "Panda", "Penguin"],
        correctAnswer: 1,
        category: "Wild",
        emoji: "🦓",
        difficulty: "Easy"
    },

    // Pets
    {
        id: 11,
        question: "What pet says 'Meow'?",
        options: ["Dog", "Cat", "Bird", "Fish"],
        correctAnswer: 1,
        category: "Pets",
        emoji: "🐱",
        difficulty: "Easy"
    },
    {
        id: 12,
        question: "What pet says 'Woof'?",
        options: ["Cat", "Dog", "Bird", "Fish"],
        correctAnswer: 1,
        category: "Pets",
        emoji: "🐕",
        difficulty: "Easy"
    },
    {
        id: 13,
        question: "What pet can fly?",
        options: ["Cat", "Dog", "Bird", "Fish"],
        correctAnswer: 2,
        category: "Pets",
        emoji: "🐦",
        difficulty: "Easy"
    },
    {
        id: 14,
        question: "What pet lives in water?",
        options: ["Cat", "Dog", "Bird", "Fish"],
        correctAnswer: 3,
        category: "Pets",
        emoji: "🐠",
        difficulty: "Easy"
    },
    {
        id: 15,
        question: "What pet hops?",
        options: ["Cat", "Dog", "Bird", "Rabbit"],
        correctAnswer: 3,
        category: "Pets",
        emoji: "🐰",
        difficulty: "Easy"
    },

    // Sea Animals
    {
        id: 16,
        question: "What sea animal has eight legs?",
        options: ["Fish", "Shark", "Octopus", "Whale"],
        correctAnswer: 2,
        category: "Sea",
        emoji: "🐙",
        difficulty: "Medium"
    },
    {
        id: 17,
        question: "What is the biggest animal in the ocean?",
        options: ["Shark", "Whale", "Dolphin", "Fish"],
        correctAnswer: 1,
        category: "Sea",
        emoji: "🐋",
        difficulty: "Medium"
    },
    {
        id: 18,
        question: "What sea animal has a shell?",
        options: ["Fish", "Crab", "Shark", "Dolphin"],
        correctAnswer: 1,
        category: "Sea",
        emoji: "🦀",
        difficulty: "Easy"
    },
    {
        id: 19,
        question: "What sea animal is very smart?",
        options: ["Shark", "Whale", "Dolphin", "Fish"],
        correctAnswer: 2,
        category: "Sea",
        emoji: "🐬",
        difficulty: "Medium"
    },
    {
        id: 20,
        question: "What sea animal has sharp teeth?",
        options: ["Fish", "Shark", "Dolphin", "Whale"],
        correctAnswer: 1,
        category: "Sea",
        emoji: "🦈",
        difficulty: "Easy"
    },

    // Baby Animals
    {
        id: 21,
        question: "What is a baby cow called?",
        options: ["Puppy", "Kitten", "Calf", "Chick"],
        correctAnswer: 2,
        category: "Babies",
        emoji: "🐮",
        difficulty: "Medium"
    },
    {
        id: 22,
        question: "What is a baby cat called?",
        options: ["Puppy", "Kitten", "Calf", "Chick"],
        correctAnswer: 1,
        category: "Babies",
        emoji: "🐱",
        difficulty: "Easy"
    },
    {
        id: 23,
        question: "What is a baby dog called?",
        options: ["Puppy", "Kitten", "Calf", "Chick"],
        correctAnswer: 0,
        category: "Babies",
        emoji: "🐕",
        difficulty: "Easy"
    },
    {
        id: 24,
        question: "What is a baby chicken called?",
        options: ["Puppy", "Kitten", "Calf", "Chick"],
        correctAnswer: 3,
        category: "Babies",
        emoji: "🐤",
        difficulty: "Easy"
    },
    {
        id: 25,
        question: "What is a baby sheep called?",
        options: ["Puppy", "Kitten", "Lamb", "Chick"],
        correctAnswer: 2,
        category: "Babies",
        emoji: "🐑",
        difficulty: "Medium"
    },

    // Animal Sounds
    {
        id: 26,
        question: "What sound does a cow make?",
        options: ["Moo", "Baa", "Oink", "Cluck"],
        correctAnswer: 0,
        category: "Sounds",
        emoji: "🐄",
        difficulty: "Easy"
    },
    {
        id: 27,
        question: "What sound does a sheep make?",
        options: ["Moo", "Baa", "Oink", "Cluck"],
        correctAnswer: 1,
        category: "Sounds",
        emoji: "🐑",
        difficulty: "Easy"
    },
    {
        id: 28,
        question: "What sound does a pig make?",
        options: ["Moo", "Baa", "Oink", "Cluck"],
        correctAnswer: 2,
        category: "Sounds",
        emoji: "🐷",
        difficulty: "Easy"
    },
    {
        id: 29,
        question: "What sound does a chicken make?",
        options: ["Moo", "Baa", "Oink", "Cluck"],
        correctAnswer: 3,
        category: "Sounds",
        emoji: "🐔",
        difficulty: "Easy"
    },
    {
        id: 30,
        question: "What sound does a horse make?",
        options: ["Moo", "Baa", "Oink", "Neigh"],
        correctAnswer: 3,
        category: "Sounds",
        emoji: "🐎",
        difficulty: "Medium"
    },

    // Animal Homes
    {
        id: 31,
        question: "Where does a bird live?",
        options: ["Nest", "Den", "Hole", "Cave"],
        correctAnswer: 0,
        category: "Homes",
        emoji: "🪺",
        difficulty: "Easy"
    },
    {
        id: 32,
        question: "Where does a bear live?",
        options: ["Nest", "Den", "Hole", "Cave"],
        correctAnswer: 1,
        category: "Homes",
        emoji: "🐻",
        difficulty: "Medium"
    },
    {
        id: 33,
        question: "Where does a rabbit live?",
        options: ["Nest", "Den", "Hole", "Cave"],
        correctAnswer: 2,
        category: "Homes",
        emoji: "🕳️",
        difficulty: "Medium"
    },
    {
        id: 34,
        question: "Where does a fish live?",
        options: ["Nest", "Den", "Water", "Cave"],
        correctAnswer: 2,
        category: "Homes",
        emoji: "🌊",
        difficulty: "Easy"
    },
    {
        id: 35,
        question: "Where does a bee live?",
        options: ["Nest", "Hive", "Hole", "Cave"],
        correctAnswer: 1,
        category: "Homes",
        emoji: "🐝",
        difficulty: "Medium"
    }
]

export default function AnimalsGame({ onBack, onScoreUpdate }: AnimalsGameProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [gameCompleted, setGameCompleted] = useState(false)
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])

    useEffect(() => {
        // Shuffle questions on component mount
        setShuffledQuestions([...questions].sort(() => Math.random() - 0.5))
    }, [])

    const currentQuestion = shuffledQuestions[currentQuestionIndex]

    const handleAnswerSelect = (answerIndex: number) => {
        if (selectedAnswer !== null) return // Prevent multiple selections

        setSelectedAnswer(answerIndex)
        const correct = answerIndex === currentQuestion.correctAnswer

        setIsCorrect(correct)

        if (correct) {
            setScore(prev => prev + 10)
            onScoreUpdate(10)
        }

        // Show result for 2 seconds then move to next question
        setTimeout(() => {
            if (currentQuestionIndex < shuffledQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1)
                setSelectedAnswer(null)
                setIsCorrect(null)
            } else {
                setGameCompleted(true)
            }
        }, 2000)
    }

    const handlePlayAgain = () => {
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setScore(0)
        setGameCompleted(false)
        setShuffledQuestions([...questions].sort(() => Math.random() - 0.5))
    }

    const getEmoji = (isCorrect: boolean | null) => {
        if (isCorrect === null) return "🐾"
        return isCorrect ? "🎉" : "😅"
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Farm': return 'from-orange-500 to-yellow-600'
            case 'Wild': return 'from-brown-500 to-orange-600'
            case 'Pets': return 'from-pink-500 to-purple-600'
            case 'Sea': return 'from-blue-500 to-cyan-600'
            case 'Babies': return 'from-green-500 to-emerald-600'
            case 'Sounds': return 'from-purple-500 to-pink-600'
            case 'Homes': return 'from-gray-500 to-slate-600'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    if (gameCompleted) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-orange-400 via-yellow-500 to-green-500 opacity-30"></div>
                </div>

                {/* Floating Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bubble absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 80 + 40}px`,
                                height: `${Math.random() * 80 + 40}px`,
                                borderRadius: Math.random() > 0.5 ? '50%' : '20px',
                            }}
                            animate={{
                                y: [0, -100, 0],
                                x: [0, Math.random() * 60 - 30, 0],
                                rotate: [0, Math.random() > 0.5 ? 360 : -360, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: Math.random() * 15 + 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-4"
                        >
                            🐾
                        </motion.div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Animal Expert!
                        </h2>

                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full px-6 py-3 mb-6">
                            <div className="flex items-center justify-center gap-2">
                                <Trophy className="w-6 h-6 text-white" />
                                <span className="text-white font-bold text-xl">
                                    Final Score: {score}/{questions.length * 10}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            {score === questions.length * 10
                                ? "Perfect! You're an animal expert! 🦁"
                                : `Amazing! You got ${score / 10} out of ${questions.length} questions right!`}
                        </p>

                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePlayAgain}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all"
                            >
                                Play Again! 🎮
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onBack}
                                className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-all"
                            >
                                Back to Menu 🏠
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    }

    if (shuffledQuestions.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-orange-400 via-yellow-500 to-green-500 opacity-30"></div>
            </div>

            {/* Floating Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="bubble absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 80 + 40}px`,
                            height: `${Math.random() * 80 + 40}px`,
                            borderRadius: Math.random() > 0.5 ? '50%' : '20px',
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 60 - 30, 0],
                            rotate: [0, Math.random() > 0.5 ? 360 : -360, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="flex items-center gap-2 text-white font-bold text-lg mb-6 hover:bg-white/20 rounded-full px-4 py-2 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Menu
                    </motion.button>

                    {/* Progress Bar */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 mb-8">
                        <motion.div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Score Display */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                            <div className="flex items-center gap-2">
                                <Star className="text-yellow-300 w-5 h-5" />
                                <span className="text-white font-bold">Score: {score}</span>
                            </div>
                        </div>

                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                            <span className="text-white font-bold">
                                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
                            </span>
                        </div>
                    </div>

                    {/* Question Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl p-8 shadow-2xl mb-8"
                        >
                            {/* Question Header */}
                            <div className="text-center mb-6">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-4xl mb-4"
                                >
                                    {currentQuestion.emoji}
                                </motion.div>

                                <div className={`bg-gradient-to-r ${getCategoryColor(currentQuestion.category)} text-white px-4 py-2 rounded-full inline-block mb-4`}>
                                    <span className="font-bold">{currentQuestion.category}</span>
                                </div>

                                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full inline-block mb-4">
                                    <span className="font-bold">{currentQuestion.difficulty}</span>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Answer Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{
                                            scale: selectedAnswer === null ? 1.05 : 1,
                                            y: selectedAnswer === null ? -5 : 0
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={selectedAnswer !== null}
                                        className={`
                    relative p-6 rounded-2xl font-bold text-lg transition-all duration-300
                    ${selectedAnswer === null
                                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-gray-800 border-2 border-green-200'
                                                : selectedAnswer === index
                                                    ? index === currentQuestion.correctAnswer
                                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white border-2 border-green-300'
                                                        : 'bg-gradient-to-r from-red-400 to-red-500 text-white border-2 border-red-300'
                                                    : index === currentQuestion.correctAnswer
                                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white border-2 border-green-300'
                                                        : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                                            }
                  `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {selectedAnswer !== null && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {index === currentQuestion.correctAnswer ? (
                                                        <CheckCircle className="w-6 h-6" />
                                                    ) : selectedAnswer === index ? (
                                                        <XCircle className="w-6 h-6" />
                                                    ) : null}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Feedback */}
                            {selectedAnswer !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center mt-6"
                                >
                                    <div className="text-4xl mb-2">
                                        {getEmoji(isCorrect)}
                                    </div>
                                    <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                        {isCorrect ? 'Correct! Well done! 🎉' : `Oops! The correct answer was "${currentQuestion.options[currentQuestion.correctAnswer]}"`}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
} 