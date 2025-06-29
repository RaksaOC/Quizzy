'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, Star, Trophy, Globe } from 'lucide-react'

interface GeographyGameProps {
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
    // Countries
    {
        id: 1,
        question: "What country has the Statue of Liberty?",
        options: ["Canada", "United States", "Mexico", "France"],
        correctAnswer: 1,
        category: "Countries",
        emoji: "🗽",
        difficulty: "Easy"
    },
    {
        id: 2,
        question: "What country is famous for pizza?",
        options: ["Spain", "France", "Italy", "Greece"],
        correctAnswer: 2,
        category: "Countries",
        emoji: "🍕",
        difficulty: "Easy"
    },
    {
        id: 3,
        question: "What country has the Eiffel Tower?",
        options: ["Germany", "France", "Spain", "Italy"],
        correctAnswer: 1,
        category: "Countries",
        emoji: "🗼",
        difficulty: "Easy"
    },
    {
        id: 4,
        question: "What country is shaped like a boot?",
        options: ["Spain", "France", "Italy", "Greece"],
        correctAnswer: 2,
        category: "Countries",
        emoji: "👢",
        difficulty: "Medium"
    },
    {
        id: 5,
        question: "What country has kangaroos?",
        options: ["New Zealand", "Australia", "South Africa", "India"],
        correctAnswer: 1,
        category: "Countries",
        emoji: "🦘",
        difficulty: "Easy"
    },

    // Cities
    {
        id: 6,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        correctAnswer: 2,
        category: "Cities",
        emoji: "🏛️",
        difficulty: "Easy"
    },
    {
        id: 7,
        question: "What is the capital of Japan?",
        options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
        correctAnswer: 1,
        category: "Cities",
        emoji: "🗾",
        difficulty: "Medium"
    },
    {
        id: 8,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: 2,
        category: "Cities",
        emoji: "🏙️",
        difficulty: "Hard"
    },
    {
        id: 9,
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correctAnswer: 2,
        category: "Cities",
        emoji: "🏢",
        difficulty: "Medium"
    },
    {
        id: 10,
        question: "What is the capital of Brazil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correctAnswer: 2,
        category: "Cities",
        emoji: "🏗️",
        difficulty: "Hard"
    },

    // Landmarks
    {
        id: 11,
        question: "What landmark is in Egypt?",
        options: ["Eiffel Tower", "Pyramids", "Big Ben", "Taj Mahal"],
        correctAnswer: 1,
        category: "Landmarks",
        emoji: "🏺",
        difficulty: "Easy"
    },
    {
        id: 12,
        question: "What landmark is in India?",
        options: ["Eiffel Tower", "Pyramids", "Big Ben", "Taj Mahal"],
        correctAnswer: 3,
        category: "Landmarks",
        emoji: "🕌",
        difficulty: "Medium"
    },
    {
        id: 13,
        question: "What landmark is in England?",
        options: ["Eiffel Tower", "Pyramids", "Big Ben", "Taj Mahal"],
        correctAnswer: 2,
        category: "Landmarks",
        emoji: "🕰️",
        difficulty: "Easy"
    },
    {
        id: 14,
        question: "What landmark is in China?",
        options: ["Great Wall", "Pyramids", "Big Ben", "Taj Mahal"],
        correctAnswer: 0,
        category: "Landmarks",
        emoji: "🏯",
        difficulty: "Medium"
    },
    {
        id: 15,
        question: "What landmark is in Greece?",
        options: ["Parthenon", "Pyramids", "Big Ben", "Taj Mahal"],
        correctAnswer: 0,
        category: "Landmarks",
        emoji: "🏛️",
        difficulty: "Medium"
    },

    // Oceans & Seas
    {
        id: 16,
        question: "What is the biggest ocean?",
        options: ["Atlantic", "Pacific", "Indian", "Arctic"],
        correctAnswer: 1,
        category: "Oceans",
        emoji: "🌊",
        difficulty: "Medium"
    },
    {
        id: 17,
        question: "What ocean is between America and Europe?",
        options: ["Atlantic", "Pacific", "Indian", "Arctic"],
        correctAnswer: 0,
        category: "Oceans",
        emoji: "🌊",
        difficulty: "Medium"
    },
    {
        id: 18,
        question: "What sea is between Europe and Africa?",
        options: ["Mediterranean", "Caribbean", "Red Sea", "Black Sea"],
        correctAnswer: 0,
        category: "Oceans",
        emoji: "🏖️",
        difficulty: "Medium"
    },
    {
        id: 19,
        question: "What ocean is around Antarctica?",
        options: ["Atlantic", "Pacific", "Indian", "Southern"],
        correctAnswer: 3,
        category: "Oceans",
        emoji: "🧊",
        difficulty: "Hard"
    },
    {
        id: 20,
        question: "What sea is between Asia and Africa?",
        options: ["Mediterranean", "Caribbean", "Red Sea", "Black Sea"],
        correctAnswer: 2,
        category: "Oceans",
        emoji: "🌊",
        difficulty: "Medium"
    },

