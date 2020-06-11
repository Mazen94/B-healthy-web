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
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  ButtonGroup: {
    marginBottom: 10,
    marginLeft: '85%',
  },
  paper: {
    marginBottom: 18,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  divStyle: {
    width: 200,
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  skeletonText: {
    height: 75,
  },
}));
