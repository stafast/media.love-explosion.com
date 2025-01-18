/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '0.5rem',
		},
		fontFamily: {
			'sans': ['"Unbounded Variable"', 'ui-sans-serif', 'system-ui']
		},
		extend: {
			screens: {
				'xs': '480px',
			},
		},
	},
	plugins: [],
}
