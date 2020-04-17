import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: '80%',
    margin: 'auto',
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
  typography: {
    fontWeight: 'bold',
  },
  link: {
    color: 'rgb(39 , 39, 39)',
  },
  skeleton: {
    height: 80,
    width: '80%',
    margin: 'auto',
  },
  skeletonRec: {
    height: 300,
    width: '80%',
    margin: 'auto',
  },
}));
