import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
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
    overflow: 'hidden',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 300,
  },
  iconButton: {
    marginRight: '100%',
  },
  spinner: {
    margin: 'auto   ',
  },
}));
