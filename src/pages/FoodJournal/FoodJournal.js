import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import ListFood from '../../components/ListFood/ListFood';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '150vh',
    overflow: 'auto'
  },
  listFood: {
    marginTop: '2%',
    marginLeft: '2%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const FoodJournal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = flag => {
    setOpen(flag);
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title="Patient" />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar journalAlimentaire="contained"></NavBar>
          <ListFood className={classes.listFood} handleToggle={handleToggle} />
          <div className={classes.listFood}></div>
        </main>
      </div>
    </div>
  );
};

export default FoodJournal;
