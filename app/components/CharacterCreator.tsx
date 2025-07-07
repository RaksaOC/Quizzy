'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download } from 'lucide-react'
import AnimatedBackground from './shared/AnimatedBackground'

interface CharacterCreatorProps {
    onBack: () => void
}

interface RPMMessage {
    source: string
    eventName: string
    data: {
        url: string
    }
}

export default function CharacterCreator({ onBack }: CharacterCreatorProps) {
    const [avatarUrl, setAvatarUrl] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isEditing, setIsEditing] = useState(true)

    useEffect(() => {
        // Load Ready Player Me iframe
        const subdomain = 'demo'
        const frame = document.getElementById('iframe') as HTMLIFrameElement
        if (frame) {
            frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi&clearCache&quickStart=true`
        }

        // Subscribe to messages from the iframe
        const subscribe = (event: MessageEvent) => {
            const json = parse(event)
            if (json?.source !== 'readyplayerme') {
                return
            }

            // Subscribe to all events sent from Ready Player Me
            if (json.eventName === 'v1.frame.ready') {
                // Frame is ready to receive messages
                const frame = document.getElementById('iframe') as HTMLIFrameElement
                frame?.contentWindow?.postMessage(
                    JSON.stringify({
                        target: 'readyplayerme',
                        type: 'subscribe',
                        eventName: 'v1.**'
                    }),
                    '*'
                )
            }

            // Get avatar URL
            if (json.eventName === 'v1.avatar.exported') {
                setAvatarUrl(json.data.url)
                setIsEditing(false)
            }
        }

        function parse(event: MessageEvent): RPMMessage | null {
            try {
                return typeof event.data === 'string' ? JSON.parse(event.data) : null
            } catch (error) {
                return null
            }
        }

        window.addEventListener('message', subscribe)

        return () => {
            window.removeEventListener('message', subscribe)
        }
    }, [])

    const handleStartOver = () => {
        setAvatarUrl('')
        setIsEditing(true)
    }

    const handleDownload = () => {
        // Open avatar URL in new tab for downloading
        window.open(avatarUrl, '_blank')
    }

    return (
        <div className="min-h-screen p-8 relative z-10">
            <AnimatedBackground
                gradientFrom="slate-900"
                gradientVia="gray-900"
                gradientTo="slate-900"
                overlayFrom="cyan-500"
                overlayVia="fuchsia-500"
                overlayTo="teal-500"
            />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className='hidden lg:block'>Back to Menu</span>
                    </motion.button>
                    <h1 className="text-3xl font-bold text-white text-center">Create Your 3D Character</h1>
                    <div className="w-24" />
                </div>

                {/* Avatar Creator or Preview */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/10 overflow-hidden">
                    <iframe
                        id="iframe"
                        className="w-full"
                        style={{ height: '80vh', border: 'none' }}
                        allow="camera *; microphone *"
                        title="Ready Player Me"
                    />
                </div>
                    <div className="p-8 space-y-6">
                        <div className="flex gap-4 justify-center">
                            <motion.button
                                disabled={isEditing}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownload}
                                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white  ${isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 transition-all'}`}
                            >
                                <Download className="w-5 h-5" />
                                <span>Download Avatar</span>
                            </motion.button>
                        </div>
                    </div>
            </div>
        </div>
    )
} 