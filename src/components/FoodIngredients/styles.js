import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  ingredients: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
    'font-size': '16px',
  },
  avatarStyle: {
    height: 30,
    width: 30,
  },

  ingredietStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  amountStyle: {
    fontWeight: 'bold',
  },
}));
