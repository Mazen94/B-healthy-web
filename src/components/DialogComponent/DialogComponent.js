import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Fragment } from 'react';
import { YES, NO, DIALOG_CONTEXT_TEXT } from '../../shared/strings/strings';

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
            {DIALOG_CONTEXT_TEXT} {message} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            {NO}
          </Button>
          <Button color="primary" onClick={handleButtonDelete} autoFocus>
            {YES}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
