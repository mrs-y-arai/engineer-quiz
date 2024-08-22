import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        white: 'rgb(var(--white) / <alpha-value>)',
        red: 'rgb(var(--red) / <alpha-value>)',
        black: 'rgb(var(--black) / <alpha-value>)',
        gray: {
          DEFAULT: 'rgb(var(--gray) / <alpha-value>)',
          strong: 'rgb(var(--strong-gray) / <alpha-value>)',
          light: 'rgb(var(--light-gray) / <alpha-value>)',
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
        },
        success: 'rgb(var(--success) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        DEFAULT: 'var(--rounded)',
        lg: 'calc(var(--rounded) + 4px)',
        md: 'calc(var(--rounded) + 2px)',
        sm: 'calc(var(--rounded) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      zIndex: {
        loading: '9999',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
