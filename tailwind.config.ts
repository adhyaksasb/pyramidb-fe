import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],

	theme: {
		container: {
			center: true,
			padding: '2rem',

			screens: {
				'2xl': '1400px'
			}
		},

		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',

				custom: {
					100: '#fafaff',
					200: '#ffffff',
					300: '#ededed',
					400: '#cad7fda4',
					primary: {
						dark: 'rgb(31, 36, 43)'
					},
					secondary: '#0c007d',
					Border: '#3f0097',
					text1: '#3f0097',
					text2: '#5500cb'
				},

				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',

				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},

				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},

				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},

				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},

				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},

				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},

				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},

				text: {
					primary: 'hsl(var(--text-primary) / <alpha-value>)',
					secondary: 'hsl(var(--text-secondary) / <alpha-value>)',
					inverse: 'hsl(var(--text-inverse) / <alpha-value>)'
				}
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},

			fontFamily: {
				sans: [...fontFamily.sans]
			},
			boxShadow: {
				custom: '0px 4px 12px rgba(124,58,237, 0.8)', //rgba(234, 124, 105, 0.32), rgba(92,37,203, 0.32)
				'inverse-top': '4px 4px 0 hsl(13 78% 93%)',
				'inverse-bottom': '4px -4px 0 hsl(13 78% 93%)',
				'inverse-top-dark': '4px 4px 0 hsl(224 71.4% 4.1%)',
				'inverse-bottom-dark': '4px -4px 0 hsl(224 71.4% 4.1%)'
			}
		}
	}
};

export default config;
