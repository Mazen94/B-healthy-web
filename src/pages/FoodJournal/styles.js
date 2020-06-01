import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: {
    marginTop: 65,
  },
  content: {
    flexGrow: 1,
    height: '150vh',
    overflow: 'auto',
  },
  listFood: {
    marginTop: '2%',
    marginLeft: '2%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
