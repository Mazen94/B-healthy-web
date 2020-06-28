import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
export const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 260,
  },
  skeletonStyle: {
    width: '100%',
    height: '32vh',
  },
  fixedHeightPaperEmpty: {
    height: 240,
    justifyContent: 'space-between',
  },
}));
