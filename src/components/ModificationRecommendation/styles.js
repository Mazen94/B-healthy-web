import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
    height: 200,
  },
  grid: {
    display: 'flex',
    margin: 10,
  },
  submit: {
    marginTop: 25,
  },
}));
