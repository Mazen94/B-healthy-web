import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import { useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_INTEGER,
  PRIMARY_COLOR
} from '../../shared/constants/constants';
import {
  ADDED_MEASURES,
  NEW_MEASURES,
  WEIGHT,
  TALL,
  CHEST,
  BELLY,
  NECK,
  LEGS,
  NOTE,
  VALIDATE
} from '../../shared/strings/strings';
const useStyles = makeStyles(theme => ({
  paperNewMeasure: {
    marginLeft: 10
  },
  typography: {
    paddingTop: 12,
    color: 'rgb(63, 81, 181)',
    'font-size': '16px'
  },
  small: {
    width: 35,
    height: 35
  },
  large: {
    marginTop: 18,
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  gridMesure: {
    marginTop: 10
  },
  textFiledMesure: {
    width: 120,
    margin: '2%'
  },
  button: {
    marginTop: '3%',
    marginBottom: 50
  },
  textArea: {
    marginTop: '4%',
    width: '85%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

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

  /**
   * Validation : add custom rules (amout and MinAge must be number)
   */
  useEffect(() => {
    ValidatorForm.addValidationRule('isInteger', value => {
      if (isNaN(value)) {
        return false;
      }
      return true;
    });
  }, []);
  /**
   * arrow function to get the belly entered by the user
   * @param {event} e
   */
  const handleBelly = e => {
    setBelly(e.target.value);
  };
  /**
   * arrow function to get the chest entered by the user
   * @param {event} e
   */
  const handleChest = e => {
    setChest(e.target.value);
  };
  /**
   * arrow function to get the legs entered by the user
   * @param {event} e
   */
  const handleLegs = e => {
    setLegs(e.target.value);
  };
  /**
   * arrow function to get the Neck entered by the user
   * @param {event} e
   */
  const handleNeck = e => {
    setNeck(e.target.value);
  };
  /**
   * arrow function to get the Note entered by the user
   * @param {event} e
   */
  const handleNote = e => {
    setNote(e.target.value);
  };
  /**
   * arrow function to get the tall entered by the user
   * @param {event} e
   */
  const handleTall = e => {
    setTall(e.target.value);
  };
  /**
   * arrow function to get the Weight entered by the user
   * @param {event} e
   */
  const handleWeight = e => {
    setWeight(e.target.value);
  };
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addVisit to send the data to the DB
   */
  const onSubmitForm = e => {
    e.preventDefault();
    setOpenBackdrop(!openBackdrop);
    const visit = {
      belly: belly,
      chest: chest,
      legs: legs,
      neck: neck,
      note: note,
      tall: tall,
      weight: weight
    };
    console.log(params.id);
    // setFlag(true);
    addVisit(visit);
  };
  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} visit
   */
  const addVisit = async visit => {
    try {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.post(
        `patients/${params.id}/visits/`,
        visit,
        {
          headers: { Authorization: authStr }
        }
      );
      console.log('response', response.data.visits);
      setBelly('');
      setChest('');
      setLegs('');
      setNeck('');
      setNote('');
      setTall('');
      setWeight('');
      setOpenSnackbar(true);
      setOpenBackdrop(false);
    } catch (error) {
      console.log(error.response.data);
      console.log('Error', error.message);
    }
  };

  return (
    <Grid item sm={6} className={classes.grid}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {ADDED_MEASURES}
        </Alert>
      </Snackbar>
      <Paper className={classes.paperNewMeasure}>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.typography}
        >
          {NEW_MEASURES}
        </Typography>
        <ValidatorForm onSubmit={onSubmitForm} noValidate>
          <Grid className={classes.gridMesure}>
            <TextValidator
              className={classes.textFiledMesure}
              label={WEIGHT}
              variant="outlined"
              onChange={handleWeight}
              value={weight}
              validators={['isInteger', 'required']}
              errorMessages={[
                MESSAGE_VALIDATORS_INTEGER,
                MESSAGE_VALIDATORS_REQUIRED
              ]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconWeight} className={classes.small} />
                  </InputAdornment>
                )
              }}
            />
            <TextValidator
              className={classes.textFiledMesure}
              label={TALL}
              variant="outlined"
              onChange={handleTall}
              value={tall}
              validators={['isInteger']}
              errorMessages={[MESSAGE_VALIDATORS_INTEGER]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconTall} className={classes.small} />
                  </InputAdornment>
                )
              }}
            />
            <TextValidator
              className={classes.textFiledMesure}
              label={CHEST}
              variant="outlined"
              validators={['isInteger']}
              errorMessages={[MESSAGE_VALIDATORS_INTEGER]}
              onChange={handleChest}
              value={chest}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconChest} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid className={classes.gridMesure}>
            <TextValidator
              className={classes.textFiledMesure}
              label={BELLY}
              variant="outlined"
              validators={['isInteger']}
              errorMessages={[MESSAGE_VALIDATORS_INTEGER]}
              onChange={handleBelly}
              value={belly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconBelly} className={classes.small} />
                  </InputAdornment>
                )
              }}
            />
            <TextValidator
              className={classes.textFiledMesure}
              label={NECK}
              variant="outlined"
              validators={['isInteger']}
              errorMessages={[MESSAGE_VALIDATORS_INTEGER]}
              onChange={handleNeck}
              value={neck}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconNeck} className={classes.small} />
                  </InputAdornment>
                )
              }}
            />
            <TextValidator
              className={classes.textFiledMesure}
              label={LEGS}
              variant="outlined"
              validators={['isInteger']}
              errorMessages={[MESSAGE_VALIDATORS_INTEGER]}
              onChange={handleLegs}
              value={legs}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconLegs} className={classes.small} />
                  </InputAdornment>
                )
              }}
            />

            <TextValidator
              className={classes.textArea}
              id="outlined-multiline-static"
              label={NOTE}
              onChange={handleNote}
              value={note}
              multiline
              rows="4"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={iconNote} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Button
            mx="auto"
            size="small"
            variant="contained"
            className={classes.button}
            color={PRIMARY_COLOR}
            type="submit"
          >
            {VALIDATE}
          </Button>
        </ValidatorForm>

        <Backdrop
          className={classes.backdrop}
          open={openBackdrop}
          onClick={handleCloseBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </Grid>
  );
}
