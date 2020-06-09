import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  skeletonStyle: {
    width: '100%',
    height: '32vh',
  },
  fixedHeight: {
    height: 240,
  },
}));
