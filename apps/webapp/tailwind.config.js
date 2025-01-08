/** @type {import('tailwindcss').Config} */
 
 
export default {

    content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	extend: {
      backgroundImage:{
        'home-svg':"url('/src/assets/baobbab_home.svg')",
        'home-img':"url('/src/assets/images/escalade.jpg')"
      },
      fontFamily:{
        sketch: ['Cabin Sketch', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      }
  		
  	}
  },
 
}

