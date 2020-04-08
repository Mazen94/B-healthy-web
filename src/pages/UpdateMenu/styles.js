import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '150vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    paddingTop: 35,
    overflow: 'auto',
    flexDirection: 'column',
    height: 350,
  },
  select: {
    width: '100%',
  },
  handleIngredient: {
    marginTop: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  skeleton: {
    margin: 'auto',
    marginTop: '10%',
    width: '90%',
  },
}));
