'use client'

import { useRouter } from 'next/navigation'
import GeographyGame from '@/app/components/GeographyGame'

export default function GeographyPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <GeographyGame
            onBack={handleBack}
        />
    )
} 