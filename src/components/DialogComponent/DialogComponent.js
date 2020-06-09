import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Fragment } from 'react';
import {
  YES,
  NO,
  DIALOG_CONTEXT_TEXT,
  DELETE_MESSAGE,
} from '../../shared/strings/strings';
import { PRIMARY_COLOR } from '../../shared/constants/constants';

export default function AddIngredient(props) {
  const { open, handleButtonDelete, handleClose, message } = props;

  return (
    <Fragment>
      <Dialog open={open} onClick={handleClose}>
        <DialogTitle>{DELETE_MESSAGE}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {DIALOG_CONTEXT_TEXT} {message} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={PRIMARY_COLOR} onClick={handleClose}>
            {NO}
          </Button>
          <Button color={PRIMARY_COLOR} onClick={handleButtonDelete} autoFocus>
            {YES}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
