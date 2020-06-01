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
}));
