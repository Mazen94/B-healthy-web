import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '180vh',
    overflow: 'none',
  },
  gridContainer: {
    marginTop: '2%',
  },
  small: {
    width: 35,
    height: 35,
  },
}));
