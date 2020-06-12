import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paperSearch: {
    width: 450,
    marginLeft: '22%',
  },
  appBarSpacer: {
    marginTop: 65,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  fixedHeight: {
    height: 240,
  },
  ButtonGroup: {
    marginBottom: 10,
    marginLeft: '85%',
  },
  IconButton: {
    width: '4%',
  },
  grid: {
    display: 'flex',
  },
}));
