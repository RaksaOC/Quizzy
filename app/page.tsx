'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Gamepad2, Calculator, Palette, Star, Trophy, Brush, UserCircle2, Sparkles, BookOpen, Zap, TestTube, PawPrint, Globe } from 'lucide-react'
import QuizGame from './components/QuizGame'
import MemoryGame from './components/MemoryGame'
import MathGame from './components/MathGame'
import ColorGame from './components/ColorGame'
import DrawingGame from './components/DrawingGame'
import CharacterCreator from './components/CharacterCreator'
import ScienceGame from './components/ScienceGame'
import AnimalsGame from './components/AnimalsGame'
import GeographyGame from './components/GeographyGame'

export default function Home() {
    const [selectedGame, setSelectedGame] = useState<string | null>(null)
    const [score, setScore] = useState(0)

    const quizGames = [
        {
            id: 'quiz',
            name: 'Fun Quiz',
            description: 'Answer 35 fun questions about nature, animals, food, and more!',
            icon: Brain,
            color: '#4ECDC4',
            gradient: 'from-cyan-400 to-teal-500'
        },
        {
            id: 'math',
            name: 'Math Challenge',
            description: 'Solve 32 math problems including addition, subtraction, multiplication, and more!',
            icon: Calculator,
            color: '#45B7D1',
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            id: 'color',
            name: 'Color & Shapes',
            description: 'Learn colors, shapes, patterns, and object recognition with 24 questions!',
            icon: Palette,
            color: '#FFE66D',
            gradient: 'from-yellow-400 to-orange-400'
        },
        {
            id: 'science',
            name: 'Science Quiz',
            description: 'Discover 35 amazing facts about space, plants, weather, and science!',
            icon: TestTube,
            color: '#FF6B9D',
            gradient: 'from-pink-400 to-purple-500'
        },
        {
            id: 'animals',
            name: 'Animal Quiz',
            description: 'Learn about 35 amazing animals from farm, wild, pets, and sea creatures!',
            icon: PawPrint,
            color: '#A8E6CF',
            gradient: 'from-green-400 to-emerald-500'
        },
        {
            id: 'geography',
            name: 'Geography Quiz',
            description: 'Explore 35 countries, cities, landmarks, and places around the world!',
            icon: Globe,
            color: '#FF8A65',
            gradient: 'from-orange-400 to-red-500'
        }
    ]

    const extraGames = [
        {
            id: 'memory',
            name: 'Memory Match',
            description: 'Find matching pairs and test your memory!',
            icon: Gamepad2,
            color: '#FF6B9D',
            gradient: 'from-pink-400 to-rose-500'
        },
        {
            id: 'character',
            name: 'Character Creator',
            description: 'Design your own fun character!',
            icon: UserCircle2,
            color: '#A8E6CF',
            gradient: 'from-green-400 to-emerald-500'
        },
        {
            id: 'drawing',
            name: 'Drawing Pad',
            description: 'Unleash your creativity and draw anything!',
            icon: Brush,
            color: '#FF8A65',
            gradient: 'from-orange-400 to-red-400'
        }
    ]

    const handleGameSelect = (gameId: string) => {
        setSelectedGame(gameId)
    }

    const handleBackToMenu = () => {
        setSelectedGame(null)
    }

    const handleScoreUpdate = (points: number) => {
        setScore(prev => prev + points)
    }

    const renderGame = () => {
        switch (selectedGame) {
            case 'quiz':
                return <QuizGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'math':
                return <MathGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'color':
                return <ColorGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'science':
                return <ScienceGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'animals':
                return <AnimalsGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'geography':
                return <GeographyGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'memory':
                return <MemoryGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'drawing':
                return <DrawingGame onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            case 'character':
                return <CharacterCreator onBack={handleBackToMenu} onScoreUpdate={handleScoreUpdate} />
            default:
                return null
        }
    }

    if (selectedGame) {
        return renderGame()
    }

    const GameSection = ({ title, games, icon: Icon, delay = 0 }: { title: string, games: any, icon: any, delay: number }) => (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay }}
            className="mb-16"
        >


            {/* Section Header */}
            <div className="flex items-center justify-center mb-8">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="text-4xl mr-4"
                >
                    {Icon}
                </motion.div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white text-shadow">
                    {title}
                </h2>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="text-4xl ml-4"
                >
                    {Icon}
                </motion.div>
            </div>



            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game: any, index: any) => (
                    <motion.div
                        key={game.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: delay + (index * 0.1),
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{
                            scale: 1.05,
                            rotateY: 5
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group cursor-pointer"
                        onClick={() => handleGameSelect(game.id)}
                    >
                        <div className={`
                            relative overflow-hidden rounded-3xl p-8 min-h-96
                            bg-gradient-to-br ${game.gradient}
                            shadow-2xl glow hover:glow
                            transform transition-all duration-500
                            border-4 border-white/30
                            group-hover:border-white/60
                        `}>
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                                <motion.div
                                    className="mb-6"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <game.icon className="w-20 h-20 text-white drop-shadow-lg" />
                                </motion.div>

                                <h3 className="text-3xl font-bold text-white mb-4 text-shadow">
                                    {game.name}
                                </h3>

                                <p className="text-white/90 text-lg font-medium mb-6 text-shadow-light">
                                    {game.description}
                                </p>

                                {/* Play Button */}
                                <motion.div
                                    className="btn-primary"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        Let's Play!
                                    </span>
                                </motion.div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20"></div>
                            <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/20"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-600 via-cyan-500 to-teal-400 opacity-30"></div>
            </div>

            {/* Footer */}


            {/* Floating Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="bubble absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 80 + 40}px`,
                            height: `${Math.random() * 80 + 40}px`,
                            borderRadius: Math.random() > 0.5 ? '50%' : '20px',
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 60 - 30, 0],
                            rotate: [0, Math.random() > 0.5 ? 360 : -360, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>



            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center items-center mb-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="text-6xl mr-4"
                        >
                            🎮
                        </motion.div>
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold rainbow-text">
                            Fun Kids Games
                        </h1>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="text-6xl ml-4"
                        >
                            🎯
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl sm:text-3xl text-white font-semibold mb-8 text-shadow"
                    >
                        Learn, Play, and Have Fun! ✨
                    </motion.p>

                    {/* Score Display */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="inline-flex items-center gap-3 glass rounded-full px-8 py-4 shadow-lg"
                    >
                        <Trophy className="text-yellow-400 w-7 h-7" />
                        <span className="text-white font-bold text-2xl text-shadow">Score: {score}</span>
                        <Star className="text-yellow-400 w-7 h-7" />
                    </motion.div>
                </motion.div>

                {/* Quiz Games Section */}
                <GameSection
                    title="Quiz Games"
                    games={quizGames}
                    icon={<BookOpen className="w-10 h-10 text-white" />}
                    delay={0.2}
                />

                {/* Extra Games Section */}
                <GameSection
                    title="Extra Games"
                    games={extraGames}
                    icon={<Zap className="w-10 h-10 text-white" />}
                    delay={0.4}
                />


            </div>
        </div>
    )
}