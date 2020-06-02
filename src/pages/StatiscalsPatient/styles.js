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
    height: '120vh',
    overflow: 'hidden',
    overflowY: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  gridContainer: {
    marginTop: 50,
    width: '95%',
    marginLeft: '2%',
  },
  typogh: {
    fontSize: 15,
    fontWeight: 'bold',
  },
}));
