import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  typography: {
    margin: 'auto',
  },
  bar: {
    padding: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  skeletonRect: {
    width: '100%',
    height: '32vh',
  },
}));
