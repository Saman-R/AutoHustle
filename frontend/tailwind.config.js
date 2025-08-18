/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    textend: {
        fontFamily: {
            sans: ['Urbanist', 'sans-serif'], // replace default sans
        },
    },
    plugins: [],
}
