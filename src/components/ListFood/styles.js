import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5%',
    margin: 'auto',
    width: '100%',
    maxWidth: '90%',
    backgroundColor: theme.palette.background.paper,
  },
  dialogHeader: {
    backgroundColor: 'rgb(63,81,181)',
    color: 'white',
  },
  numberCalorie: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    'font-size': '16px',
  },

  calorieStyle: {
    marginLeft: 5,
    color: 'rgb(63,81,181)',
    'font-size': '16px',
    fontWeight: 'bold',
  },
  skeleton: {
    marginTop: '2%',
    height: 80,
    width: '80%',
    margin: 'auto',
  },
  skeletonRec: {
    height: 300,
    width: '80%',
    margin: 'auto',
  },

  dividerStyle: {
    marginTop: 20,
    marginBottom: 20,
  },
}));
