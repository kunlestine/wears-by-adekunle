/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{html,js}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('daisyui')],
  daisyui: {
      themes: [
          {
              lightTheme: {
                  primary: '#f4aa3a',
                  secondary: '#f4f4a1',
                  accent: '#1be885',
                  neutral: '#272136',
                  'base-100': '#ffffff',
                  info: '#778ad4',
                  success: '#23b893',
                  warning: '#f79926',
                  error: '#ea535a',
                  body: {
                      'background-color': '#e3e6e6',
                  },
              },
          },
      ],
  },
}
