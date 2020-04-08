import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: 80,
    margin: 'auto',
    display: 'flex',
  },
  grid: {
    margin: 'auto',
    marginLeft: '2%',
  },
  submit: {
    margin: 'auto',
    marginRight: '2%',
  },
  paperChip: {
    height: 200,
    marginTop: 10,
  },
  chip: {
    marginTop: 10,
  },
}));
