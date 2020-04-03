import React, { useState, useEffect } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Paper } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import { useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {
  MESSAGE_VALIDATORS_REQUIRED,
  PRIMARY_COLOR
} from '../../shared/constants/constants';
import { EDIT, MODIFICATION_MADE } from '../../shared/strings/strings';
/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
    height: 200
  },
  grid: {
    display: 'flex',
    margin: 10
  },
  submit: {
    marginTop: 25
  }
}));
const ModificationRecommendation = props => {
  const classes = useStyles(); //add styles to variable classes
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [avoid, setAvoid] = useState(''); // to retrieve the avoid entered by the user (initial value empty string)
  const params = useParams(); //to get params from the url
  const [openSnackbar, setOpenSnackbar] = useState(false); //state used to open and close the alert
  /**
   * To close the alert
   * @param {event} event
   * @param {string} reason
   */
  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };
  /**
   * get the name and avoid from the props
   */
  useEffect(() => {
    setName(props.name);
    setAvoid(props.avoid);
  }, [props]);
  /**
   * arrow function to get the name entered by the user
   * @param {event} e
   */
  const handleName = e => {
    setName(e.target.value);
  };
  /**
   * arrow function to get the name entered by the user
   * @param {event} e
   */
  const handleAvoid = e => {
    setAvoid(e.target.value);
  };
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion updateRecommendation to send the data to the DB
   * @param {event} e
   */
  const onSubmitForm = e => {
    e.preventDefault();

    const recommendation = {
      name: name,
      avoid: avoid
    };
    updateRecommendation(recommendation);
  };
  /**
   * Send data to db ( update method)
   * @param {object} recommendation
   */
  const updateRecommendation = async recommendation => {
    try {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.put(
        `/patients/${params.id}/recommendations/${params.idRecommendation}`,
        recommendation,
        {
          headers: { Authorization: authStr }
        }
      );
      //open the SnackBar
      setOpenSnackbar(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      {/* Alert  */}
      <Snackbar open={openSnackbar} autoHideDuration={2000}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {MODIFICATION_MADE}
        </Alert>
      </Snackbar>
      {/* From */}
      <Paper className={classes.paper}>
        <ValidatorForm
          onSubmit={onSubmitForm}
          className={classes.formValidator}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                className={classes.textValidator}
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                onChange={handleName}
                value={name}
                autoFocus
                validators={['required']}
                errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                endadornment={<InputAdornment position="end">g</InputAdornment>}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                className={classes.textValidator}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                onChange={handleAvoid}
                value={avoid}
                validators={['required']}
                errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                endadornment={<InputAdornment position="end">g</InputAdornment>}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color={PRIMARY_COLOR}
            className={classes.submit}
          >
            {EDIT}
          </Button>
        </ValidatorForm>
      </Paper>
    </div>
  );
};

export default ModificationRecommendation;
