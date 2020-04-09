import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
export const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: 30,
    position: 'relative',
    left: '45%',
  },

  select: {
    width: '100%',
  },
}));
