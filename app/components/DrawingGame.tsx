'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Brush, Eraser, Download } from 'lucide-react'
import { SinglePlayerGameLayout } from './shared/GameLayout'

interface DrawingGameProps {
    onBack: () => void
}

const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFE66D',
    '#A8E6CF', '#FF8A65', '#FF6B9D', '#8B4513',
    '#000000', '#FFFFFF'
]

export default function DrawingGame({ onBack }: DrawingGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [currentColor, setCurrentColor] = useState('#000000')
    const [brushSize, setBrushSize] = useState(5)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        const context = canvas.getContext('2d')
        if (!context) return

        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.strokeStyle = currentColor
        context.lineWidth = brushSize
        context.fillStyle = '#FFFFFF'
        context.fillRect(0, 0, canvas.width, canvas.height)
        contextRef.current = context
    }, [])

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = currentColor
        }
    }, [currentColor])

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.lineWidth = brushSize
        }
    }, [brushSize])

    const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = nativeEvent
        contextRef.current?.beginPath()
        contextRef.current?.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        contextRef.current?.closePath()
        setIsDrawing(false)
    }

    const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return
        const { offsetX, offsetY } = nativeEvent
        contextRef.current?.lineTo(offsetX, offsetY)
        contextRef.current?.stroke()
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const context = contextRef.current
        if (canvas && context) {
            context.fillStyle = '#FFFFFF'
            context.fillRect(0, 0, canvas.width, canvas.height)
        }
    }

    const handleColorChange = (color: string) => {
        if (color === 'eraser') {
            setCurrentColor('#FFFFFF')
        } else {
            setCurrentColor(color)
        }
    }

    const downloadDrawing = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement('a')
        link.download = 'my-drawing.png'
        link.href = canvas.toDataURL()
        link.click()
    }

    return (
        <SinglePlayerGameLayout
            title="Drawing Studio"
            onBack={onBack}
            gradientColors={{
                from: 'indigo-400',
                via: 'blue-500',
                to: 'cyan-400',
                overlayFrom: 'blue-400',
                overlayVia: 'indigo-500',
                overlayTo: 'cyan-500'
            }}
        >
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={downloadDrawing}
                        className="flex items-center gap-2 text-white font-bold text-lg bg-green-500/80 hover:bg-green-500 rounded-full px-4 py-2 transition-all"
                    >
                        <Download className="w-5 h-5" />
                        Save
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={clearCanvas}
                        className="flex items-center gap-2 text-white font-bold text-lg bg-red-500/80 hover:bg-red-500 rounded-full px-4 py-2 transition-all"
                    >
                        <Trash2 className="w-5 h-5" />
                        Clear
                    </motion.button>
                </div>

                {/* Drawing Area */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        onMouseMove={draw}
                        onMouseLeave={finishDrawing}
                        className="w-full h-[60vh] rounded-3xl shadow-2xl cursor-crosshair border-4 border-white/20"
                    />
                </motion.div>

                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-6 bg-white/20 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-white/20"
                >
                    {/* Color Palette */}
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <div className="bg-white/20 p-2 rounded-full">
                            <Brush className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold mr-4">Colors</h3>
                        {colors.map(color => (
                            <motion.button
                                key={color}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleColorChange(color)}
                                className={`w-10 h-10 rounded-full border-4 ${currentColor === color ? 'border-yellow-300 shadow-lg' : 'border-white/50'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleColorChange('eraser')}
                            className={`w-10 h-10 rounded-full border-4 flex items-center justify-center bg-white ${currentColor === '#FFFFFF' ? 'border-yellow-300 shadow-lg' : 'border-white/50'}`}
                        >
                            <Eraser className="w-6 h-6 text-gray-600" />
                        </motion.button>
                    </div>

                    {/* Brush Size */}
                    <div className="flex justify-center items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <Brush className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold mr-4">Brush Size</h3>
                        <input
                            type="range"
                            min="2"
                            max="20"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-48"
                        />
                        <span className="text-white font-bold w-8 text-center">{brushSize}</span>
                    </div>
                </motion.div>
            </div>
        </SinglePlayerGameLayout>
    )
} 