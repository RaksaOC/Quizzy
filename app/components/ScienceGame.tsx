'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, Star, Trophy, Flask } from 'lucide-react'

interface ScienceGameProps {
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
    // Space & Planets
    {
        id: 1,
        question: "What planet do we live on?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        correctAnswer: 1,
        category: "Space",
        emoji: "🌍",
        difficulty: "Easy"
    },
    {
        id: 2,
        question: "What is the closest star to Earth?",
        options: ["Moon", "Sun", "Mars", "Venus"],
        correctAnswer: 1,
        category: "Space",
        emoji: "☀️",
        difficulty: "Easy"
    },
    {
        id: 3,
        question: "What do we call the big ball of light in the sky at night?",
        options: ["Star", "Moon", "Planet", "Sun"],
        correctAnswer: 1,
        category: "Space",
        emoji: "🌙",
        difficulty: "Easy"
    },
    {
        id: 4,
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
        category: "Space",
        emoji: "🪐",
        difficulty: "Medium"
    },
    {
        id: 5,
        question: "What color is the sky during the day?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: 1,
        category: "Space",
        emoji: "🌤️",
        difficulty: "Easy"
    },

    // Plants & Nature
    {
        id: 6,
        question: "What do plants need to make their own food?",
        options: ["Water", "Sunlight", "Soil", "All of these"],
        correctAnswer: 3,
        category: "Plants",
        emoji: "🌱",
        difficulty: "Medium"
    },
    {
        id: 7,
        question: "What part of the plant takes in water from the soil?",
        options: ["Leaves", "Stem", "Roots", "Flowers"],
        correctAnswer: 2,
        category: "Plants",
        emoji: "🌿",
        difficulty: "Medium"
    },
    {
        id: 8,
        question: "What do bees help plants do?",
        options: ["Grow taller", "Make seeds", "Change color", "Make fruit"],
        correctAnswer: 1,
        category: "Plants",
        emoji: "🐝",
        difficulty: "Medium"
    },
    {
        id: 9,
        question: "What season do most plants grow the fastest?",
        options: ["Winter", "Spring", "Summer", "Fall"],
        correctAnswer: 2,
        category: "Plants",
        emoji: "🌺",
        difficulty: "Easy"
    },
    {
        id: 10,
        question: "What do trees give us to breathe?",
        options: ["Water", "Oxygen", "Food", "Shade"],
        correctAnswer: 1,
        category: "Plants",
        emoji: "🌳",
        difficulty: "Medium"
    },

    // Weather & Climate
    {
        id: 11,
        question: "What happens when water gets very cold?",
        options: ["It boils", "It freezes", "It disappears", "It changes color"],
        correctAnswer: 1,
        category: "Weather",
        emoji: "❄️",
        difficulty: "Easy"
    },
    {
        id: 12,
        question: "What do we call water that falls from the sky?",
        options: ["Snow", "Rain", "Hail", "All of these"],
        correctAnswer: 3,
        category: "Weather",
        emoji: "🌧️",
        difficulty: "Easy"
    },
    {
        id: 13,
        question: "What makes a rainbow appear?",
        options: ["Rain and sun", "Snow and wind", "Clouds and rain", "Wind and sun"],
        correctAnswer: 0,
        category: "Weather",
        emoji: "🌈",
        difficulty: "Medium"
    },
    {
        id: 14,
        question: "What do we call the movement of air?",
        options: ["Rain", "Wind", "Snow", "Lightning"],
        correctAnswer: 1,
        category: "Weather",
        emoji: "💨",
        difficulty: "Easy"
    },
    {
        id: 15,
        question: "What season comes after winter?",
        options: ["Spring", "Summer", "Fall", "Winter again"],
        correctAnswer: 0,
        category: "Weather",
        emoji: "🌸",
        difficulty: "Easy"
    },

    // Human Body
    {
        id: 16,
        question: "What pumps blood through your body?",
        options: ["Lungs", "Heart", "Brain", "Stomach"],
        correctAnswer: 1,
        category: "Body",
        emoji: "❤️",
        difficulty: "Medium"
    },
    {
        id: 17,
        question: "What do you use to think and learn?",
        options: ["Heart", "Brain", "Lungs", "Stomach"],
        correctAnswer: 1,
        category: "Body",
        emoji: "🧠",
        difficulty: "Easy"
    },
    {
        id: 18,
        question: "What do your lungs help you do?",
        options: ["Eat", "Breathe", "Walk", "Sleep"],
        correctAnswer: 1,
        category: "Body",
        emoji: "🫁",
        difficulty: "Medium"
    },
    {
        id: 19,
        question: "What do your bones help you do?",
        options: ["Think", "Stand up", "Breathe", "Eat"],
        correctAnswer: 1,
        category: "Body",
        emoji: "🦴",
        difficulty: "Easy"
    },
    {
        id: 20,
        question: "What do your muscles help you do?",
        options: ["Move", "Think", "Breathe", "Eat"],
        correctAnswer: 0,
        category: "Body",
        emoji: "💪",
        difficulty: "Easy"
    },

