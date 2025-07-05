'use client'

import { useRouter } from 'next/navigation'
import CharacterCreator from '@/app/components/CharacterCreator'

export default function CharacterPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <CharacterCreator
            onBack={handleBack}
        />
    )
} 