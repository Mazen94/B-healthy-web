import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

const AlertComponent = ({
  openSnackbar,
  handleCloseSnackbar,
  message,
  severity = 'success',
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
