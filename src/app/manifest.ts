import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chiyambi Learning Platform',
    short_name: 'Chiyambi',
    description: 'Safe, joyful early learning for Malawian children, families and teachers.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f2fafa',
    theme_color: '#12807c',
    orientation: 'any',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
