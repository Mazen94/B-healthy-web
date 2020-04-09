import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { MODIFICATION_MADE } from '../../shared/strings/strings';

const AlertComponent = ({ openSnackbar, handleCloseSnackbar }) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity="success">
        {MODIFICATION_MADE}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
