'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Eraser, Download, ArrowLeft, Square } from 'lucide-react'
import AnimatedBackground from './shared/AnimatedBackground'

interface DrawingGameProps {
    onBack: () => void
}

interface DrawingAction {
    type: 'draw' | 'erase'
    points: { x: number; y: number }[]
    color?: string
    width?: number
}

const PRESET_COLORS = [
    '#000000', // Black
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFA500', // Orange
    '#800080', // Purple
    '#FF1493', // Pink
    '#FFD700', // Gold
]

const PAGE_COLORS = [
    '#FFFFFF', // White
    '#F0F0F0', // Light Gray
    '#FFF5E1', // Cream
    '#E8F5E9', // Mint
    '#E3F2FD', // Light Blue
    '#FCE4EC', // Light Pink
]

// These classes need to be explicitly written out for Tailwind to detect them
// from-purple-400 via-pink-500 to-red-600
// from-indigo-400 via-purple-500 to-pink-500

export default function DrawingGame({ onBack }: DrawingGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [currentColor, setCurrentColor] = useState(PRESET_COLORS[0])
    const [currentWidth, setCurrentWidth] = useState(5)
    const [isErasing, setIsErasing] = useState(false)
    const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null)
    const [pageColor, setPageColor] = useState(PAGE_COLORS[0])
    const [showPageColors, setShowPageColors] = useState(false)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const updateCanvasSize = () => {
            const container = canvas.parentElement
            if (!container) return

            const { width, height } = container.getBoundingClientRect()
            canvas.width = width
            canvas.height = height

            // Set background color
            ctx.fillStyle = pageColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        updateCanvasSize()
        window.addEventListener('resize', updateCanvasSize)

        return () => {
            window.removeEventListener('resize', updateCanvasSize)
        }
    }, [pageColor])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return
        setIsDrawing(true)

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const point = {
            x: ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left,
            y: ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top
        }

        setLastPoint(point)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current || !lastPoint) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const currentPoint = {
            x: ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left,
            y: ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top
        }

        // Draw the line
        ctx.beginPath()
        ctx.moveTo(lastPoint.x, lastPoint.y)

        if (isErasing) {
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 20
        } else {
            ctx.strokeStyle = currentColor
            ctx.lineWidth = currentWidth
        }

        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.lineTo(currentPoint.x, currentPoint.y)
        ctx.stroke()

        setLastPoint(currentPoint)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        setLastPoint(null)
    }

    const handleDownload = () => {
        if (!canvasRef.current) return
        const link = document.createElement('a')
        link.download = 'drawing.png'
        link.href = canvasRef.current.toDataURL()
        link.click()
    }

    const handlePageColorChange = (color: string) => {
        setPageColor(color)
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Save the current canvas content
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        // Set new background
        ctx.fillStyle = color
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Restore the content
        ctx.putImageData(imageData, 0, 0)
    }

    return (
        <div className="min-h-screen p-8 relative z-10">
            <AnimatedBackground
                gradientFrom="purple-400"
                gradientVia="pink-500"
                gradientTo="red-600"
                overlayFrom="indigo-400"
                overlayVia="purple-500"
                overlayTo="pink-500"
            />
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Back to Menu</span>
                    </motion.button>
                    <h1 className="text-3xl font-bold text-white text-center">Drawing Pad</h1>
                    <div className='lg:w-48 w-12' />
                </div>

                {/* Drawing Area */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <canvas
                        ref={canvasRef}
                        className="w-full aspect-video touch-none"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                    />
                </div>

                {/* Drawing Tools */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Preset Colors */}
                        <div className="flex gap-2">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => {
                                        setCurrentColor(color)
                                        setIsErasing(false)
                                    }}
                                    className={`
                                        w-8 h-8 rounded-full transition-transform shadow-sm
                                        ${currentColor === color && !isErasing ? 'scale-110 ring-2 ring-offset-2 ring-white/50' : ''}
                                        hover:scale-110
                                    `}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>

                        {/* Custom Color */}
                        <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-white/20">
                            <input
                                type="color"
                                value={currentColor}
                                onChange={(e) => {
                                    setCurrentColor(e.target.value)
                                    setIsErasing(false)
                                }}
                                className="w-10 h-10 -ml-1 -mt-1 cursor-pointer"
                            />
                        </div>

                        {/* Line Width */}
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={currentWidth}
                            onChange={(e) => setCurrentWidth(parseInt(e.target.value))}
                            className="w-32 accent-white/90"
                        />

                        {/* Page Color */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowPageColors(!showPageColors)}
                                className={`p-3 rounded-xl backdrop-blur-sm transition-colors bg-white/10 text-white/70 hover:bg-white/20`}
                                style={{ backgroundColor: pageColor }}
                            >
                                <Square className="w-5 h-5" />
                            </motion.button>

                            {showPageColors && (
                                <div className="absolute top-full left-0 mt-2 p-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg flex gap-2">
                                    {PAGE_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => {
                                                handlePageColorChange(color)
                                                setShowPageColors(false)
                                            }}
                                            className={`
                                                w-8 h-8 rounded-lg transition-transform
                                                ${pageColor === color ? 'ring-2 ring-white/50' : ''}
                                                hover:scale-110
                                            `}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                    <div className="h-8 w-8 rounded-lg overflow-hidden ring-1 ring-white/20">
                                        <input
                                            type="color"
                                            value={pageColor}
                                            onChange={(e) => handlePageColorChange(e.target.value)}
                                            className="w-10 h-10 -ml-1 -mt-1 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Eraser */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsErasing(!isErasing)}
                            className={`p-3 rounded-xl backdrop-blur-sm transition-colors ${isErasing ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                        >
                            <Eraser className="w-5 h-5" />
                        </motion.button>

                        {/* Download */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleDownload}
                            className="p-3 rounded-xl backdrop-blur-sm bg-white/20 text-white ml-auto hover:bg-white/30 transition-colors"
                        >
                            <Download className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
} 