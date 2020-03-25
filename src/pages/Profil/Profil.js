import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import Alert from '@material-ui/lab/Alert';
import healthy from '../../api/healthy';
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
  },
  circularProgress: {
    marginTop: '15%'
  }
}));
/**
 * Component for showing profil of nutritionist
 */
export default function Profil() {
  const history = useHistory();
  const classes = useStyles();
  /**
   * The states used in this component
   * email : to retrieve the email entered by the user (initial value empty string)
   * password : to retrieve the password entered by the user (initial value empty string)
   * firstName : to retrieve the firstName entered by the user (initial value empty string)
   * lastName : to retrieve the lastName entered by the user (initial value empty string)
   * flag : to display the loadings when the user validate the fields
   * erreurValidation : when the user gives an email exists
   */
  const [flag, setFlag] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [erreurValidation, setErreurValidation] = useState(false);
  /**
   * arrow function to get the email entered by the user
   * @param {event} e
   */
  const handleEmail = e => {
    setEmail(e.target.value);
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
   * arrow function to get the password entered by the user
   * @param {event} e
   */
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  /**
   *  Arrow function to  Get the data of user connected
   */
  const fetchData = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    const result = await healthy(`/`, {
      headers: { Authorization: authStr }
    });
    setFirstName(result.data.nutritionist.firstName);
    setLastName(result.data.nutritionist.lastName);
    setEmail(result.data.nutritionist.email);
  };
  /**
   * Hook useEffect to call the method fetchData
   */
  useEffect(() => {
    fetchData();
  }, []);
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addPatient to send the data to the DB
   */
  const onSubmitForm = e => {
    e.preventDefault();
    setFlag(true); //change the value of the state (flag) to true to display the spinner
    const nutritionist = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    };
    putNutritionist(nutritionist); //Call the method putNutritionist to send the data to dataBase
  };
  /**
   * Arrow function to send the data to db
   */
  const putNutritionist = async nutritionist => {
    try {
      const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
      const response = await axios.put(
        `http://healthy.test/api/nutritionist`,
        nutritionist,
        {
          headers: { Authorization: authStr }
        }
      );
      console.log(response);
      history.push('/dashboard'); //Redirect to the page dashboard
    } catch (error) {
      console.log(error.response.data);
      console.log('Error', error.message);
      setFlag(false); //change the value of the state (flag) to flase to hide the spinner
      setErreurValidation(true); //change the value of the state (erreurValidation) to true to display the message error
    }
  };
  /**
   * Validation : add custom rules (Password must contain at least 8 characters)
   */
  useEffect(() => {
    ValidatorForm.addValidationRule('lenghPassword', value => {
      if (value.length && value.length < 8) {
        return false;
      }
      return true;
    });
  }, []);

  if (firstName.length === 0) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title="Profil" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <CircularProgress className={classes.circularProgress} />
        </main>
      </div>
    );
  } else
    return (
      <div className={classes.root}>
        <CssBaseline />
        {/* Component MenuBar */}
        <MenuBar title="Profil" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
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
                <Grid item xs={12}>
                  <TextValidator
                    name="firstName"
                    variant="outlined"
                    onChange={handleFirstName}
                    value={firstName}
                    fullWidth
                    autoFocus
                    validators={['required']}
                    errorMessages={['Ce champ est requis']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    onChange={handleLastName}
                    value={lastName}
                    fullWidth
                    validators={['required']}
                    errorMessages={['Ce champ est requis']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    onChange={handleEmail}
                    value={email}
                    fullWidth
                    autoComplete="email"
                    validators={['required', 'isEmail']}
                    errorMessages={[
                      'Ce champ est requis',
                      "L'email n'est pas valide"
                    ]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    onChange={handlePassword}
                    value={password}
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    validators={['lenghPassword']}
                    errorMessages={[
                      'Le mot de passe doit contenir au moins 8 caractères.'
                    ]}
                  />
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
