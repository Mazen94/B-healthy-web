import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 300,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  gridContainer: {
    direction: 'column',
    alignItems: 'center',
  },
}));
