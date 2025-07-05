'use client'

import { useRouter } from 'next/navigation'
import DrawingGame from '@/app/components/DrawingGame'

export default function DrawingPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <DrawingGame
            onBack={handleBack}
        />
    )
} 