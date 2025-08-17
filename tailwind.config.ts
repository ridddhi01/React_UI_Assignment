import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}',
    './.storybook/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.2s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
