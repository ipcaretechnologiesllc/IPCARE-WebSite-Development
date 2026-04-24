export default function manifest() {
  return {
    name: 'IP Care Technologies',
    short_name: 'IP Care',
    description: 'Enterprise IT, Cybersecurity, Event Infrastructure & Equipment Rental — UAE & Canada.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F245F',
    theme_color: '#0F245F',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
}
