import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '3%',
  },
  firstDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  submit: {
    marginTop: 10,
    height: 25,
    marginBottom: 20,
  },
  input: {
    marginTop: 11,
  },
}));
