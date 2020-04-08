import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
    paddingLeft: 30,
  },
  paper: {
    height: 150,
    width: 150,
  },
  control: {
    paddingRight: 50,
  },
  button: {
    height: 150,
    width: 150,
  },
}));
