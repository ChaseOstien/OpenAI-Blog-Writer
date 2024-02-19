/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.js',
    './src/components/HistoryBar/HistoryBar.js',
    './src/components/HistoryBar/SingleBlog.js'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'darkPrimary': '#1F1B24',
      'darkGrey': '#121212',
      'darkPurple': '#1F1B24',
      'primaryPurple': '#BB86FC',
      'primaryVariant': '#3700B3',
      'secondaryTeal': '#03DAC6',
      'error': '#CF6679',
      'onPrimary': '#000000',
      'onSecondary': '#000000',
      'onBackground': '#FFFFFF',
      'onSurface': '#FFFFFF',
      'onError': '#000000'
    },
    extend: {
      fontFamily: {
        robotoRegular: 'Roboto, sans-serif'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

