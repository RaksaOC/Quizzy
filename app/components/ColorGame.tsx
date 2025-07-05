'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, Trophy, Palette, CheckCircle, XCircle } from 'lucide-react'
import { useGameState } from '../hooks/useGameState'
import GameLayout from './shared/GameLayout'
import PlayerSetup from './shared/PlayerSetup'
import GameResults from './shared/GameResults'

interface ColorGameProps {
    onBack: () => void
}

interface GameItem {
    id: number
    type: 'color' | 'shape' | 'pattern' | 'object'
    question: string
    correctAnswer: string
    options: string[]
    emoji: string
    color?: string
    shape?: string
    pattern?: string
    object?: string
    explanation: string
}

const colors = [
    { name: 'Red', hex: '#FF6B6B', emoji: '🔴' },
    { name: 'Blue', hex: '#4ECDC4', emoji: '🔵' },
    { name: 'Green', hex: '#45B7D1', emoji: '🟢' },
    { name: 'Yellow', hex: '#FFE66D', emoji: '🟡' },
    { name: 'Purple', hex: '#A8E6CF', emoji: '🟣' },
    { name: 'Orange', hex: '#FF8A65', emoji: '🟠' },
    { name: 'Pink', hex: '#FF6B9D', emoji: '🩷' },
    { name: 'Brown', hex: '#8B4513', emoji: '🟤' },
    { name: 'Black', hex: '#2C3E50', emoji: '⚫' },
    { name: 'White', hex: '#ECF0F1', emoji: '⚪' },
    { name: 'Gray', hex: '#95A5A6', emoji: '🔘' },
    { name: 'Cyan', hex: '#00CED1', emoji: '🔷' }
]

const shapes = [
    { name: 'Circle', emoji: '⭕', svg: '●' },
    { name: 'Square', emoji: '⬜', svg: '■' },
    { name: 'Triangle', emoji: '🔺', svg: '▲' },
    { name: 'Star', emoji: '⭐', svg: '★' },
    { name: 'Heart', emoji: '❤️', svg: '♥' },
    { name: 'Diamond', emoji: '💎', svg: '◆' },
    { name: 'Rectangle', emoji: '⬜', svg: '▭' },
    { name: 'Oval', emoji: '🥚', svg: '⬭' },
    { name: 'Hexagon', emoji: '🔷', svg: '⬡' },
    { name: 'Pentagon', emoji: '🔶', svg: '⬟' }
]

const patterns = [
    { name: 'Stripes', emoji: '〰️', pattern: '|||||' },
    { name: 'Dots', emoji: '🔵', pattern: '●●●●●' },
    { name: 'Zigzag', emoji: '⚡', pattern: '⚡⚡⚡' },
    { name: 'Waves', emoji: '🌊', pattern: '≈≈≈≈≈' },
    { name: 'Stars', emoji: '⭐', pattern: '⭐⭐⭐' },
    { name: 'Hearts', emoji: '💖', pattern: '💖💖💖' }
]

const colorObjects = [
    { name: 'Apple', emoji: '🍎', color: 'Red' },
    { name: 'Banana', emoji: '🍌', color: 'Yellow' },
    { name: 'Blueberry', emoji: '🫐', color: 'Blue' },
    { name: 'Orange', emoji: '🍊', color: 'Orange' },
    { name: 'Grape', emoji: '🍇', color: 'Purple' },
    { name: 'Strawberry', emoji: '🍓', color: 'Red' },
    { name: 'Lemon', emoji: '🍋', color: 'Yellow' },
    { name: 'Lime', emoji: '🍈', color: 'Green' },
    { name: 'Cherry', emoji: '🍒', color: 'Red' },
    { name: 'Plum', emoji: '🫐', color: 'Purple' }
]

const generateGameItems = () => {
    const items: GameItem[] = []

    // Color questions (8 questions)
    for (let i = 0; i < 8; i++) {
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
            color: color.hex,
            explanation: `This is ${color.name}! Colors help us identify and describe things around us.`
        })
    }

    // Shape questions (6 questions)
    for (let i = 0; i < 6; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        const otherShapes = shapes.filter(s => s.name !== shape.name)
        const wrongOptions = otherShapes
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(s => s.name)

        const options = [shape.name, ...wrongOptions].sort(() => Math.random() - 0.5)

        items.push({
            id: i + 9,
            type: 'shape',
            question: `What shape is this?`,
            correctAnswer: shape.name,
            options,
            emoji: shape.emoji,
            shape: shape.svg,
            explanation: `This is a ${shape.name}! Shapes are everywhere in our world and help us understand objects better.`
        })
    }

    // Pattern questions (4 questions)
    for (let i = 0; i < 4; i++) {
        const pattern = patterns[Math.floor(Math.random() * patterns.length)]
        const otherPatterns = patterns.filter(p => p.name !== pattern.name)
        const wrongOptions = otherPatterns
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(p => p.name)

        const options = [pattern.name, ...wrongOptions].sort(() => Math.random() - 0.5)

        items.push({
            id: i + 15,
            type: 'pattern',
            question: `What pattern do you see?`,
            correctAnswer: pattern.name,
            options,
            emoji: pattern.emoji,
            pattern: pattern.pattern,
            explanation: `This is a ${pattern.name} pattern! Patterns help us find order and make predictions.`
        })
    }

    // Object color questions (6 questions)
    for (let i = 0; i < 6; i++) {
        const object = colorObjects[Math.floor(Math.random() * colorObjects.length)]
        const otherObjects = colorObjects.filter(o => o.color !== object.color)
        const wrongOptions = otherObjects
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(o => o.color)

        const options = [object.color, ...wrongOptions].sort(() => Math.random() - 0.5)

        items.push({
            id: i + 19,
            type: 'object',
            question: `What color is this ${object.name.toLowerCase()}?`,
            correctAnswer: object.color,
            options,
            emoji: object.emoji,
            object: object.name,
            explanation: `The ${object.name.toLowerCase()} is ${object.color}! Colors help us identify and remember objects.`
        })
    }

    // Shuffle all items
    return items.sort(() => Math.random() - 0.5)
}

