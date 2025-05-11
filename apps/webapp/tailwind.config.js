/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
    darkMode: ['class'],
    content: [
        './index.html', './src/**/*.{js,ts,jsx,tsx}',
        // "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
    	screens: {
    		'xs': '20rem',
    		'md': '48rem',
    		'lg': '64rem',
    		'xl': '95rem'
    	},
    	extend: {
    		backgroundImage: {
				'home-svg': "url('/src/assets/baobbab_home.svg')",
    			'home-img': "url('/src/assets/images/escalade.jpg')",
				'home-bao': "url('/src/assets/baoDescription.png')",
				'registerOrga':"url('/src/assets/meditationProf.jpg')"
    		},
    		fontFamily: {
    			sketch: [
    				'Cabin Sketch',
    				'sans-serif'
    			],
    			poppins: [
    				'Poppins',
    				'sans-serif'
    			],
    			baloo: [
    				'Baloo-2',
    				'sans-serif'
    			]
    		},
    		colors: {
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		}
    	}
    },
    plugins: [tailwindScrollbar],
};
