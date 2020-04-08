import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gridFiche: {
    height: 'auto',
  },
  large: {
    marginTop: '4%',
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  typography: {
    marginTop: '20%',

    margin: 'auto',
    color: 'white',
  },

  grid: {
    display: 'flex',
    overflow: 'hidden',
  },
  patientPaper: {
    backgroundColor: 'rgb(63, 81, 181)',
    marginRight: 15,
    height: 'auto',

    paddingBottom: '14%',
  },
  patientTypography: {
    paddingTop: 12,
    color: 'white',

    'font-size': '16px',
  },
  skeleton: {
    margin: 'auto',
  },
}));
