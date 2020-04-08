import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  large: {
    marginTop: 18,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  typography: {
    marginTop: '10%',
    marginRight: '6%',
    color: 'white',
    margin: 'auto',
  },
  grid: {
    display: 'flex',
  },
}));
