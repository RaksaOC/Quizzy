'use client'

import { useRouter } from 'next/navigation'
import ColorGame from '@/app/components/ColorGame'

export default function ColorPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <ColorGame
            onBack={handleBack}
        />
    )
} 