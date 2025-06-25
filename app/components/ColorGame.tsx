'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, Trophy, Palette, CheckCircle, XCircle } from 'lucide-react'

interface ColorGameProps {
    onBack: () => void
    onScoreUpdate: (points: number) => void
}

interface GameItem {
    id: number
    type: 'color' | 'shape'
    question: string
    correctAnswer: string
    options: string[]
    emoji: string
    color?: string
    shape?: string
}

const colors = [
    { name: 'Red', hex: '#FF6B6B', emoji: '🔴' },
    { name: 'Blue', hex: '#4ECDC4', emoji: '🔵' },
    { name: 'Green', hex: '#45B7D1', emoji: '🟢' },
    { name: 'Yellow', hex: '#FFE66D', emoji: '🟡' },
    { name: 'Purple', hex: '#A8E6CF', emoji: '🟣' },
    { name: 'Orange', hex: '#FF8A65', emoji: '🟠' },
    { name: 'Pink', hex: '#FF6B9D', emoji: '🩷' },
    { name: 'Brown', hex: '#8B4513', emoji: '🟤' }
]

const shapes = [
    { name: 'Circle', emoji: '⭕', svg: '●' },
    { name: 'Square', emoji: '⬜', svg: '■' },
    { name: 'Triangle', emoji: '🔺', svg: '▲' },
    { name: 'Star', emoji: '⭐', svg: '★' },
    { name: 'Heart', emoji: '❤️', svg: '♥' },
    { name: 'Diamond', emoji: '💎', svg: '◆' }
]

export default function ColorGame({ onBack, onScoreUpdate }: ColorGameProps) {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [gameItems, setGameItems] = useState<GameItem[]>([])
    const [gameCompleted, setGameCompleted] = useState(false)

    // Generate game items
    useEffect(() => {
        generateGameItems()
    }, [])

    const generateGameItems = () => {
        const items: GameItem[] = []

        // Color questions
        for (let i = 0; i < 5; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)]
            const otherColors = colors.filter(c => c.name !== color.name)
            const wrongOptions = otherColors
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(c => c.name)

            const options = [color.name, ...wrongOptions].sort(() => Math.random() - 0.5)

            items.push({
                id: i + 1,
                type: 'color',
                question: `What color is this?`,
                correctAnswer: color.name,
                options,
                emoji: color.emoji,
                color: color.hex
            })
        }

        // Shape questions
        for (let i = 0; i < 5; i++) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)]
            const otherShapes = shapes.filter(s => s.name !== shape.name)
            const wrongOptions = otherShapes
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(s => s.name)

            const options = [shape.name, ...wrongOptions].sort(() => Math.random() - 0.5)

            items.push({
                id: i + 6,
                type: 'shape',
                question: `What shape is this?`,
                correctAnswer: shape.name,
                options,
                emoji: shape.emoji,
                shape: shape.svg
            })
        }

        // Shuffle all items
        setGameItems(items.sort(() => Math.random() - 0.5))
    }

    const handleAnswerSelect = (answer: string) => {
        if (selectedAnswer !== null) return // Prevent multiple selections

        setSelectedAnswer(answer)
        const correct = answer === gameItems[currentItemIndex].correctAnswer

        setIsCorrect(correct)

        if (correct) {
            setScore(prev => prev + 10)
            onScoreUpdate(10)
        }

        // Show result for 2 seconds then move to next item
        setTimeout(() => {
            if (currentItemIndex < gameItems.length - 1) {
                setCurrentItemIndex(prev => prev + 1)
                setSelectedAnswer(null)
                setIsCorrect(null)
            } else {
                setGameCompleted(true)
            }
        }, 2000)
    }

    const handlePlayAgain = () => {
        setCurrentItemIndex(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setScore(0)
        setGameCompleted(false)
        generateGameItems()
    }

    const getEmoji = (isCorrect: boolean | null) => {
        if (isCorrect === null) return "🎨"
        return isCorrect ? "🎉" : "😅"
    }

    if (gameCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-4">
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
                        🎨
                    </motion.div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Color & Shape Master!
                    </h2>

                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-6 py-3 mb-6">
                        <div className="flex items-center justify-center gap-2">
                            <Trophy className="w-6 h-6 text-white" />
                            <span className="text-white font-bold text-xl">
                                Final Score: {score}
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                        {score >= 80 ? "Amazing! You know all your colors and shapes! 🌈" :
                            score >= 60 ? "Great job! You're learning so well! 🌟" :
                                "Well done! Keep practicing to learn more! 💪"}
                    </p>

                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlayAgain}
                            className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all"
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

    if (gameItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        )
    }

    const currentItem = gameItems[currentItemIndex]

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
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
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentItemIndex + 1) / gameItems.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Game Stats */}
                <div className="flex justify-between items-center mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-300 w-5 h-5" />
                            <span className="text-white font-bold">Score: {score}</span>
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <span className="text-white font-bold">
                            Question {currentItemIndex + 1} of {gameItems.length}
                        </span>
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItemIndex}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-8 shadow-2xl mb-8"
                    >
                        {/* Question Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl mb-4"
                            >
                                {currentItem.emoji}
                            </motion.div>

                            <div className={`px-4 py-2 rounded-full inline-block mb-4 text-white font-bold ${currentItem.type === 'color'
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                }`}>
                                <span>{currentItem.type === 'color' ? 'Color' : 'Shape'}</span>
                            </div>

                            <h2 className="text-3xl font-bold text-gray-800 leading-relaxed mb-6">
                                {currentItem.question}
                            </h2>

                            {/* Visual Display */}
                            <div className="flex justify-center mb-6">
                                {currentItem.type === 'color' ? (
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg"
                                        style={{ backgroundColor: currentItem.color }}
                                    />
                                ) : (
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 10, -10, 0]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-32 h-32 flex items-center justify-center text-6xl text-gray-800"
                                    >
                                        {currentItem.shape}
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Answer Options */}
                        <div className="grid grid-cols-2 gap-4">
                            {currentItem.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{
                                        scale: selectedAnswer === null ? 1.05 : 1,
                                        y: selectedAnswer === null ? -5 : 0
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={selectedAnswer !== null}
                                    className={`
                    relative p-6 rounded-2xl font-bold text-lg transition-all duration-300
                    ${selectedAnswer === null
                                            ? 'bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 text-gray-800 border-2 border-yellow-200'
                                            : selectedAnswer === option
                                                ? option === currentItem.correctAnswer
                                                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white border-2 border-green-300'
                                                    : 'bg-gradient-to-r from-red-400 to-red-500 text-white border-2 border-red-300'
                                                : option === currentItem.correctAnswer
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
                                                {option === currentItem.correctAnswer ? (
                                                    <CheckCircle className="w-6 h-6" />
                                                ) : selectedAnswer === option ? (
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
                                className="text-center mt-8"
                            >
                                <div className="text-4xl mb-2">
                                    {getEmoji(isCorrect)}
                                </div>
                                <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect
                                        ? 'Correct! Well done! 🎉'
                                        : `Oops! The correct answer was "${currentItem.correctAnswer}"`}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
} 