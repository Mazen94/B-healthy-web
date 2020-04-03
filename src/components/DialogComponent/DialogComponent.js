import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Fragment } from 'react';

export default function AddIngredient(props) {
  const { open, handleButtonDelete, handleClose, message } = props;

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{'Supprimer'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous voulez vraiment supprimer {message} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Non
          </Button>
          <Button color="primary" onClick={handleButtonDelete} autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
