import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import iconBelly from '../../assets/belly.png';
import iconChest from '../../assets/chest.png';
import iconLegs from '../../assets/legs.png';
import iconNeck from '../../assets/neck.png';
import iconNote from '../../assets/note.png';
import iconTall from '../../assets/tall.png';
import iconWeight from '../../assets/weight.png';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { axiosService } from '../../shared/services/services';
import { useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as contants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import * as strings from '../../shared/strings/strings';
import {
  ENDPOINT_PATIENTS,
  ENDPOINT_VISITS,
} from '../../shared/constants/endpoint';
import { useStyles } from './styles';
import { isInteger } from '../../shared/services/services';

export default function NewMeasures() {
  const classes = useStyles();
  const [belly, setBelly] = useState(''); // to retrieve the belly entered by the user (initial value empty string)
  const [chest, setChest] = useState(''); // to retrieve the chest entered by the user (initial value empty string)
  const [legs, setLegs] = useState(''); // to retrieve legs entered by the user (initial value empty string)
  const [neck, setNeck] = useState(''); // to retrieve neck  entered by the user (initial value empty string)
  const [note, setNote] = useState(''); // to retrieve note  entered by the user (initial value empty string)
  const [tall, setTall] = useState(''); // to retrieve the tall  entered by the user (initial value empty string)
  const [weight, setWeight] = useState(''); // to retrieve the weight  entered by the user (initial value empty string)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const params = useParams();
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    //custom rules
    isInteger();
  }, []);

  const handleBelly = (e) => {
    setBelly(e.target.value);
  };

  const handleChest = (e) => {
    setChest(e.target.value);
  };

  const handleLegs = (e) => {
    setLegs(e.target.value);
  };

  const handleNeck = (e) => {
    setNeck(e.target.value);
  };

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const handleTall = (e) => {
    setTall(e.target.value);
  };

  const handleWeight = (e) => {
    setWeight(e.target.value);
  };
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addVisit to send the data to the DB
   */
  const onSubmitForm = (e) => {
    e.preventDefault();
    setOpenBackdrop(!openBackdrop);
    const visit = {
      belly,
      chest,
      legs,
      neck,
      note,
      tall,
      weight,
    };
    console.log(params.id);
    // setFlag(true);
    axiosService(
      `${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_VISITS}`,
      contants.POST,
      true,
      visit,
      (error, response) => {
        if (response) {
          setBelly('');
          setChest('');
          setLegs('');
          setNeck('');
          setNote('');
          setTall('');
          setWeight('');
          setOpenSnackbar(true);
          setOpenBackdrop(false);
        }
      }
    );
  };

  const customizeTextFiled = (
    name,
    handleChange,
    value,
    validatior,
    errorMessage,
    srcIcon
  ) => {
    return (
      <TextValidator
        className={classes.textFiledMesure}
        label={name}
        variant={contants.OUTLINED}
        onChange={handleChange}
        value={value}
        validators={validatior}
        errorMessages={errorMessage}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar src={srcIcon} className={classes.small} />
            </InputAdornment>
          ),
        }}
      />
    );
  };

  return (
    <Grid item sm={6} className={classes.grid}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {strings.ADDED_MEASURES}
        </Alert>
      </Snackbar>
      <Paper className={classes.paperNewMeasure}>
        <Typography
          variant={contants.VARAINT_SUBTITLE_ONE}
          gutterBottom
          className={classes.typography}
        >
          {strings.NEW_MEASURES}
        </Typography>
        <ValidatorForm onSubmit={onSubmitForm} noValidate>
          <Grid className={classes.gridMesure}>
            {customizeTextFiled(
              strings.WEIGHT,
              handleWeight,
              weight,
              [
                validations.RULES_NAME_IS_INTEGER,
                validations.RULES_NAME_REQUIRED,
              ],
              [
                validations.MESSAGE_VALIDATORS_INTEGER,
                validations.MESSAGE_VALIDATORS_REQUIRED,
              ],
              iconWeight
            )}
            {customizeTextFiled(
              strings.TALL,
              handleTall,
              tall,
              [validations.RULES_NAME_IS_INTEGER],
              [validations.MESSAGE_VALIDATORS_INTEGER],
              iconTall
            )}
            {customizeTextFiled(
              strings.CHEST,
              handleChest,
              chest,
              [validations.RULES_NAME_IS_INTEGER],
              [validations.MESSAGE_VALIDATORS_INTEGER],
              iconChest
            )}
          </Grid>
          <Grid className={classes.gridMesure}>
            {customizeTextFiled(
              strings.BELLY,
              handleBelly,
              belly,
              [validations.RULES_NAME_IS_INTEGER],
              [validations.MESSAGE_VALIDATORS_INTEGER],
              iconBelly
            )}
            {customizeTextFiled(
              strings.NECK,
              handleNeck,
              neck,
              [validations.RULES_NAME_IS_INTEGER],
              [validations.MESSAGE_VALIDATORS_INTEGER],
              iconNeck
            )}
            {customizeTextFiled(
              strings.LEGS,
              handleLegs,
              legs,
              [validations.RULES_NAME_IS_INTEGER],
              [validations.MESSAGE_VALIDATORS_INTEGER],
              iconLegs
            )}
            <TextValidator
              className={classes.textArea}
              label={strings.NOTE}
              onChange={handleNote}
              value={note}
              multiline
              rows="4"
              variant={contants.OUTLINED}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconNote} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Button
            variant={contants.CONTAINED}
            className={classes.button}
            color={contants.PRIMARY_COLOR}
            type="submit"
          >
            {strings.VALIDATE}
          </Button>
        </ValidatorForm>

        <Backdrop
          className={classes.backdrop}
          open={openBackdrop}
          onClick={handleCloseBackdrop}
        >
          <CircularProgress color={contants.INHERIT_COLOR} />
        </Backdrop>
      </Paper>
    </Grid>
  );
}
