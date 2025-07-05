'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, ArrowLeft, RotateCcw } from 'lucide-react'
import { Player } from '@/hooks/useGameState'

interface GameResultsProps {
    winner: Player
    loser: Player
    onPlayAgain: () => void
    onBack: () => void
    forfeit?: boolean
}

export default function GameResults({
    winner,
    loser,
    onPlayAgain,
    onBack
}: GameResultsProps) {
    return (
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Confetti Animation */}
                <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                 text-8xl"
                    >
                        {winner.avatar}
                    </motion.div>

                    {/* Floating Stars */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: Math.random() * 2 + 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random()
                            }}
                        >
                            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                        </motion.div>
                    ))}
                </div>

                {/* Results Content */}
                <div className="p-8 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">
                            {winner.name} Wins!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Congratulations on your victory!
                        </p>

                        {/* Score Comparison */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="space-y-2">
                                <div className="text-2xl">{winner.avatar}</div>
                                <div className="font-bold text-gray-800">{winner.name}</div>
                                <div className="flex items-center justify-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <span className="text-xl font-bold">{winner.score}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Rounds Won: {winner.roundsWon}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-2xl">{loser.avatar}</div>
                                <div className="font-bold text-gray-800">{loser.name}</div>
                                <div className="flex items-center justify-center gap-2">
                                    <Trophy className="w-5 h-5 text-gray-400" />
                                    <span className="text-xl font-bold">{loser.score}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Rounds Won: {loser.roundsWon}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onPlayAgain}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600
                                         text-white font-bold py-3 px-6 rounded-xl
                                         hover:from-indigo-600 hover:to-purple-700"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <RotateCcw className="w-5 h-5" />
                                    Play Again
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onBack}
                                className="w-full bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-xl
                                         hover:bg-gray-200"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <ArrowLeft className="w-5 h-5" />
                                    Back to Menu
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
} 