    // Mountains & Rivers
    {
        id: 21,
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        correctAnswer: 0,
        category: "Mountains",
        emoji: "🏔️",
        difficulty: "Medium"
    },
    {
        id: 22,
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correctAnswer: 1,
        category: "Mountains",
        emoji: "🌊",
        difficulty: "Medium"
    },
    {
        id: 23,
        question: "What mountain range is in South America?",
        options: ["Rocky Mountains", "Alps", "Andes", "Himalayas"],
        correctAnswer: 2,
        category: "Mountains",
        emoji: "⛰️",
        difficulty: "Medium"
    },
    {
        id: 24,
        question: "What mountain range is in Europe?",
        options: ["Rocky Mountains", "Alps", "Andes", "Himalayas"],
        correctAnswer: 1,
        category: "Mountains",
        emoji: "🏔️",
        difficulty: "Medium"
    },
    {
        id: 25,
        question: "What river flows through Egypt?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correctAnswer: 1,
        category: "Mountains",
        emoji: "🌊",
        difficulty: "Easy"
    },

    // Continents
    {
        id: 26,
        question: "What continent is the biggest?",
        options: ["Asia", "Africa", "North America", "Europe"],
        correctAnswer: 0,
        category: "Continents",
        emoji: "🌏",
        difficulty: "Medium"
    },
    {
        id: 27,
        question: "What continent has the most people?",
        options: ["Asia", "Africa", "North America", "Europe"],
        correctAnswer: 0,
        category: "Continents",
        emoji: "👥",
        difficulty: "Medium"
    },
    {
        id: 28,
        question: "What continent is the coldest?",
        options: ["Asia", "Africa", "Antarctica", "Europe"],
        correctAnswer: 2,
        category: "Continents",
        emoji: "🧊",
        difficulty: "Easy"
    },
    {
        id: 29,
        question: "What continent has kangaroos?",
        options: ["Asia", "Africa", "Australia", "Europe"],
        correctAnswer: 2,
        category: "Continents",
        emoji: "🦘",
        difficulty: "Easy"
    },
    {
        id: 30,
        question: "What continent has lions?",
        options: ["Asia", "Africa", "Australia", "Europe"],
        correctAnswer: 1,
        category: "Continents",
        emoji: "🦁",
        difficulty: "Easy"
    },

    // Climate & Weather
    {
        id: 31,
        question: "What is the hottest continent?",
        options: ["Asia", "Africa", "Australia", "Europe"],
        correctAnswer: 1,
        category: "Climate",
        emoji: "🌡️",
        difficulty: "Medium"
    },
    {
        id: 32,
        question: "What is the driest continent?",
        options: ["Asia", "Africa", "Australia", "Antarctica"],
        correctAnswer: 3,
        category: "Climate",
        emoji: "🏜️",
        difficulty: "Hard"
    },
    {
        id: 33,
        question: "What climate zone is near the equator?",
        options: ["Tropical", "Temperate", "Arctic", "Desert"],
        correctAnswer: 0,
        category: "Climate",
        emoji: "🌴",
        difficulty: "Medium"
    },
    {
        id: 34,
        question: "What climate zone is at the poles?",
        options: ["Tropical", "Temperate", "Arctic", "Desert"],
        correctAnswer: 2,
        category: "Climate",
        emoji: "❄️",
        difficulty: "Medium"
    },
    {
        id: 35,
        question: "What is the wettest place on Earth?",
        options: ["Sahara Desert", "Amazon Rainforest", "Antarctica", "Mojave Desert"],
        correctAnswer: 1,
        category: "Climate",
        emoji: "🌧️",
        difficulty: "Hard"
    }
]

export default function GeographyGame({ onBack, onScoreUpdate }: GeographyGameProps) {
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
        if (isCorrect === null) return "🌍"
        return isCorrect ? "🎉" : "😅"
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Countries': return 'from-blue-500 to-indigo-600'
            case 'Cities': return 'from-purple-500 to-pink-600'
            case 'Landmarks': return 'from-orange-500 to-red-600'
            case 'Oceans': return 'from-cyan-500 to-blue-600'
            case 'Mountains': return 'from-green-500 to-emerald-600'
            case 'Continents': return 'from-teal-500 to-cyan-600'
            case 'Climate': return 'from-yellow-500 to-orange-600'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    if (gameCompleted) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400 via-orange-500 to-red-500 opacity-30"></div>
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
                            🌍
                        </motion.div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Geography Explorer!
                        </h2>

                        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full px-6 py-3 mb-6">
                            <div className="flex items-center justify-center gap-2">
                                <Trophy className="w-6 h-6 text-white" />
                                <span className="text-white font-bold text-xl">
                                    Final Score: {score}/{questions.length * 10}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            {score === questions.length * 10
                                ? "Perfect! You're a geography expert! 🌍"
                                : `Amazing! You got ${score / 10} out of ${questions.length} questions right!`}
                        </p>

                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePlayAgain}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all"
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
            <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400 via-orange-500 to-red-500 opacity-30"></div>
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
                            className="bg-gradient-to-r from-orange-400 to-red-500 h-4 rounded-full"
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

                                <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-2 rounded-full inline-block mb-4">
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
                                                ? 'bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 text-gray-800 border-2 border-orange-200'
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