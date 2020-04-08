import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  submit: {
    marginTop: 9,
    marginLeft: '90%',
  },
  iconButton: {
    marginRight: '95%',
  },
  appBarSpacer: theme.mixins.toolbar,
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
    marginTop: 20,
    height: 55,
  },
}));
