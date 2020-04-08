import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AddPatientForm from '../../components/AddPatientForm/AddPatientForm';
import MenuBar from '../../components/MenuBar/MenuBar';
import { PATH_PATIENTS } from '../../routes/path';
import { PRIMARY_COLOR } from '../../shared/constants/constants';
import { isInteger, lenghOfPassword } from '../../shared/services/services';
import { ADD_PATIENT_TITLE } from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function AddPatient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields.
  const [erreurValidation, setErreurValidation] = useState(false); // when the user gives an email exists.

  /**
   * arrow function to return to the previous page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_PATIENTS}/1`);
  };

  function changeFlag(flagChange) {
    setFlag(flagChange);
  }
  function changeErreurValidation(validationErreur) {
    setErreurValidation(validationErreur);
  }
  useEffect(() => {
    //custom rules
    lenghOfPassword();
    isInteger();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component MenuBar */}
      <MenuBar title={ADD_PATIENT_TITLE} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* Icon to go back */}
        <IconButton
          className={classes.iconButton}
          onClick={handleArrowBack}
          color={PRIMARY_COLOR}
        >
          <ArrowBackIcon />
        </IconButton>
        <Grid item md={10} component={Paper} className={classes.paper}>
          {/* Alert when the user gives email exist */}
          {erreurValidation && <Alert severity="error">Email existe</Alert>}
          {/* AddPatientForm Patient */}
          <AddPatientForm
            changeFlag={changeFlag}
            changeErreurValidation={changeErreurValidation}
          />
          {/* Spinner (Loading) when the user clicks on the validate button */}
          {flag && <CircularProgress className={classes.spinner} />}
        </Grid>
      </main>
    </div>
  );
}
