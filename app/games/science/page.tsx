'use client'

import { useRouter } from 'next/navigation'
import ScienceGame from '@/app/components/ScienceGame'

export default function SciencePage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <ScienceGame
            onBack={handleBack}
        />
    )
} 