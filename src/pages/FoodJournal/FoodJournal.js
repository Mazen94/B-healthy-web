import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import ListFood from '../../components/ListFood/ListFood';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PATIENT } from '../../shared/strings/strings';
import { useStyles } from './styles';
import { INHERIT_COLOR, CONTAINED } from '../../shared/constants/constants';

const FoodJournal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (flag) => {
    setOpen(flag);
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color={INHERIT_COLOR} />
      </Backdrop>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar journalAlimentaire={CONTAINED}></NavBar>
          <ListFood className={classes.listFood} handleToggle={handleToggle} />
          <div className={classes.listFood}></div>
        </main>
      </div>
    </div>
  );
};

export default FoodJournal;
