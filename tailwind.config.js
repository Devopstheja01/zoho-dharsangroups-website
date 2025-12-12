/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a',
                    light: '#1e293b',
                    dark: '#020617',
                },
                accent: {
                    DEFAULT: '#d4af37',
                    light: '#dcc16a',
                    dark: '#b8941f',
                },
                surface: '#f8fafc',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow: {
                'luxury': '0 20px 60px -15px rgba(15, 23, 42, 0.3)',
            },
        },
    },
    plugins: [],
}
