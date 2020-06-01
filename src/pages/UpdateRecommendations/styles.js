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
  grid: {
    display: 'flex',
    margin: 10,
  },
  submit: {
    marginTop: 'auto',
    marginLeft: '85%',
  },
  paper: {
    padding: 10,
    marginTop: 30,
    margin: 'auto',
    width: '99%',
  },
  recommendationForm: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
    height: 280,
  },
  stepperHorizontal: {
    marginTop: '2%',
    margin: 'auto',
    width: '99%',
  },
  skeleton: {
    marginRight: 10,
  },
}));
