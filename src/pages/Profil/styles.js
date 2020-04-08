import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  skeleton: {
    margin: 'auto',
    marginTop: '3%',
    width: '85%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  form: {
    width: '100%',
    padding: '5%',
  },
  submit: {
    marginTop: 30,
  },
  paper: {
    marginTop: theme.spacing(4),
    margin: 'auto',
  },
  spinner: {
    marginBottom: 20,
  },
}));
