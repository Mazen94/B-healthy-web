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
import Skeleton from '@material-ui/lab/Skeleton';
import {
  PROFIL_TITLE,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_PASSWORD,
  MESSAGE_VALIDATORS_EMAIL
} from '../../shared/constants/constants';
import { EMAIL_EXISTS, PASSWORD, VALIDATE } from '../../shared/strings/strings';
import Axios from 'axios';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  skeleton: {
    margin: 'auto',
    marginTop: '3%',
    width: '85%'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  form: {
    width: '100%',
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
  }
}));
/**
 * Component for showing profil of nutritionist
 */
export default function Profil() {
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const classes = useStyles(); //add styles to variable classes
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields
  const [email, setEmail] = useState(''); //to retrieve the email entered by the user
  const [firstName, setFirstName] = useState(''); //to retrieve the firstName entered by the user
  const [lastName, setLastName] = useState(''); //to retrieve the lastName entered by the user
  const [password, setPassword] = useState(''); //to retrieve the password entered by the user
  const [erreurValidation, setErreurValidation] = useState(false); //when the user gives an email exists
  const [openSkeleton, setOpenSkeleton] = useState(true); //to open and close the Skeleton

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
   * Hook useEffect to call the method fetchData
   */
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    // Arrow function to  Get the data of user connected
    const fetchData = async () => {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      const result = await healthy(
        `/`,
        {
          headers: { Authorization: authStr }
        },
        {
          cancelToken: source.token
        }
      );
      if (mounted) {
        setFirstName(result.data.nutritionist.firstName);
        setLastName(result.data.nutritionist.lastName);
        setEmail(result.data.nutritionist.email);
        setOpenSkeleton(false);
      }
    };
    fetchData();
    return () => {
      //cancel the request
      mounted = false;
      source.cancel();
    };
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

  /**
   *  function to render
   */
  const renderFunction = () => {
    if (openSkeleton) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}

          <Skeleton variant="rect" width="100%" height="55vh" />
        </div>
      );
    } else
      return (
        <Grid item md={10} component={Paper} className={classes.paper}>
          {/* Alert when the user gives email exist */}
          {erreurValidation && <Alert severity="error">{EMAIL_EXISTS}</Alert>}
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
                  errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  onChange={handleLastName}
                  value={lastName}
                  fullWidth
                  validators={['required']}
                  errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
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
                    MESSAGE_VALIDATORS_REQUIRED,
                    MESSAGE_VALIDATORS_EMAIL
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
                  label={PASSWORD}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  validators={['lenghPassword']}
                  errorMessages={[MESSAGE_VALIDATORS_PASSWORD]}
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
              {VALIDATE}
            </Button>
          </ValidatorForm>
          {/* Spinner (Loading) when the user clicks on the validate button */}
          {flag && <CircularProgress className={classes.spinner} />}
        </Grid>
      );
  };
  /**
   * Render method
   */
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component MenuBar */}
      <MenuBar title={PROFIL_TITLE} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {renderFunction()}
      </main>
    </div>
  );
}
