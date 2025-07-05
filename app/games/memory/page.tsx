'use client'

import { useRouter } from 'next/navigation'
import MemoryGame from '@/app/components/MemoryGame'

export default function MemoryPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <MemoryGame
            onBack={handleBack}
        />
    )
} 