export default function ColorGame({ onBack }: ColorGameProps) {
    const [questions] = useState(generateGameItems())
    const [showSetup, setShowSetup] = useState(true)
    const [showExplanation, setShowExplanation] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showForfeitModal, setShowForfeitModal] = useState(false)

    const {
        gameState,
        initializePlayers,
        handleAnswer,
        isTimerRunning
    } = useGameState({
        initialRounds: questions.length,
        timePerTurn: 20,
        generateQuestion: () => questions[gameState.currentRound - 1]
    })

    useEffect(() => {
        setShowExplanation(false)
        setSelectedAnswer(null)
    }, [gameState.currentPlayerIndex, gameState.currentRound])

    const handlePlayerSetup = (
        player1Name: string,
        player1Avatar: string,
        player2Name: string,
        player2Avatar: string
    ) => {
        initializePlayers(player1Name, player1Avatar, player2Name, player2Avatar)
        setShowSetup(false)
    }

    const handleAnswerSelect = (answer: string) => {
        if (gameState.hasAnswered[gameState.currentPlayerIndex] || showExplanation) {
            return
        }

        setSelectedAnswer(answer)
        const isCorrect = answer === gameState.currentQuestion.correctAnswer
        const timeBonus = Math.round((gameState.timeLeft / 20) * 10) // More points for faster answers

        setShowExplanation(true)

        setTimeout(() => {
            handleAnswer(gameState.currentPlayerIndex, isCorrect, timeBonus)
        }, 2000)
    }

    const handleForfeit = () => {
        setShowForfeitModal(true)
    }

    if (showSetup) {
        return <PlayerSetup onComplete={handlePlayerSetup} />
    }

    if (gameState.isGameOver || showForfeitModal) {
        const winner = gameState.players[0].score > gameState.players[1].score
            ? gameState.players[0]
            : gameState.players[1]
        const loser = winner === gameState.players[0]
            ? gameState.players[1]
            : gameState.players[0]

        return (
            <GameResults
                winner={winner}
                loser={loser}
                onPlayAgain={() => window.location.reload()}
                onBack={onBack}
                forfeit={showForfeitModal}
            />
        )
    }

    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    const currentQuestion = gameState.currentQuestion
    const timeLeftPercentage = (gameState.timeLeft / 20) * 100

    return (
        <GameLayout
            title="Colors & Shapes"
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            timeLeft={gameState.timeLeft}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={onBack}
            gradientColors={{
                from: 'yellow-400',
                via: 'orange-500',
                to: 'red-500',
                overlayFrom: 'yellow-300',
                overlayVia: 'orange-400',
                overlayTo: 'red-400'
            }}
        >
            <div className="space-y-8">
                {/* Player Turn and Score */}
                <div className="flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center"
                    >
                        <h3 className="text-xl text-white font-medium">
                            {currentPlayer.name}'s Turn
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                    >
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-300" />
                            <span className="text-white font-bold">Score: {currentPlayer.score}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Timer Bar */}
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: `${timeLeftPercentage}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full transition-colors ${timeLeftPercentage > 50 ? 'bg-green-500' :
                            timeLeftPercentage > 25 ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}
                    />
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${gameState.currentRound}-${gameState.currentPlayerIndex}`}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="text-center"
                    >
                        {/* Question */}
                        <div className="mb-8">
                            <div className="relative rounded-2xl overflow-hidden bg-orange-500/90 backdrop-blur-sm aspect-video max-w-2xl mx-auto mb-6 border-2 border-white/20 shadow-lg">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-white/90 text-center p-8">
                                        <Palette className="w-16 h-16 mx-auto mb-4" />
                                        <span className="text-xl font-medium">Round {gameState.currentRound}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-8 text-shadow-lg">
                                {currentQuestion.question}
                            </h3>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {currentQuestion.options.map((option: string, index: number) => {
                                const isSelected = selectedAnswer === option
                                const isCorrect = option === currentQuestion.correctAnswer

                                return (
                                    <motion.button
                                        key={index}
                                        whileHover={{
                                            scale: !selectedAnswer ? 1.05 : 1,
                                            y: !selectedAnswer ? -5 : 0
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswerSelect(option)}
                                        disabled={!!selectedAnswer}
                                        className={`
                                            relative p-6 rounded-xl text-left font-medium
                                            ${!selectedAnswer
                                                ? 'bg-orange-500/80 text-white hover:bg-orange-600/80 border-2 border-white/20'
                                                : isSelected
                                                    ? isCorrect
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-red-500/90 text-white border-2 border-red-400/50'
                                                    : isCorrect && showExplanation
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-orange-400/50 text-white/60 border-2 border-white/10'
                                            }
                                            transition-all duration-300 shadow-lg
                                        `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-3 text-lg">
                                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                {option}
                                            </span>
                                            {selectedAnswer && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {isCorrect ? (
                                                        <CheckCircle className="w-6 h-6" />
                                                    ) : isSelected ? (
                                                        <XCircle className="w-6 h-6" />
                                                    ) : null}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Explanation */}
                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mt-8 p-6 bg-orange-600/80 backdrop-blur-sm rounded-xl text-white border-2 border-white/20 shadow-lg"
                                >
                                    <p className="text-xl font-medium">
                                        {currentQuestion.explanation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>

                {/* Forfeit Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleForfeit}
                    className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all"
                >
                    Forfeit Game
                </motion.button>
            </div>
        </GameLayout>
    )
} 