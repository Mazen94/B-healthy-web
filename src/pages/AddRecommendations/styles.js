import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: '110vh',
    paddingBottom: '5%',
    height: '100%',
    overflow: 'none',
  },
  gridContainer: {
    marginTop: '4%',
    margin: 'auto',
    width: '90%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 200,
  },
  formValidator: {
    marginTop: '2%',
  },
  submit: {
    marginTop: 30,
    position: 'relative',
    left: '45%',
  },
}));
