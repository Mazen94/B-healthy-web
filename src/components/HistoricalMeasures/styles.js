import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paperFiche: {
    display: 'grid',
    margin: 'auto',
    width: '98%',
    paddingBottom: '2%',
  },
  typography: {
    paddingTop: 12,
    color: 'rgb(63, 81, 181)',

    'font-size': '16px',
  },
  small: {
    width: 35,
    height: 35,
  },
  large: {
    marginTop: 18,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  gridMesure: {
    marginTop: 10,
    width: '100%',
  },
  textFiledMesure: {
    width: 120,
    margin: '1%',
  },
  button: {
    marginTop: '2%',
  },
  date: {
    marginTop: 20,
    width: '60%',

    margin: 'auto',
  },
  textArea: {
    marginTop: '2%',
    margin: 'auto',
    width: '45%',
  },
}));
