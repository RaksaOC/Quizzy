'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cat, Star, CheckCircle, XCircle } from 'lucide-react'
import { useGameState } from '../hooks/useGameState'
import GameLayout from './shared/GameLayout'
import PlayerSetup from './shared/PlayerSetup'
import GameResults from './shared/GameResults'
import {
    getRandomAnimalQuestions,
    calculateTimeBonus,
    GAME_COLORS,
    AnimalQuestion
} from '../utils/gameData'

interface AnimalsGameProps {
    onBack: () => void
}

export default function AnimalsGame({ onBack }: AnimalsGameProps) {
    const [showSetup, setShowSetup] = useState(true)
    const [showExplanation, setShowExplanation] = useState(false)
    const [showForfeitModal, setShowForfeitModal] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [questions] = useState(getRandomAnimalQuestions(20))
    const [currentQuestionIndices, setCurrentQuestionIndices] = useState([0, 1])

    const getNextQuestion = (playerIndex: number) => {
        setCurrentQuestionIndices(prev => {
            const newIndices = [...prev]
            newIndices[playerIndex] = (prev[playerIndex] + 2) % questions.length
            return newIndices
        })
        return questions[currentQuestionIndices[playerIndex]]
    }

    const {
        gameState,
        initializePlayers,
        handleAnswer,
        isTimerRunning
    } = useGameState({
        initialRounds: 5,
        timePerTurn: 20,
        generateQuestion: (playerIndex: number) => getNextQuestion(playerIndex)
    })

    // Reset explanation when player/round changes
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
        const currentPlayerState = gameState.playerStates[gameState.currentPlayerIndex]
        if (currentPlayerState.hasAnswered || showExplanation) {
            return
        }

        setSelectedAnswer(answer)
        const currentQuestion = currentPlayerState.currentQuestion as AnimalQuestion
        const isCorrect = answer === currentQuestion.name
        const timeBonus = calculateTimeBonus(currentPlayerState.timeLeft, 20)

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
    const currentPlayerState = gameState.playerStates[gameState.currentPlayerIndex]
    const currentQuestion = currentPlayerState.currentQuestion as AnimalQuestion
    const timeLeftPercentage = (currentPlayerState.timeLeft / 20) * 100

    return (
        <GameLayout
            title="Animal Explorer"
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            timeLeft={currentPlayerState.timeLeft}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={onBack}
            onForfeit={handleForfeit}
            gradientColors={GAME_COLORS.animals}
        >
            <div className="space-y-8">
                {/* Player Turn */}
                <div className="flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center"
                    >
                        <h3 className="text-xl text-white font-medium text-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            {currentPlayer.name}'s Turn
                        </h3>
                    </motion.div>
                </div>

                {/* Timer Bar */}
                <div className="w-full h-2 max-w-2xl mx-auto  bg-white/20 rounded-full overflow-hidden">
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
                            {
                                currentQuestion.image && (
                                    <div className="relative rounded-2xl overflow-hidden bg-violet-600/90 backdrop-blur-sm aspect-video max-w-2xl mx-auto mb-6 border-2 border-white/20 shadow-lg">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-full h-full">
                                                <img
                                                    src={currentQuestion.image}
                                                    alt={currentQuestion.question}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <h3 className="text-3xl font-bold text-white mb-8 text-shadow-lg max-w-2xl mx-auto">
                                {currentQuestion.question}
                            </h3>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {currentQuestion.options.map((option: string, index: number) => {
                                const isSelected = selectedAnswer === option
                                const isCorrect = option === currentQuestion.name

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
                                                ? 'bg-amber-500/80 text-white hover:bg-amber-600/80 border-2 border-white/20'
                                                : isSelected
                                                    ? isCorrect
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-red-500/90 text-white border-2 border-red-400/50'
                                                    : isCorrect && showExplanation
                                                        ? 'bg-green-500/90 text-white border-2 border-green-400/50'
                                                        : 'bg-amber-400/50 text-white/60 border-2 border-white/10'
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
                                    className="mt-8 p-6 bg-amber-600/80 backdrop-blur-sm rounded-xl text-white border-2 border-white/20 shadow-lg max-w-2xl mx-auto"
                                >
                                    <div className="text-xl font-medium space-y-4">
                                        {currentQuestion.facts.map((fact, index) => (
                                            <p key={index}>{fact}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>
        </GameLayout>
    )
} 