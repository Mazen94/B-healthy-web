import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  iconButton: {
    marginRight: '100%'
  },
  form: {
    width: '100%', // Fix IE 11 issue
    padding: '5%'
  },
  submit: {
    marginTop: 30
  },
  paper: {
    marginTop: theme.spacing(4),
    margin: 'auto'
  },
  spinner: {
    marginBottom: 20
  },
  radioGroup: {
    display: 'block'
  }
}));
/**
 * Component for showing addPatient Page
 */
export default function AddPatient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  /**
   * The states used in this component
   * email : to retrieve the email entered by the user (initial value empty string)
   * password : to retrieve the password entered by the user (initial value empty string)
   * firstName : to retrieve the firstName entered by the user (initial value empty string)
   * lastName : to retrieve the lastName entered by the user (initial value empty string)
   * numberPhone : to retrieve the numberPhone entered by the user (initial value empty string)
   * gender : to retrieve the gender entered by the user (initial value empty string)
   * flag : to display the loadings when the user validate the fields
   * erreurValidation : when the user gives an email exists
   */
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('femme');
  const [flag, setFlag] = useState(false);
  const [erreurValidation, setErreurValidation] = useState(false);
  const [proffesion, setProffesion] = useState('');
  const [firstName, setFirstName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  /**
   * arrow function to return to the previous page
   */
  const handleArrowBack = () => {
    history.push('/patients/1');
  };
  /**
   * arrow function to get the email entered by the user
   * @param {event} e
   */
  const handleEmail = e => {
    setEmail(e.target.value);
    setErreurValidation(false);
  };
  /**
   * arrow function to get the FirstName entered by the user
   * @param {event} e
   */
  const handleFirstName = e => {
    setFirstName(e.target.value);
  };
  /**
   * arrow function to get the lastName entered by the user
   * @param {event} e
   */
  const handleLastName = e => {
    setLastName(e.target.value);
  };
  /**
   * arrow function to get the NumberPhone entered by the user
   * @param {event} e
   */
  const handleNumberPhone = e => {
    setNumberPhone(e.target.value);
  };
  /**
   * arrow function to get the proffesion entered by the user
   * @param {event} e
   */
  const handleProffesion = e => {
    setProffesion(e.target.value);
  };
  /**
   * arrow function to get the password entered by the user
   * @param {event} e
   */
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  /**
   * arrow function to get the gender entered by the user
   * @param {event} e
   */
  const handleGender = e => {
    setGender(e.target.value);
  };
  /**
   * Validation : add custom rules (Password must contain at least 8 characters)
   */
  useEffect(() => {
    ValidatorForm.addValidationRule('lenghPassword', value => {
      if (value.length < 8) {
        return false;
      }
      return true;
    });
  }, []);
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addPatient to send the data to the DB
   */
  const onSubmitForm = e => {
    e.preventDefault();
    setFlag(true);
    const patient = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      numberPhone: numberPhone,
      password: password,
      profession: proffesion
    };
    console.log(patient);
    addPatient(patient);
  };
  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} patient
   */
  const addPatient = async patient => {
    try {
      const AuthStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.post('/patients', patient, {
        headers: { Authorization: AuthStr }
      });
      console.log(response.data);
      setFlag(false);
      history.push('/patients/1');
    } catch (error) {
      console.log(error.response.data);
      console.log('Error', error.message);
      setFlag(false);
      setErreurValidation(true);
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component MenuBar */}
      <MenuBar title="Creer un patient" />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* Icon to go back */}
        <IconButton
          className={classes.iconButton}
          onClick={handleArrowBack}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <Grid item md={10} component={Paper} className={classes.paper}>
          {/* Alert when the user gives email exist */}
          {erreurValidation && <Alert severity="error">Email existe</Alert>}
          {/* Form */}
          <ValidatorForm
            onSubmit={onSubmitForm}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleFirstName}
                  value={firstName}
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  validators={['required']}
                  errorMessages={['Ce champ est requis']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleLastName}
                  value={lastName}
                  id="lastName"
                  label="Nom de famille"
                  name="lastName"
                  autoComplete="lname"
                  validators={['required']}
                  errorMessages={['Ce champ est requis']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleEmail}
                  value={email}
                  id="email"
                  label="Adresse e-mail"
                  name="email"
                  autoComplete="email"
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    'Ce champ est requis',
                    "L'email n'est pas valide"
                  ]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextValidator
                  autoComplete="nmbrePhone"
                  name="nmbrePhone"
                  variant="outlined"
                  fullWidth
                  onChange={handleNumberPhone}
                  value={numberPhone}
                  id="nmbrePhone"
                  label="Numero Telephone"
                  validators={['required']}
                  errorMessages={['Ce champ est requis']}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  onChange={handleProffesion}
                  value={proffesion}
                  id="proffesion"
                  label="Proffesion"
                  name="proffesion"
                  autoComplete="proffesion"
                  validators={['required']}
                  errorMessages={['Ce champ est requis']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  onChange={handlePassword}
                  value={password}
                  autoComplete="current-password"
                  validators={['lenghPassword', 'required']}
                  errorMessages={[
                    'Le mot de passe doit contenir au moins 8 caractères.',
                    'Ce champ est requis'
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={gender}
                    onChange={handleGender}
                    className={classes.radioGroup}
                  >
                    <FormControlLabel
                      value="femme"
                      control={<Radio color="primary" />}
                      label="Femme"
                    />
                    <FormControlLabel
                      value="homme"
                      control={<Radio color="primary" />}
                      label="Homme"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Valider
            </Button>
          </ValidatorForm>
          {/* Spinner (Loading) when the user clicks on the validate button */}
          {flag && <CircularProgress className={classes.spinner} />}
        </Grid>
      </main>
    </div>
  );
}
