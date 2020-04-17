import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useState } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import UpdateMenuForm from '../../components/UpdateMenuForm/UpdateMenuForm';
import { EDIT } from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function UpdateMenu() {
  const classes = useStyles(); //add styles to variable classes
  const [flag, setFlag] = useState(false); //to open and close the CircularProgress

  const changeFlag = (newFalg) => {
    setFlag(newFalg);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={EDIT} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* UpdateMenuForm component */}
          <UpdateMenuForm changeFlag={changeFlag} />
          {/* Backdrop Component */}
          <Backdrop className={classes.backdrop} open={flag}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </main>
    </div>
  );
}
