import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'KidsLearn',
    description: 'Interactive educational games and quizzes for kids',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon_io (1)/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon_io (1)/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/favicon_io (1)/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ],
        other: [
            { url: '/favicon_io (1)/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon_io (1)/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io (1)/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io (1)/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io (1)/apple-touch-icon.png" />
                <link rel="manifest" href="/favicon_io (1)/site.webmanifest" />
            </head>
            <body className={`${poppins.className} antialiased`}>
                {children}
            </body>
        </html>
    )
} 