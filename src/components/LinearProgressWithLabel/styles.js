import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: '3%',
    marginLeft: 10,
    width: '98%',
  },

  topography: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: 'rgb(117,117,117,117)',
  },
  boxStyle: {
    paddingBottom: 18,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linearProgress: {
    padding: 3.7,
    borderRadius: 15,
  },
  poucentage: {
    marginTop: 5,
  },
}));
