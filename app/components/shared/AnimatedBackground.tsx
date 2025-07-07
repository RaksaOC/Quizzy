'use client'

import { motion } from 'framer-motion'
import { Star, Triangle, Circle, Square, Hexagon, Cloud } from 'lucide-react'

interface AnimatedBackgroundProps {
    gradientFrom?: string
    gradientVia?: string
    gradientTo?: string
    overlayFrom?: string
    overlayVia?: string
    overlayTo?: string
    overlayOpacity?: number
}

const SHAPES = [
    { component: Star, size: 24 },
    { component: Triangle, size: 28 },
    { component: Circle, size: 26 },
    { component: Square, size: 24 },
    { component: Hexagon, size: 28 },
    { component: Cloud, size: 32 }
]

const GEOMETRIC_SHAPES = [
    'clip-path: polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
    'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond
    'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon
]

const getColorValue = (color: string) => {
    const colors: { [key: string]: string } = {
        // Dark colors
        'slate-900': '#0f172a',
        'gray-900': '#111827',
        // Neon colors
        'cyan-500': '#06b6d4',
        'fuchsia-500': '#d946ef',
        'teal-500': '#14b8a6',
    }
    return colors[color] || color
}

export default function AnimatedBackground({
    gradientFrom = 'purple-400',
    gradientVia = 'pink-500',
    gradientTo = 'red-600',
    overlayFrom = 'indigo-400',
    overlayVia = 'purple-500',
    overlayTo = 'pink-500',
    overlayOpacity = 0.3
}: AnimatedBackgroundProps) {
    const style = {
        '--gradient-from': getColorValue(gradientFrom),
        '--gradient-via': getColorValue(gradientVia),
        '--gradient-to': getColorValue(gradientTo),
        '--overlay-from': getColorValue(overlayFrom),
        '--overlay-via': getColorValue(overlayVia),
        '--overlay-to': getColorValue(overlayTo),
        '--overlay-opacity': overlayOpacity,
    } as React.CSSProperties

    return (
        <div className="fixed inset-0 overflow-hidden z-[-1]" style={style}>
            {/* Main Gradient */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`
                    }}
                ></div>
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to top left, var(--overlay-from), var(--overlay-via), var(--overlay-to))`,
                        opacity: `var(--overlay-opacity)`
                    }}
                ></div>
            </motion.div>

            {/* Floating Icons */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => {
                    const Shape = SHAPES[i].component
                    return (
                        <motion.div
                            key={`icon-${i}`}
                            className="absolute"
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${20 + (i % 3) * 25}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 15, 0],
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-full">
                                <Shape size={SHAPES[i].size} className="text-white/50" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Geometric Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`shape-${i}`}
                        className="absolute bg-white/5 backdrop-blur-3xl"
                        style={{
                            left: `${40 + (i % 3) * 20}%`,
                            top: `${35 + Math.floor(i / 3) * 30}%`,
                            width: '200px',
                            height: '200px',
                            clipPath: GEOMETRIC_SHAPES[i % GEOMETRIC_SHAPES.length],
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                            rotate: [0, 180, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 12 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Glass Circles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`circle-${i}`}
                        className="absolute bg-white/5 backdrop-blur-3xl rounded-full"
                        style={{
                            left: `${10 + i * 25}%`,
                            top: `${60 + (i % 2) * 20}%`,
                            width: '250px',
                            height: '250px',
                        }}
                        animate={{
                            y: [0, -15, 0],
                            x: [0, 15, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    )
} 