import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paperFiche: {
    display: 'grid',

    width: '98%',
    paddingBottom: '9%',
  },
  typography: {
    paddingTop: 12,
    color: 'rgb(63, 81, 181)',

    'font-size': '16px',
  },
  typographyTwo: {
    paddingTop: 20,
    color: 'black',
    fontWeight: 'blod',
    'font-size': '14px',
    'text-decoration': 'underline',
  },

  typographyThree: {
    paddingTop: 20,
    color: 'black',

    'font-size': '14px',
  },
  time: {
    width: '50%',
    margin: 'auto',
  },
  listItem: {
    width: '50%',
    margin: 'auto',
  },
  skeletonText: {
    width: '99%',
    height: 100,
  },
  skeletonRect: {
    height: 350,
  },
  keyboardDatePicker: {
    marginTop: 20,
    width: '60%',

    margin: 'auto',
  },
  cirularProgress: {
    margin: 'auto',
    marginTop: 40,
  },
  typographyTwoStyle: {
    paddingTop: 20,
    color: 'black',
    fontWeight: 'blod',
    'font-size': '14px',
    'text-decoration': 'underline',
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    width: '30%',
    margin: 'auto',
  },
}));
