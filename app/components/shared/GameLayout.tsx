'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import PlayerCard from './PlayerCard'
import ModalDialog from './ModalDialog'
import { Player } from '@/app/hooks/useGameState'

interface GameLayoutProps {
    title: string
    players: [Player, Player]
    currentPlayerIndex: number
    timeLeft: number
    currentRound: number
    totalRounds: number
    onBack: () => void
    children: React.ReactNode
    gradientColors?: {
        from: string
        via: string
        to: string
        overlayFrom: string
        overlayVia: string
        overlayTo: string
    }
}

export default function GameLayout({
    title,
    players,
    currentPlayerIndex,
    timeLeft,
    currentRound,
    totalRounds,
    onBack,
    children,
    gradientColors = {
        from: 'purple-400',
        via: 'pink-500',
        to: 'red-600',
        overlayFrom: 'indigo-400',
        overlayVia: 'purple-500',
        overlayTo: 'pink-500'
    }
}: GameLayoutProps) {
    const [showQuitConfirm, setShowQuitConfirm] = useState(false)

    const handleBackClick = () => {
        setShowQuitConfirm(true)
    }

    const handleConfirmQuit = () => {
        setShowQuitConfirm(false)
        onBack()
    }

    return (
        <div className="min-h-screen relative overflow-hidden z-10">
            {/* Background */}
            <AnimatedBackground
                gradientFrom={gradientColors.from}
                gradientVia={gradientColors.via}
                gradientTo={gradientColors.to}
                overlayFrom={gradientColors.overlayFrom}
                overlayVia={gradientColors.overlayVia}
                overlayTo={gradientColors.overlayTo}
            />

            {/* Game Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleBackClick}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Menu</span>
                    </motion.button>

                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white text-shadow">{title}</h1>
                        <div className="mt-2 text-white/80 font-medium">
                            Round {currentRound} of {totalRounds}
                        </div>
                    </div>

                    <div className="w-24" /> {/* Spacer for alignment */}
                </div>

                {/* Player Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <PlayerCard
                        name={players[0].name}
                        avatar={players[0].avatar}
                        score={players[0].score}
                        roundsWon={players[0].roundsWon}
                        isCurrentTurn={currentPlayerIndex === 0}
                        timeLeft={currentPlayerIndex === 0 ? timeLeft : undefined}
                    />

                    <PlayerCard
                        name={players[1].name}
                        avatar={players[1].avatar}
                        score={players[1].score}
                        roundsWon={players[1].roundsWon}
                        isCurrentTurn={currentPlayerIndex === 1}
                        timeLeft={currentPlayerIndex === 1 ? timeLeft : undefined}
                    />
                </div>

                {/* Game Content */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
                    {children}
                </div>
            </div>

            {/* Quit Confirmation Modal */}
            <ModalDialog
                isOpen={showQuitConfirm}
                onClose={() => setShowQuitConfirm(false)}
                title="Leave Game?"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to quit the game? Your progress will be lost.
                    </p>
                    <div className="flex justify-end gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowQuitConfirm(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleConfirmQuit}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Quit Game
                        </motion.button>
                    </div>
                </div>
            </ModalDialog>
        </div>
    )
}

interface SinglePlayerGameLayoutProps {
    title: string
    onBack: () => void
    gradientColors: {
        from: string
        via: string
        to: string
        overlayFrom: string
        overlayVia: string
        overlayTo: string
    }
    children: React.ReactNode
}

export function SinglePlayerGameLayout({ title, onBack, gradientColors, children }: SinglePlayerGameLayoutProps) {
    return (
        <div className={`min-h-screen bg-gradient-to-br from-${gradientColors.from} via-${gradientColors.via} to-${gradientColors.to} p-4 relative overflow-hidden`}>
            {/* Background Animation */}
            <AnimatedBackground
                gradientFrom={gradientColors.from}
                gradientVia={gradientColors.via}
                gradientTo={gradientColors.to}
                overlayFrom={gradientColors.overlayFrom}
                overlayVia={gradientColors.overlayVia}
                overlayTo={gradientColors.overlayTo}
            />

            <div className="relative z-10">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="flex justify-between items-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onBack}
                            className="flex items-center gap-2 text-white font-bold text-lg hover:bg-white/20 rounded-full px-4 py-2 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </motion.button>

                        <h1 className="text-4xl font-bold text-white text-center">
                            {title}
                        </h1>

                        <div className="w-24" /> {/* Spacer for alignment */}
                    </div>
                </div>

                {/* Content */}
                <div className="relative">
                    {children}
                </div>
            </div>
        </div>
    )
} 