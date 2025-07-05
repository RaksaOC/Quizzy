'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Wand2, RefreshCw, Palette, User, Smile, Crown } from 'lucide-react'
import { SinglePlayerGameLayout } from './shared/GameLayout'

interface CharacterCreatorProps {
    onBack: () => void
}

// Enhanced character parts
const bodies = [
    { color: '#4ECDC4', name: 'Turquoise' },
    { color: '#FF6B6B', name: 'Coral' },
    { color: '#FFE66D', name: 'Yellow' },
    { color: '#A8E6CF', name: 'Mint' },
    { color: '#FF8A65', name: 'Orange' },
    { color: '#B39DDB', name: 'Purple' },
    { color: '#81C784', name: 'Green' },
    { color: '#90CAF9', name: 'Blue' }
]

const eyes = [
    { emoji: '👀', name: 'Classic' },
    { emoji: '😊', name: 'Happy' },
    { emoji: '😎', name: 'Cool' },
    { emoji: '😮', name: 'Surprised' },
    { emoji: '😑', name: 'Neutral' },
    { emoji: '🥺', name: 'Pleading' },
    { emoji: '😴', name: 'Sleepy' },
    { emoji: '😉', name: 'Winking' }
]

const noses = [
    { emoji: '👃', name: 'Classic' },
    { emoji: '🐽', name: 'Piggy' },
    { emoji: '👃🏻', name: 'Small' },
    { emoji: '👃🏽', name: 'Medium' },
    { emoji: '👃🏿', name: 'Large' }
]

const mouths = [
    { emoji: '😀', name: 'Grinning' },
    { emoji: '🙂', name: 'Slight Smile' },
    { emoji: '😋', name: 'Yummy' },
    { emoji: '😗', name: 'Kissing' },
    { emoji: '😐', name: 'Neutral' },
    { emoji: '😄', name: 'Grin' },
    { emoji: '😊', name: 'Blush' },
    { emoji: '😌', name: 'Relieved' }
]

const accessories = [
    { emoji: '👑', name: 'Crown' },
    { emoji: '🎩', name: 'Top Hat' },
    { emoji: '🧢', name: 'Cap' },
    { emoji: '🎀', name: 'Bow' },
    { emoji: '👓', name: 'Glasses' },
    { emoji: '🕶️', name: 'Sunglasses' },
    { emoji: '🎭', name: 'Mask' },
    { emoji: '🌟', name: 'Star' }
]