    // Energy & Forces
    {
        id: 21,
        question: "What do we call the force that pulls things down?",
        options: ["Wind", "Gravity", "Electricity", "Magnetism"],
        correctAnswer: 1,
        category: "Forces",
        emoji: "⬇️",
        difficulty: "Medium"
    },
    {
        id: 22,
        question: "What do we call the energy that makes things hot?",
        options: ["Light", "Heat", "Sound", "Electricity"],
        correctAnswer: 1,
        category: "Forces",
        emoji: "🔥",
        difficulty: "Easy"
    },
    {
        id: 23,
        question: "What do we call the energy that helps us see?",
        options: ["Heat", "Light", "Sound", "Electricity"],
        correctAnswer: 1,
        category: "Forces",
        emoji: "💡",
        difficulty: "Easy"
    },
    {
        id: 24,
        question: "What do magnets attract?",
        options: ["Paper", "Metal", "Wood", "Plastic"],
        correctAnswer: 1,
        category: "Forces",
        emoji: "🧲",
        difficulty: "Medium"
    },
    {
        id: 25,
        question: "What do we call the energy that makes sound?",
        options: ["Light", "Heat", "Sound", "Electricity"],
        correctAnswer: 2,
        category: "Forces",
        emoji: "🔊",
        difficulty: "Easy"
    },

    // Materials & Matter
    {
        id: 26,
        question: "What state of matter is water when it's frozen?",
        options: ["Liquid", "Solid", "Gas", "Plasma"],
        correctAnswer: 1,
        category: "Matter",
        emoji: "🧊",
        difficulty: "Medium"
    },
    {
        id: 27,
        question: "What state of matter is steam?",
        options: ["Liquid", "Solid", "Gas", "Plasma"],
        correctAnswer: 2,
        category: "Matter",
        emoji: "💨",
        difficulty: "Medium"
    },
    {
        id: 28,
        question: "What do we call things that can dissolve in water?",
        options: ["Solids", "Liquids", "Soluble", "Insoluble"],
        correctAnswer: 2,
        category: "Matter",
        emoji: "🧪",
        difficulty: "Hard"
    },
    {
        id: 29,
        question: "What happens when you mix oil and water?",
        options: ["They mix together", "They separate", "They disappear", "They change color"],
        correctAnswer: 1,
        category: "Matter",
        emoji: "🫧",
        difficulty: "Medium"
    },
    {
        id: 30,
        question: "What do we call the smallest part of matter?",
        options: ["Cell", "Atom", "Molecule", "Particle"],
        correctAnswer: 1,
        category: "Matter",
        emoji: "⚛️",
        difficulty: "Hard"
    },

    // Simple Machines
    {
        id: 31,
        question: "What simple machine helps you lift heavy things?",
        options: ["Wheel", "Lever", "Pulley", "All of these"],
        correctAnswer: 3,
        category: "Machines",
        emoji: "⚙️",
        difficulty: "Medium"
    },
    {
        id: 32,
        question: "What do wheels help us do?",
        options: ["Move things easily", "Make things hot", "Make things cold", "Make things loud"],
        correctAnswer: 0,
        category: "Machines",
        emoji: "🛞",
        difficulty: "Easy"
    },
    {
        id: 33,
        question: "What do we call a surface that goes up and down?",
        options: ["Wheel", "Lever", "Ramp", "Pulley"],
        correctAnswer: 2,
        category: "Machines",
        emoji: "📐",
        difficulty: "Medium"
    },
    {
        id: 34,
        question: "What simple machine is a door handle?",
        options: ["Wheel", "Lever", "Pulley", "Screw"],
        correctAnswer: 1,
        category: "Machines",
        emoji: "🚪",
        difficulty: "Medium"
    },
    {
        id: 35,
        question: "What do we call a tool that makes work easier?",
        options: ["Machine", "Toy", "Game", "Book"],
        correctAnswer: 0,
        category: "Machines",
        emoji: "🔧",
        difficulty: "Easy"
    }
]

export default function ScienceGame({ onBack, onScoreUpdate }: ScienceGameProps) {
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
        if (isCorrect === null) return "🔬"
        return isCorrect ? "🎉" : "😅"
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Space': return 'from-purple-500 to-indigo-600'
            case 'Plants': return 'from-green-500 to-emerald-600'
            case 'Weather': return 'from-blue-500 to-cyan-600'
            case 'Body': return 'from-pink-500 to-rose-600'
            case 'Forces': return 'from-orange-500 to-red-600'
            case 'Matter': return 'from-teal-500 to-blue-600'
            case 'Machines': return 'from-gray-500 to-slate-600'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    if (gameCompleted) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-indigo-400 via-purple-500 to-pink-500 opacity-30"></div>
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
                            🧪
                        </motion.div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Science Explorer!
                        </h2>

                        <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full px-6 py-3 mb-6">
                            <div className="flex items-center justify-center gap-2">
                                <Trophy className="w-6 h-6 text-white" />
                                <span className="text-white font-bold text-xl">
                                    Final Score: {score}/{questions.length * 10}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            {score === questions.length * 10
                                ? "Perfect! You're a science genius! 🧠"
                                : `Amazing! You got ${score / 10} out of ${questions.length} questions right!`}
                        </p>

                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePlayAgain}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all"
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
            <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-600"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-indigo-400 via-purple-500 to-pink-500 opacity-30"></div>
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
                            className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full"
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

                                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full inline-block mb-4">
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
                                                ? 'bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-800 border-2 border-purple-200'
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