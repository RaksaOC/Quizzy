'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Gamepad2, Calculator, Palette, Star, Trophy, Brush, UserCircle2, Sparkles, BookOpen, Zap, TestTube, PawPrint, Globe, Laptop } from 'lucide-react'
import Link from 'next/link'
import AnimatedBackground from './components/shared/AnimatedBackground'

export default function Home() {
    const featuredGame = {
        id: 'digital',
        name: 'Digital Literacy',
        description: 'Learn about internet safety, privacy, and responsible digital citizenship!',
        icon: Laptop,
        color: '#6366F1',
        gradient: 'from-indigo-400 to-blue-500',
        isMultiplayer: true,
        href: '/games/digital-literacy'
    }

    const multiplayerGames = [
        {
            id: 'quiz',
            name: 'Fun Quiz',
            description: 'Answer 35 fun questions about nature, animals, food, and more!',
            icon: Brain,
            color: '#4ECDC4',
            gradient: 'from-cyan-400 to-teal-500',
            isMultiplayer: true,
            href: '/games/quiz'
        },
        {
            id: 'math',
            name: 'Math Challenge',
            description: 'Solve 32 math problems including addition, subtraction, multiplication, and more!',
            icon: Calculator,
            color: '#45B7D1',
            gradient: 'from-blue-400 to-cyan-500',
            isMultiplayer: true,
            href: '/games/math'
        },
        {
            id: 'color',
            name: 'Color & Shapes',
            description: 'Learn colors, shapes, patterns, and object recognition with 24 questions!',
            icon: Palette,
            color: '#FFE66D',
            gradient: 'from-yellow-400 to-orange-400',
            isMultiplayer: true,
            href: '/games/colors'
        },
        {
            id: 'science',
            name: 'Science Quiz',
            description: 'Discover 35 amazing facts about space, plants, weather, and science!',
            icon: TestTube,
            color: '#FF6B9D',
            gradient: 'from-pink-400 to-purple-500',
            isMultiplayer: true,
            href: '/games/science'
        },
        {
            id: 'animals',
            name: 'Animal Quiz',
            description: 'Learn about 35 amazing animals from farm, wild, pets, and sea creatures!',
            icon: PawPrint,
            color: '#A8E6CF',
            gradient: 'from-green-400 to-emerald-500',
            isMultiplayer: true,
            href: '/games/animals'
        },
        {
            id: 'geography',
            name: 'Geography Quiz',
            description: 'Explore 35 countries, cities, landmarks, and places around the world!',
            icon: Globe,
            color: '#FF8A65',
            gradient: 'from-orange-400 to-red-500',
            isMultiplayer: true,
            href: '/games/geography'
        }
    ]

    const singlePlayerGames = [
        {
            id: 'memory',
            name: 'Memory Match',
            description: 'Find matching pairs and test your memory!',
            icon: Gamepad2,
            color: '#FF6B9D',
            gradient: 'from-pink-400 to-rose-500',
            isMultiplayer: false,
            href: '/games/memory'
        },
        {
            id: 'character',
            name: 'Character Creator',
            description: 'Design your own fun character!',
            icon: UserCircle2,
            color: '#A8E6CF',
            gradient: 'from-green-400 to-emerald-500',
            isMultiplayer: false,
            href: '/games/character'
        },
        {
            id: 'drawing',
            name: 'Drawing Pad',
            description: 'Unleash your creativity and draw anything!',
            icon: Brush,
            color: '#FF8A65',
            gradient: 'from-orange-400 to-red-400',
            isMultiplayer: false,
            href: '/games/drawing'
        }
    ]

    const GameCard = ({ game, delay = 0 }: { game: any, delay?: number }) => (
        <Link
            key={game.id}
            href={game.href}
            className="block"
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.6,
                    delay,
                    type: "spring",
                    stiffness: 100
                }}
                whileHover={{
                    scale: 1.05,
                    rotateY: 5
                }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
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

                        {/* Multiplayer Badge */}
                        {game.isMultiplayer && (
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-white text-sm font-medium">2 Players</span>
                            </div>
                        )}

                        {/* Play Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-2 px-6 rounded-full transition-all"
                        >
                            Play Now
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </Link>
    )

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
                {games.map((game: any, index: number) => (
                    <GameCard key={game.id} game={game} delay={delay + (index * 0.1)} />
                ))}
            </div>
        </motion.div>
    )

    return (
        <main className="min-h-screen py-16 px-4 relative z-10">
            <AnimatedBackground
                gradientFrom="indigo-500"
                gradientVia="purple-500"
                gradientTo="pink-500"
                overlayFrom="indigo-400"
                overlayVia="purple-500"
                overlayTo="pink-500"
                overlayOpacity={0.3}
            />
            <div className="max-w-7xl mx-auto ">
                {/* Title */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 text-shadow">
                        KIDSLEARN
                    </h1>
                    <p className="text-xl text-white/90 text-shadow-light">
                        Choose a game and start learning!
                    </p>
                </motion.div>

                {/* Featured Game */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-center mb-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="text-4xl mr-4"
                        >
                            <Star className="text-white" />
                        </motion.div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white text-shadow">
                            Featured Game
                        </h2>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="text-4xl ml-4"
                        >
                            <Star className="text-white" />
                        </motion.div>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <GameCard game={featuredGame} />
                    </div>
                </motion.div>

                {/* Two Player Games Section */}
                <GameSection
                    title="Two Player Games"
                    games={multiplayerGames}
                    icon={<Trophy className="text-white" />}
                    delay={0.2}
                />

                {/* Single Player Games Section */}
                <GameSection
                    title="Single Player Games"
                    games={singlePlayerGames}
                    icon={<Gamepad2 className="text-white" />}
                    delay={0.4}
                />
            </div>
        </main>
    )
}