export default function CharacterCreator({ onBack }: CharacterCreatorProps) {
    const [bodyIndex, setBodyIndex] = useState(0)
    const [eyesIndex, setEyesIndex] = useState(0)
    const [noseIndex, setNoseIndex] = useState(0)
    const [mouthIndex, setMouthIndex] = useState(0)
    const [accessoryIndex, setAccessoryIndex] = useState(0)
    const [showPreview, setShowPreview] = useState(false)

    const randomizeCharacter = () => {
        setBodyIndex(Math.floor(Math.random() * bodies.length))
        setEyesIndex(Math.floor(Math.random() * eyes.length))
        setNoseIndex(Math.floor(Math.random() * noses.length))
        setMouthIndex(Math.floor(Math.random() * mouths.length))
        setAccessoryIndex(Math.floor(Math.random() * accessories.length))
    }

    const cycleOption = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        length: number,
        increment: number
    ) => {
        setter(prev => (prev + increment + length) % length)
    }

    const handleDone = () => {
        setShowPreview(true)
        setTimeout(() => {
            onBack()
        }, 2000)
    }

    return (
        <SinglePlayerGameLayout
            title="Character Creator"
            onBack={onBack}
            gradientColors={{
                from: 'pink-400',
                via: 'purple-500',
                to: 'indigo-600',
                overlayFrom: 'rose-400',
                overlayVia: 'pink-500',
                overlayTo: 'purple-500'
            }}
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={randomizeCharacter}
                        className="flex items-center gap-2 text-white font-bold text-lg bg-purple-500/80 hover:bg-purple-500 rounded-full px-4 py-2 transition-all"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Random
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Character Preview */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, type: 'spring' }}
                        className="relative w-full aspect-square flex items-center justify-center bg-white/10 rounded-3xl p-8 backdrop-blur-sm border-2 border-white/20"
                    >
                        <motion.div
                            key={bodyIndex}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="w-64 h-64 rounded-full shadow-2xl relative"
                            style={{ backgroundColor: bodies[bodyIndex].color }}
                        >
                            <motion.div
                                key={`acc-${accessoryIndex}`}
                                initial={{ y: -50, scale: 0.5 }}
                                animate={{ y: 0, scale: 1 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                                className="absolute text-7xl" style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}>
                                {accessories[accessoryIndex].emoji}
                            </motion.div>
                            <motion.div
                                key={`eyes-${eyesIndex}`}
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: 'spring' }}
                                className="absolute text-6xl" style={{ top: '25%', left: '50%', transform: 'translateX(-50%)' }}>
                                {eyes[eyesIndex].emoji}
                            </motion.div>
                            <motion.div
                                key={`nose-${noseIndex}`}
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.15, type: 'spring' }}
                                className="absolute text-4xl" style={{ top: '45%', left: '50%', transform: 'translateX(-50%)' }}>
                                {noses[noseIndex].emoji}
                            </motion.div>
                            <motion.div
                                key={`mouth-${mouthIndex}`}
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="absolute text-4xl" style={{ top: '65%', left: '50%', transform: 'translateX(-50%)' }}>
                                {mouths[mouthIndex].emoji}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Customization Controls */}
                    <div className="space-y-4">
                        <ControlSection
                            title="Body Color"
                            icon={<Palette className="w-5 h-5" />}
                            current={bodies[bodyIndex].name}
                            onPrev={() => cycleOption(setBodyIndex, bodies.length, -1)}
                            onNext={() => cycleOption(setBodyIndex, bodies.length, 1)}
                        />
                        <ControlSection
                            title="Eyes"
                            icon={<User className="w-5 h-5" />}
                            current={eyes[eyesIndex].name}
                            onPrev={() => cycleOption(setEyesIndex, eyes.length, -1)}
                            onNext={() => cycleOption(setEyesIndex, eyes.length, 1)}
                        />
                        <ControlSection
                            title="Nose"
                            icon={<User className="w-5 h-5" />}
                            current={noses[noseIndex].name}
                            onPrev={() => cycleOption(setNoseIndex, noses.length, -1)}
                            onNext={() => cycleOption(setNoseIndex, noses.length, 1)}
                        />
                        <ControlSection
                            title="Mouth"
                            icon={<Smile className="w-5 h-5" />}
                            current={mouths[mouthIndex].name}
                            onPrev={() => cycleOption(setMouthIndex, mouths.length, -1)}
                            onNext={() => cycleOption(setMouthIndex, mouths.length, 1)}
                        />
                        <ControlSection
                            title="Accessory"
                            icon={<Crown className="w-5 h-5" />}
                            current={accessories[accessoryIndex].name}
                            onPrev={() => cycleOption(setAccessoryIndex, accessories.length, -1)}
                            onNext={() => cycleOption(setAccessoryIndex, accessories.length, 1)}
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDone}
                            className="w-full mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-full text-2xl shadow-lg"
                        >
                            I'm Done!
                        </motion.button>
                    </div>
                </div>

                {/* Preview Animation */}
                <AnimatePresence>
                    {showPreview && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
                        >
                            <motion.div
                                initial={{ y: 50 }}
                                animate={{ y: 0 }}
                                className="bg-white rounded-3xl p-8 text-center"
                            >
                                <h2 className="text-3xl font-bold mb-4">Character Created! 🎉</h2>
                                <p className="text-gray-600">Returning to menu...</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SinglePlayerGameLayout>
    )
}

interface ControlSectionProps {
    title: string
    icon: React.ReactNode
    current: string
    onPrev: () => void
    onNext: () => void
}

const ControlSection = ({ title, icon, current, onPrev, onNext }: ControlSectionProps) => {
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between border-2 border-white/20"
        >
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-white/80">{current}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onPrev}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full text-lg"
                >
                    ←
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onNext}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full text-lg"
                >
                    →
                </motion.button>
            </div>
        </motion.div>
    )
} 