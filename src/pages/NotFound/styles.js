import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
export const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(63,81,181)',
    alignItems: 'center',
  },
  avatar: {
    marginTop: '5%',
    height: 300,
    width: 300,
  },
  typoghraphy: {
    fontSize: 24,

    color: 'white',
  },
}));
