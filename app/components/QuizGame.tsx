'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, Star, Trophy } from 'lucide-react'

interface QuizGameProps {
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
}

const questions: Question[] = [
    {
        id: 1,
        question: "What color is the sky on a sunny day?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: 1,
        category: "Nature",
        emoji: "🌤️"
    },
    {
        id: 2,
        question: "How many legs does a cat have?",
        options: ["2", "4", "6", "8"],
        correctAnswer: 1,
        category: "Animals",
        emoji: "🐱"
    },
    {
        id: 3,
        question: "What do plants need to grow?",
        options: ["Water", "Candy", "Toys", "Books"],
        correctAnswer: 0,
        category: "Science",
        emoji: "🌱"
    },
    {
        id: 4,
        question: "What shape is a circle?",
        options: ["Square", "Triangle", "Round", "Rectangle"],
        correctAnswer: 2,
        category: "Shapes",
        emoji: "⭕"
    },
    {
        id: 5,
        question: "What sound does a dog make?",
        options: ["Meow", "Woof", "Moo", "Tweet"],
        correctAnswer: 1,
        category: "Animals",
        emoji: "🐕"
    },
    {
        id: 6,
        question: "What color are bananas?",
        options: ["Blue", "Red", "Yellow", "Green"],
        correctAnswer: 2,
        category: "Food",
        emoji: "🍌"
    },
    {
        id: 7,
        question: "How many fingers do you have on one hand?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
        category: "Body",
        emoji: "✋"
    },
    {
        id: 8,
        question: "What do you use to write on paper?",
        options: ["Fork", "Pencil", "Shoe", "Hat"],
        correctAnswer: 1,
        category: "School",
        emoji: "✏️"
    }
]

export default function QuizGame({ onBack, onScoreUpdate }: QuizGameProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [gameCompleted, setGameCompleted] = useState(false)

    const currentQuestion = questions[currentQuestionIndex]

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
            if (currentQuestionIndex < questions.length - 1) {
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
    }

    const getEmoji = (isCorrect: boolean | null) => {
        if (isCorrect === null) return "🤔"
        return isCorrect ? "🎉" : "😅"
    }

    if (gameCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
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
                        🏆
                    </motion.div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Quiz Complete!
                    </h2>

                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-6 py-3 mb-6">
                        <div className="flex items-center justify-center gap-2">
                            <Trophy className="w-6 h-6 text-white" />
                            <span className="text-white font-bold text-xl">
                                Final Score: {score}/{questions.length * 10}
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                        {score === questions.length * 10
                            ? "Perfect! You're a quiz master! 🌟"
                            : `Great job! You got ${score / 10} out of ${questions.length} questions right!`}
                    </p>

                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlayAgain}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all"
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
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
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
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
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
                            Question {currentQuestionIndex + 1} of {questions.length}
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

                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full inline-block mb-4">
                                <span className="font-bold">{currentQuestion.category}</span>
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
                                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-gray-800 border-2 border-blue-200'
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
    )
} 