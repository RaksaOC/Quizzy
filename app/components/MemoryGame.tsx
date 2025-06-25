'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, Trophy, RotateCcw } from 'lucide-react'

interface MemoryGameProps {
    onBack: () => void
    onScoreUpdate: (points: number) => void
}

interface Card {
    id: number
    emoji: string
    isFlipped: boolean
    isMatched: boolean
}

const emojis = ['🐶', '🐱', '🐰', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐷', '🐮', '🐷']

export default function MemoryGame({ onBack, onScoreUpdate }: MemoryGameProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [score, setScore] = useState(0)
    const [gameCompleted, setGameCompleted] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    // Initialize game
    useEffect(() => {
        initializeGame()
    }, [])

    const initializeGame = () => {
        const gameEmojis = emojis.slice(0, 8) // Use 8 emojis for 16 cards (8 pairs)
        const cardPairs = [...gameEmojis, ...gameEmojis]
        const shuffledCards = cardPairs
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji,
                isFlipped: false,
                isMatched: false
            }))

        setCards(shuffledCards)
        setFlippedCards([])
        setMoves(0)
        setScore(0)
        setGameCompleted(false)
    }

    const handleCardClick = (cardId: number) => {
        if (isProcessing || cards[cardId].isFlipped || cards[cardId].isMatched) return

        const newCards = [...cards]
        newCards[cardId].isFlipped = true
        setCards(newCards)

        const newFlippedCards = [...flippedCards, cardId]
        setFlippedCards(newFlippedCards)

        if (newFlippedCards.length === 2) {
            setIsProcessing(true)
            setMoves(prev => prev + 1)

            const [firstId, secondId] = newFlippedCards
            const firstCard = newCards[firstId]
            const secondCard = newCards[secondId]

            if (firstCard.emoji === secondCard.emoji) {
                // Match found!
                newCards[firstId].isMatched = true
                newCards[secondId].isMatched = true
                setCards(newCards)
                setScore(prev => prev + 20)
                onScoreUpdate(20)
                setFlippedCards([])
                setIsProcessing(false)

                // Check if game is completed
                if (newCards.every(card => card.isMatched)) {
                    setTimeout(() => setGameCompleted(true), 500)
                }
            } else {
                // No match, flip cards back
                setTimeout(() => {
                    newCards[firstId].isFlipped = false
                    newCards[secondId].isFlipped = false
                    setCards(newCards)
                    setFlippedCards([])
                    setIsProcessing(false)
                }, 1000)
            }
        }
    }

    const handlePlayAgain = () => {
        initializeGame()
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
                        🎉
                    </motion.div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Memory Master!
                    </h2>

                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-6 py-3 mb-6">
                        <div className="flex items-center justify-center gap-2">
                            <Trophy className="w-6 h-6 text-white" />
                            <span className="text-white font-bold text-xl">
                                Final Score: {score}
                            </span>
                        </div>
                    </div>

                    <div className="bg-blue-100 rounded-full px-6 py-3 mb-6">
                        <span className="text-blue-800 font-bold">
                            Moves: {moves}
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6">
                        {moves <= 12 ? "Amazing! You have an incredible memory! 🧠" :
                            moves <= 20 ? "Great job! You're getting better! 🌟" :
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
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="flex items-center gap-2 text-white font-bold text-lg hover:bg-white/20 rounded-full px-4 py-2 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Menu
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlayAgain}
                        className="flex items-center gap-2 text-white font-bold text-lg hover:bg-white/20 rounded-full px-4 py-2 transition-all"
                    >
                        <RotateCcw className="w-5 h-5" />
                        New Game
                    </motion.button>
                </div>

                {/* Game Stats */}
                <div className="flex justify-center gap-8 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-300 w-5 h-5" />
                            <span className="text-white font-bold">Score: {score}</span>
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <span className="text-white font-bold">Moves: {moves}</span>
                    </div>
                </div>

                {/* Game Instructions */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🧠 Memory Match 🧠
                    </h1>
                    <p className="text-white/90 text-lg">
                        Find matching pairs of cards! Click on cards to flip them.
                    </p>
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCardClick(card.id)}
                            className={`
                aspect-square rounded-2xl cursor-pointer relative overflow-hidden
                ${card.isMatched
                                    ? 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg'
                                    : card.isFlipped
                                        ? 'bg-white shadow-lg'
                                        : 'bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg hover:shadow-xl'
                                }
                transition-all duration-300
              `}
                        >
                            <AnimatePresence mode="wait">
                                {card.isFlipped || card.isMatched ? (
                                    <motion.div
                                        key="front"
                                        initial={{ rotateY: 90 }}
                                        animate={{ rotateY: 0 }}
                                        exit={{ rotateY: 90 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full flex items-center justify-center text-4xl"
                                    >
                                        {card.emoji}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="back"
                                        initial={{ rotateY: 90 }}
                                        animate={{ rotateY: 0 }}
                                        exit={{ rotateY: 90 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full flex items-center justify-center text-4xl text-white"
                                    >
                                        ❓
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Match indicator */}
                            {card.isMatched && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-2 right-2 text-2xl"
                                >
                                    ✅
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Progress indicator */}
                <div className="text-center mt-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 max-w-md mx-auto">
                        <motion.div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(cards.filter(card => card.isMatched).length / cards.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <p className="text-white/90 mt-2">
                        {cards.filter(card => card.isMatched).length / 2} of {cards.length / 2} pairs found
                    </p>
                </div>
            </div>
        </div>
    )
} 