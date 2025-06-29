'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, Trophy, Calculator, CheckCircle, XCircle } from 'lucide-react'

interface MathGameProps {
    onBack: () => void
    onScoreUpdate: (points: number) => void
}

interface MathProblem {
    id: number
    question: string
    answer: number
    options: number[]
    difficulty: string
    emoji: string
    category: string
}

export default function MathGame({ onBack, onScoreUpdate }: MathGameProps) {
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [problems, setProblems] = useState<MathProblem[]>([])
    const [gameCompleted, setGameCompleted] = useState(false)
    const [streak, setStreak] = useState(0)

    // Generate math problems
    useEffect(() => {
        generateProblems()
    }, [])

    const generateProblems = () => {
        const newProblems: MathProblem[] = []

        // Addition problems (6 questions)
        for (let i = 0; i < 6; i++) {
            const num1 = Math.floor(Math.random() * 15) + 1
            const num2 = Math.floor(Math.random() * 15) + 1
            const answer = num1 + num2

            const options = [answer]
            while (options.length < 4) {
                const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5 + 1)
                if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                    options.push(wrongAnswer)
                }
            }

            newProblems.push({
                id: i + 1,
                question: `${num1} + ${num2} = ?`,
                answer,
                options: options.sort(() => Math.random() - 0.5),
                difficulty: 'Easy',
                emoji: '➕',
                category: 'Addition'
            })
        }

        // Subtraction problems (6 questions)
        for (let i = 0; i < 6; i++) {
            const larger = Math.floor(Math.random() * 20) + 10
            const smaller = Math.floor(Math.random() * larger) + 1
            const answer = larger - smaller

            const options = [answer]
            while (options.length < 4) {
                const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5 + 1)
                if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                    options.push(wrongAnswer)
                }
            }

            newProblems.push({
                id: i + 7,
                question: `${larger} - ${smaller} = ?`,
                answer,
                options: options.sort(() => Math.random() - 0.5),
                difficulty: 'Easy',
                emoji: '➖',
                category: 'Subtraction'
            })
        }

        // Multiplication problems (4 questions)
        for (let i = 0; i < 4; i++) {
            const num1 = Math.floor(Math.random() * 6) + 2
            const num2 = Math.floor(Math.random() * 6) + 2
            const answer = num1 * num2

            const options = [answer]
            while (options.length < 4) {
                const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5 + 1)
                if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                    options.push(wrongAnswer)
                }
            }

            newProblems.push({
                id: i + 13,
                question: `${num1} × ${num2} = ?`,
                answer,
                options: options.sort(() => Math.random() - 0.5),
                difficulty: 'Medium',
                emoji: '✖️',
                category: 'Multiplication'
            })
        }

        // Division problems (4 questions)
        for (let i = 0; i < 4; i++) {
            const divisor = Math.floor(Math.random() * 5) + 2
            const quotient = Math.floor(Math.random() * 6) + 2
            const dividend = divisor * quotient
            const answer = quotient

            const options = [answer]
            while (options.length < 4) {
                const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3 + 1)
                if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                    options.push(wrongAnswer)
                }
            }

            newProblems.push({
                id: i + 17,
                question: `${dividend} ÷ ${divisor} = ?`,
                answer,
                options: options.sort(() => Math.random() - 0.5),
                difficulty: 'Medium',
                emoji: '➗',
                category: 'Division'
            })
        }

        // Counting problems (4 questions)
        for (let i = 0; i < 4; i++) {
            const count = Math.floor(Math.random() * 10) + 5
            const emojis = ['🍎', '⭐', '🔵', '🟡', '❤️', '🌟', '🎈', '🎨', '🦋', '🌺']
            const emoji = emojis[Math.floor(Math.random() * emojis.length)]

            const options = [count]
            while (options.length < 4) {
                const wrongAnswer = count + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3 + 1)
                if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                    options.push(wrongAnswer)
                }
            }

            newProblems.push({
                id: i + 21,
                question: `How many ${emoji} do you see?`,
                answer: count,
                options: options.sort(() => Math.random() - 0.5),
                difficulty: 'Easy',
                emoji: emoji,
                category: 'Counting'
            })
        }

        // Pattern problems (4 questions)
        for (let i = 0; i < 4; i++) {
            const patterns = [
                { sequence: [2, 4, 6, 8, 10], answer: 12, emoji: '📈' },
                { sequence: [1, 3, 5, 7, 9], answer: 11, emoji: '🔢' },
                { sequence: [5, 10, 15, 20, 25], answer: 30, emoji: '🎯' },
                { sequence: [1, 2, 4, 8, 16], answer: 32, emoji: '🚀' }
            ]
            const pattern = patterns[i]

            const options = [pattern.answer]
            while (options.length < 4) {
                const wrongAnswer = pattern.answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5 + 1)
                if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                    options.push(wrongAnswer)
                }
            }

            newProblems.push({
                id: i + 25,
                question: `What comes next? ${pattern.sequence.join(', ')}...`,
                answer: pattern.answer,
                options: options.sort(() => Math.random() - 0.5),
                difficulty: 'Hard',
                emoji: pattern.emoji,
                category: 'Patterns'
            })
        }

        // Money problems (4 questions)
        for (let i = 0; i < 4; i++) {
            const coins = [
                { value: 1, name: 'penny', emoji: '🪙' },
                { value: 5, name: 'nickel', emoji: '🪙' },
                { value: 10, name: 'dime', emoji: '🪙' },
                { value: 25, name: 'quarter', emoji: '🪙' }
            ]
            const coin1 = coins[Math.floor(Math.random() * coins.length)]
            const coin2 = coins[Math.floor(Math.random() * coins.length)]
            const answer = coin1.value + coin2.value

            const options = [answer]
            while (options.length < 4) {
                const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10 + 1)
                if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                    options.push(wrongAnswer)
                }
            }

            newProblems.push({
                id: i + 29,
                question: `${coin1.emoji} ${coin1.name} + ${coin2.emoji} ${coin2.name} = ? cents`,
                answer,
                options: options.sort(() => Math.random() - 0.5),
                difficulty: 'Medium',
                emoji: '💰',
                category: 'Money'
            })
        }

        setProblems(newProblems.sort(() => Math.random() - 0.5))
    }

    const handleAnswerSelect = (answer: number) => {
        if (selectedAnswer !== null) return // Prevent multiple selections

        setSelectedAnswer(answer)
        const correct = answer === problems[currentProblemIndex].answer

        setIsCorrect(correct)

        if (correct) {
            const points = 10 + (streak * 2) // Bonus points for streaks
            setScore(prev => prev + points)
            onScoreUpdate(points)
            setStreak(prev => prev + 1)
        } else {
            setStreak(0)
        }

        // Show result for 2 seconds then move to next problem
        setTimeout(() => {
            if (currentProblemIndex < problems.length - 1) {
                setCurrentProblemIndex(prev => prev + 1)
                setSelectedAnswer(null)
                setIsCorrect(null)
            } else {
                setGameCompleted(true)
            }
        }, 2000)
    }

    const handlePlayAgain = () => {
        setCurrentProblemIndex(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setScore(0)
        setStreak(0)
        setGameCompleted(false)
        generateProblems()
    }

    const getEmoji = (isCorrect: boolean | null) => {
        if (isCorrect === null) return "🧮"
        return isCorrect ? "🎉" : "😅"
    }

    if (gameCompleted) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400 via-teal-500 to-emerald-500 opacity-30"></div>
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
                            🏆
                        </motion.div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Math Wizard!
                        </h2>

                        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full px-6 py-3 mb-6">
                            <div className="flex items-center justify-center gap-2">
                                <Trophy className="w-6 h-6 text-white" />
                                <span className="text-white font-bold text-xl">
                                    Final Score: {score}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            {score >= 300 ? "Amazing! You're a math genius! 🧠" :
                                score >= 200 ? "Great job! You're getting better at math! 🌟" :
                                    "Well done! Keep practicing to improve! 💪"}
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
            </div>
        )
    }

    if (problems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        )
    }

    const currentProblem = problems[currentProblemIndex]

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400 via-teal-500 to-emerald-500 opacity-30"></div>
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
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentProblemIndex + 1) / problems.length) * 100}%` }}
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
                                Problem {currentProblemIndex + 1} of {problems.length}
                            </span>
                        </div>

                        {streak > 0 && (
                            <div className="bg-yellow-400/20 backdrop-blur-sm rounded-full px-6 py-3">
                                <span className="text-yellow-300 font-bold">
                                    🔥 Streak: {streak}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Problem Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProblemIndex}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl p-8 shadow-2xl mb-8"
                        >
                            {/* Problem Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-6xl mb-4"
                                >
                                    {currentProblem.emoji}
                                </motion.div>

                                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-full inline-block mb-4">
                                    <span className="font-bold">{currentProblem.category}</span>
                                </div>

                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full inline-block mb-4">
                                    <span className="font-bold">{currentProblem.difficulty}</span>
                                </div>

                                <h2 className="text-4xl font-bold text-gray-800 leading-relaxed">
                                    {currentProblem.question}
                                </h2>
                            </div>

                            {/* Answer Options */}
                            <div className="grid grid-cols-2 gap-4">
                                {currentProblem.options.map((option, index) => (
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
                    relative p-8 rounded-2xl font-bold text-2xl transition-all duration-300
                    ${selectedAnswer === null
                                                ? 'bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 text-gray-800 border-2 border-green-200'
                                                : selectedAnswer === option
                                                    ? option === currentProblem.answer
                                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white border-2 border-green-300'
                                                        : 'bg-gradient-to-r from-red-400 to-red-500 text-white border-2 border-red-300'
                                                    : option === currentProblem.answer
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
                                                    {option === currentProblem.answer ? (
                                                        <CheckCircle className="w-8 h-8" />
                                                    ) : selectedAnswer === option ? (
                                                        <XCircle className="w-8 h-8" />
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
                                    <div className="text-6xl mb-4">
                                        {getEmoji(isCorrect)}
                                    </div>
                                    <p className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                        {isCorrect
                                            ? `Correct! +${10 + (streak * 2)} points! 🎉`
                                            : `Oops! The answer was ${currentProblem.answer}`}
                                    </p>
                                    {isCorrect && streak > 1 && (
                                        <p className="text-green-600 font-bold mt-2">
                                            🔥 {streak} in a row! Keep it up!
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
} 