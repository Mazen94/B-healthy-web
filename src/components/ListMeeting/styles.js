import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: 18,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  divStyle: {
    width: 200,
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  skeletonText: {
    height: 75,
  },
}));
