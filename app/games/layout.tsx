'use client'

import { motion } from 'framer-motion'

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        >
            {children}
        </motion.div>
    )
} 