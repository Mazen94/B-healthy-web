import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
export const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: 'auto',

    width: '100%',
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
  },
  fixedHeight: {
    height: 240,
  },
  ButtonGroup: {
    marginBottom: 10,
    marginLeft: '85%',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  link: {
    color: 'rgb(39 , 39, 39)',
  },
}));
