'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Clock } from 'lucide-react'

interface PlayerCardProps {
    name: string
    avatar: string
    score: number
    isCurrentTurn: boolean
    timeLeft?: number
    roundsWon: number
}

export default function PlayerCard({
    name,
    avatar,
    score,
    isCurrentTurn,
    timeLeft,
    roundsWon
}: PlayerCardProps) {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
                scale: isCurrentTurn ? 1.05 : 1,
                opacity: 1,
                boxShadow: isCurrentTurn ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
            }}
            transition={{ duration: 0.3 }}
            className={`
                relative overflow-hidden rounded-2xl p-4
                ${isCurrentTurn ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800'}
                border-4 border-white/20
            `}
        >
            {/* Active Turn Indicator */}
            {isCurrentTurn && (
                <motion.div
                    className="absolute inset-0 bg-white opacity-10"
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            )}

            <div className="flex items-center gap-4">
                {/* Avatar */}
                <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-4xl bg-white/10"
                    animate={isCurrentTurn ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {avatar}
                </motion.div>

                {/* Player Info */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/90">{score}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/90">{roundsWon}</span>
                        </div>
                    </div>
                </div>

                {/* Timer */}
                {timeLeft !== undefined && (
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-white/80" />
                        <span className="text-xl font-bold text-white">{timeLeft}s</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
} 