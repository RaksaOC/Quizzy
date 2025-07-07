'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, ArrowLeft, Heart, Star, Zap, Diamond, Crown, Flame, Trophy, Sparkles } from 'lucide-react'
import { shuffleArray } from '../utils/gameData'
import ModalDialog from './shared/ModalDialog'
import AnimatedBackground from './shared/AnimatedBackground'

interface MemoryGameProps {
    onBack: () => void
}

interface MemoryCard {
    id: number
    emoji: string
    isFlipped: boolean
    isMatched: boolean
}

const EMOJIS = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵'
]

const CARD_ICONS = [Brain, Heart, Star, Zap, Diamond, Crown, Flame, Trophy, Sparkles]

const CARD_COLORS = [
    'from-pink-400 to-pink-600',
    'from-purple-400 to-purple-600',
    'from-blue-400 to-blue-600',
    'from-cyan-400 to-cyan-600',
    'from-teal-400 to-teal-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-orange-400 to-orange-600',
    'from-red-400 to-red-600'
]

const MAX_MOVES = 15

const createMemoryCards = (count: number = 8): MemoryCard[] => {
    const selectedEmojis = shuffleArray([...EMOJIS]).slice(0, count)
    const pairs = [...selectedEmojis, ...selectedEmojis]
    const shuffledPairs = shuffleArray(pairs)

    return shuffledPairs.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
    }))
}

export default function MemoryGame({ onBack }: MemoryGameProps) {
    const [cards, setCards] = useState<MemoryCard[]>(createMemoryCards())
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [matchedPairs, setMatchedPairs] = useState<number>(0)
    const [canFlip, setCanFlip] = useState<boolean>(true)
    const [moves, setMoves] = useState<number>(0)
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [gameCompleted, setGameCompleted] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [cardColor, setCardColor] = useState<string>(shuffleArray([...CARD_COLORS])[0])
    const [cardIcon, setCardIcon] = useState(() => shuffleArray([...CARD_ICONS])[0])

    useEffect(() => {
        if (matchedPairs === cards.length / 2) {
            setGameCompleted(true)
        }
    }, [matchedPairs, cards.length])

    useEffect(() => {
        if (moves >= MAX_MOVES && !gameCompleted) {
            setGameOver(true)
        }
    }, [moves, gameCompleted])

    const handleCardClick = (cardId: number) => {
        if (!gameStarted) {
            setGameStarted(true)
        }

        if (!canFlip || flippedCards.includes(cardId) || cards[cardId].isMatched || gameOver) {
            return
        }

        // Update the flipped state of the clicked card
        setCards(prev => prev.map(card =>
            card.id === cardId ? { ...card, isFlipped: true } : card
        ))

        const newFlippedCards = [...flippedCards, cardId]
        setFlippedCards(newFlippedCards)

        if (newFlippedCards.length === 2) {
            setCanFlip(false)
            setMoves(prev => prev + 1)

            const [firstCard, secondCard] = newFlippedCards
            const isMatch = cards[firstCard].emoji === cards[secondCard].emoji

            setTimeout(() => {
                if (isMatch) {
                    setCards(prev => prev.map(card =>
                        card.id === firstCard || card.id === secondCard
                            ? { ...card, isMatched: true, isFlipped: true }
                            : card
                    ))
                    setMatchedPairs(prev => prev + 1)
                } else {
                    // Hide both cards again
                    setCards(prev => prev.map(card =>
                        card.id === firstCard || card.id === secondCard
                            ? { ...card, isFlipped: false }
                            : card
                    ))
                }

                setFlippedCards([])
                setCanFlip(true)
            }, 1000)
        }
    }

    const resetGame = () => {
        setCards(createMemoryCards())
        setFlippedCards([])
        setMatchedPairs(0)
        setCanFlip(true)
        setMoves(0)
        setGameStarted(false)
        setGameCompleted(false)
        setGameOver(false)
        setCardColor(shuffleArray([...CARD_COLORS])[0])
        setCardIcon(() => shuffleArray([...CARD_ICONS])[0])
    }

    const IconComponent = cardIcon


    return (
        <div className="min-h-screen p-8 relative z-10">
            <AnimatedBackground
                gradientFrom="blue-400"
                gradientVia="cyan-500"
                gradientTo="teal-600"
                overlayFrom="cyan-400"
                overlayVia="teal-500"
                overlayTo="emerald-500"
            />
            <div className="max-w-4xl mx-auto space-y-8 relative">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Back to Menu</span>
                    </motion.button>
                    <h1 className="text-3xl font-bold text-white text-center">Memory Match</h1>
                    <button
                        onClick={resetGame}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                    >
                        Reset Game
                    </button>
                </div>

                {/* Game Stats */}
                <div className="flex justify-center gap-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                        <span className="font-medium">Moves: </span>
                        {moves} / {MAX_MOVES}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                        <span className="font-medium">Pairs Found: </span>
                        {matchedPairs} / {cards.length / 2}
                    </div>
                </div>

                {/* Memory Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            className={`
                                relative aspect-square rounded-xl cursor-pointer
                                ${card.isMatched ? 'pointer-events-none' : ''}
                                perspective-1000
                            `}
                            onClick={() => handleCardClick(card.id)}
                        >
                            <motion.div
                                className="absolute inset-0 w-full h-full preserve-3d"
                                initial={false}
                                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Front (Hidden) */}
                                <div className="absolute inset-0 w-full h-full backface-hidden">
                                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${cardColor} backdrop-blur-sm rounded-xl border-2 border-white/20 shadow-lg`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Back (Emoji) */}
                                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                                    <div className={`
                                        w-full h-full flex items-center justify-center bg-white rounded-xl 
                                        border-2 border-cyan-400/50 shadow-lg text-4xl
                                        ${card.isMatched ? 'opacity-50' : ''}
                                    `}>
                                        {card.emoji}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Game Over Modal */}
                <ModalDialog
                    isOpen={gameOver || gameCompleted}
                    onClose={resetGame}
                    title={gameCompleted ? 'Congratulations! 🎉' : 'Game Over! 😢'}
                    showCloseButton={false}
                >
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Moves Used</p>
                                <p className="text-2xl font-bold text-gray-900">{moves}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Pairs Found</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {matchedPairs} / {cards.length / 2}
                                </p>
                            </div>
                        </div>

                        {/* Message */}
                        <p className="text-gray-600 text-center">
                            {gameCompleted
                                ? `Amazing! You found all pairs in ${moves} moves!`
                                : `You found ${matchedPairs} pairs in ${moves} moves.`
                            }
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={resetGame}
                                className={`
                                    flex-1 px-6 py-3 rounded-xl font-medium text-white
                                    transition-transform hover:scale-105 active:scale-95
                                    ${gameCompleted
                                        ? 'bg-gradient-to-r from-green-400 to-emerald-600'
                                        : 'bg-gradient-to-r from-red-400 to-rose-600'
                                    }
                                `}
                            >
                                Play Again
                            </button>
                            <button
                                onClick={onBack}
                                className="flex-1 px-6 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 
                                    transition-transform hover:scale-105 active:scale-95"
                            >
                                Exit Game
                            </button>
                        </div>
                    </div>
                </ModalDialog>
            </div>
        </div>
    )
} 