/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screen: {
          xs:'20rem',
          md:'48rem',
          lg:'90rem',
          xl:'120rem'

        },
        extend: {
            backgroundImage: {
                'home-svg': "url('/src/assets/baobbab_home.svg')",
                'home-img': "url('/src/assets/images/escalade.jpg')",
            },
            fontFamily: {
                sketch: ['Cabin Sketch', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [tailwindScrollbar],
};
