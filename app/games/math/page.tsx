'use client'

import { useRouter } from 'next/navigation'
import MathGame from '@/app/components/MathGame'

export default function MathPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <MathGame
            onBack={handleBack}
        />
    )
} 