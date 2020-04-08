import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5%',
    margin: 'auto',
    width: '100%',
    maxWidth: '90%',
    backgroundColor: theme.palette.background.paper,
  },
  numberCalorie: {
    color: 'black',
    'font-size': '14px',
  },
  ingredients: {
    marginLeft: '25%',
    'font-size': '14px',
  },
  skeleton: {
    marginTop: '5%',
    margin: 'auto',
  },
  skeletonRec: {
    margin: 'auto',
  },
}));
