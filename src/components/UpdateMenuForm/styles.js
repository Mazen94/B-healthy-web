import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    paddingTop: 35,
    overflow: 'auto',
    flexDirection: 'column',
    height: 380,
  },
  select: {
    width: '100%',
  },
  skeletonText: {
    width: '100%',
    height: '55vh',
  },
}));
