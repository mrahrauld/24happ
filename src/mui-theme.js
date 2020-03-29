import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = '#1976D2'
const secondaryColor = '#0D47A1'

const theme = createMuiTheme({
  palette : {
    primary: { main: primaryColor },
    secondary: { main: secondaryColor }
  },
  status: {
    danger: 'orange',
  },
  overrides: {
    MuiInputBase: {
      root:{
        color: 'white',
      }
    },
    MuiInput: {
      root:{
        color: 'white',
      }
    },
    MuiInputLabel: {
      root:{
        color: 'white',
      }
    },
  }
  // largeIcon: {
  //   fontSize: "5em"
  // },
  // typography: {
  //   fontFamily: [
  //     '-apple-system',
  //     'BlinkMacSystemFont',
  //     '"Segoe UI"',
  //     'Roboto',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'sans-serif',
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(','),
  // },
});
export default theme