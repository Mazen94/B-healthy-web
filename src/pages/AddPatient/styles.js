import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  iconButton: {
    marginRight: '100%',
  },
  form: {
    width: '100%', // Fix IE 11 issue
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
  radioGroup: {
    display: 'block',
  },
}));
