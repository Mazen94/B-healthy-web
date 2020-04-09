import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
export const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'flex',
    margin: 10,
  },
  submit: {
    marginTop: 25,
  },
}));
