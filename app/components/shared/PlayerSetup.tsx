'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smile, ChevronRight, ArrowLeft, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface PlayerSetupProps {
    onComplete: (player1Name: string, player1Avatar: string, player2Name: string, player2Avatar: string) => void
}

const AVATAR_OPTIONS = [
    '👧', '👦', '👨', '👩', '🧑', '👶',
    '🐱', '🐶', '🐰', '🐼', '🐨', '🦁',
    '🌟', '⭐', '🌙', '☀️', '🌈', '⚡',
    '🎮', '🎲', '🎯', '🎨', '🎭', '🎪'
]

export default function PlayerSetup({ onComplete }: PlayerSetupProps) {
    const [player1Name, setPlayer1Name] = useState('')
    const [player2Name, setPlayer2Name] = useState('')
    const [player1Avatar, setPlayer1Avatar] = useState('👧')
    const [player2Avatar, setPlayer2Avatar] = useState('👦')
    const [currentStep, setCurrentStep] = useState(1)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (currentStep === 1 && player1Name) {
            setCurrentStep(2)
        } else if (currentStep === 2 && player2Name) {
            onComplete(player1Name, player1Avatar, player2Name, player2Avatar)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-4"
                >
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                        >
                            <ChevronLeft className="w-4 h-4 text-white" />
                            <span className="text-sm text-white">Back</span>
                        </motion.button>
                    </Link>
                </motion.div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            {currentStep === 1 ? 'Player 1 Setup' : 'Player 2 Setup'}
                        </h2>

                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={currentStep === 1 ? player1Name : player2Name}
                                onChange={(e) => currentStep === 1 ?
                                    setPlayer1Name(e.target.value) :
                                    setPlayer2Name(e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* Avatar Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Choose Your Avatar
                            </label>
                            <div className="grid grid-cols-6 gap-2">
                                {AVATAR_OPTIONS.map((avatar) => (
                                    <motion.button
                                        key={avatar}
                                        type="button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => currentStep === 1 ?
                                            setPlayer1Avatar(avatar) :
                                            setPlayer2Avatar(avatar)
                                        }
                                        className={`
                                            w-12 h-12 text-2xl rounded-lg flex items-center justify-center
                                            ${(currentStep === 1 ? player1Avatar : player2Avatar) === avatar
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                            }
                                        `}
                                    >
                                        {avatar}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg
                                     hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {currentStep === 1 ? (
                                    <>Next Player <ChevronRight className="w-5 h-5" /></>
                                ) : (
                                    <>Start Game! <Smile className="w-5 h-5" /></>
                                )}
                            </span>
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </div>
    )
} 