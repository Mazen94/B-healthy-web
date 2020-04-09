import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

const AlertComponent = ({ openSnackbar, handleCloseSnackbar, message }) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
