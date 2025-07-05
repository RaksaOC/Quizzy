'use client'

import { useRouter } from 'next/navigation'
import DigitalLiteracyGame from '@/app/components/DigitalLiteracyGame'

export default function DigitalLiteracyPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <DigitalLiteracyGame
            onBack={handleBack}
        />
    )
} 