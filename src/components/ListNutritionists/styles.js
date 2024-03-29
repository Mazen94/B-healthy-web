import { makeStyles } from '@material-ui/core/styles';

/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
export const useStyles = makeStyles({
  skeleton: {
    width: '100%',
  },
  table: {
    minWidth: 650,
  },
  avatar: {
    height: 50,
    width: 50,
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
  button: {
    marginRight: 5,
  },
  boxStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  skeletonText: {
    height: '70px',
    width: '100%',
  },
  skeletonRect: {
    height: '55vh',
    width: '100%',
  },
  paper: {
    padding: 15,
  },
});
