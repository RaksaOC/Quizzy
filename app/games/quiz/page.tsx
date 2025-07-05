'use client'

import { useRouter } from 'next/navigation'
import QuizGame from '@/app/components/QuizGame'

export default function QuizPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <QuizGame
            onBack={handleBack}
        />
    )
} 