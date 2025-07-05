'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Wand2, RefreshCw } from 'lucide-react'

interface CharacterCreatorProps {
    onBack: () => void
}

// Simple parts for the character
const bodies = ['#4ECDC4', '#FF6B6B', '#FFE66D', '#A8E6CF', '#FF8A65']
const eyes = ['👀', '😊', '😎', '😮', '😑']
const mouths = ['😀', '🙂', '😋', '😗', '😐']
const accessories = ['👑', '🎩', '🧢', '🎀', '👓']

export default function CharacterCreator({ onBack }: CharacterCreatorProps) {
    const [bodyIndex, setBodyIndex] = useState(0)
    const [eyesIndex, setEyesIndex] = useState(0)
    const [mouthIndex, setMouthIndex] = useState(0)
    const [accessoryIndex, setAccessoryIndex] = useState(0)

    const randomizeCharacter = () => {
        setBodyIndex(Math.floor(Math.random() * bodies.length))
        setEyesIndex(Math.floor(Math.random() * eyes.length))
        setMouthIndex(Math.floor(Math.random() * mouths.length))
        setAccessoryIndex(Math.floor(Math.random() * accessories.length))
    }

    const cycleOption = (setter: React.Dispatch<React.SetStateAction<number>>, length: number) => {
        setter(prev => (prev + 1) % length)
    }

    const handleDone = () => {
        onBack()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-300 to-indigo-300 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
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
                        Create a Character
                    </h1>

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
                        className="relative w-full aspect-square flex items-center justify-center"
                    >
                        <motion.div
                            key={bodyIndex}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="w-64 h-64 rounded-full shadow-2xl"
                            style={{ backgroundColor: bodies[bodyIndex] }}
                        />
                        <motion.div
                            key={`acc-${accessoryIndex}`}
                            initial={{ y: -50, scale: 0.5 }}
                            animate={{ y: 0, scale: 1 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="absolute text-7xl" style={{ top: '10%' }}>
                            {accessories[accessoryIndex]}
                        </motion.div>
                        <motion.div
                            key={`eyes-${eyesIndex}`}
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: 'spring' }}
                            className="absolute text-6xl" style={{ top: '35%' }}>
                            {eyes[eyesIndex]}
                        </motion.div>
                        <motion.div
                            key={`mouth-${mouthIndex}`}
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="absolute text-4xl" style={{ top: '60%' }}>
                            {mouths[mouthIndex]}
                        </motion.div>
                    </motion.div>

                    {/* Customization Controls */}
                    <div className="space-y-6">
                        <ControlSection title="Body Color" onCycle={() => cycleOption(setBodyIndex, bodies.length)} />
                        <ControlSection title="Eyes" onCycle={() => cycleOption(setEyesIndex, eyes.length)} />
                        <ControlSection title="Mouth" onCycle={() => cycleOption(setMouthIndex, mouths.length)} />
                        <ControlSection title="Accessory" onCycle={() => cycleOption(setAccessoryIndex, accessories.length)} />

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
            </div>
        </div>
    )
}

const ControlSection = ({ title, onCycle }: { title: string, onCycle: () => void }) => {
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/30 p-4 rounded-2xl flex items-center justify-between"
        >
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onCycle}
                className="bg-white/50 hover:bg-white/80 text-purple-700 font-bold py-2 px-5 rounded-full text-lg shadow-md"
            >
                Next
            </motion.button>
        </motion.div>
    )
} 