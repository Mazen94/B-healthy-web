import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paperNewMeasure: {
    marginLeft: 10,
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
  },
  textFiledMesure: {
    width: 120,
    margin: '2%',
  },
  button: {
    marginTop: '3%',
    marginBottom: 50,
  },
  textArea: {
    marginTop: '4%',
    width: '85%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
