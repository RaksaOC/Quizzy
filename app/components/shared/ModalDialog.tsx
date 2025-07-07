'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalDialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    showCloseButton?: boolean
}

export default function ModalDialog({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true
}: ModalDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 -top-8 bg-black/50 backdrop-blur-sm z-40"
                    />
                    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'>
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-lg bg-white rounded-xl sm:rounded-2xl shadow-2xl 
                                     p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 pr-4">{title}</h2>
                                {showCloseButton && (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                                    </motion.button>
                                )}
                            </div>

                            {/* Content */}
                            <div className="space-y-3 sm:space-y-4">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
} 