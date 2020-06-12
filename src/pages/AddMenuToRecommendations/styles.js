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
    marginLeft: '82%',
  },
  paperButton: {
    marginTop: '2%',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
}));
