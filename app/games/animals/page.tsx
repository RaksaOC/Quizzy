'use client'

import { useRouter } from 'next/navigation'
import AnimalsGame from '@/app/components/AnimalsGame'

export default function AnimalsPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <AnimalsGame
            onBack={handleBack}
        />
    )
} 