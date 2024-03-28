/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.js',
    './src/components/HistoryBar/HistoryBar.js',
    './src/components/HistoryBar/SingleBlog.js',
    './src/components/SearchBar/SearchBar.js',
    './src/components/Content/Content.js',
    './src/components/HistoryBar/IconMenu.js',
    './src/pages/Home.js',
    './src/pages/Login.js',
    './src/pages/Signup.js',
    './src/pages/Error.js',
    './src/components/HistoryBar/Logout.js',
  ],
  theme: {
    screens: {
      sm: '450px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    spacing: {
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
      '7': '56px',
      '8': '64px',
      '9': '80px',
      '10': '96px',
      '11': '150px',
      '72': '17rem'
    },
    colors: {
      'darkPrimary': '#1F1B24',
      'darkGrey': '#121212',
      'darkGreyOpaque': 'rgba(35, 35, 35, 0.50)',
      'darkPurple': '#1F1B24',
      'primaryPurple': '#BB86FC',
      'primaryVariant': '#3700B3',
      'secondaryTeal': '#03DAC6',
      'error': '#CF6679',
      'onPrimary': '#000000',
      'onSecondary': '#000000',
      'onBackground': '#FFFFFF',
      'onSurface': '#FFFFFF',
      'onError': '#000000',
      'slateDark': '#475569',
      'slateLight': '#cbd5e1',
      'mainBackground': '#030712',
      'secondaryBackground': 'rgba(0, 0, 0, 0.5)',
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

