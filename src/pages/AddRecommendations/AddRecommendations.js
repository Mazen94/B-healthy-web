import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory, useParams } from 'react-router-dom';
import healthy from '../../api/healthy';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: '110vh',
    paddingBottom: '5%',
    height: '100%',
    overflow: 'none'
  },
  gridContainer: {
    marginTop: '4%',
    margin: 'auto',
    width: '90%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 200
  },
  formValidator: {
    marginTop: '2%'
  },
  submit: {
    marginTop: 30,
    position: 'relative',
    left: '45%'
  }
}));

export default function AddRecommendations() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [avoid, setAvoid] = useState(''); // to retrieve the avoid entered by the user (initial value empty string)
  const step = 0;
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
  const onSubmitForm = e => {
    e.preventDefault();

    const recommendation = {
      name: name,
      avoid: avoid
    };
    console.log(recommendation);
    addRecommendation(recommendation);
  };
  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} recommendation
   */
  const addRecommendation = async recommendation => {
    try {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.post(
        `/patients/${params.id}/recommendations/`,
        recommendation,
        {
          headers: { Authorization: authStr }
        }
      );
      console.log('response', response.data.recommendation);

      history.push(
        `/patient/${params.id}/recommendation/${response.data.recommendation.id}`
      );
    } catch (error) {
      console.log(error.response.data);
      console.log('Error', error.message);
    }
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title="Patient" />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar recommendation="contained"></NavBar>

          <Grid container spacing={4} className={classes.gridContainer}>
            <StepperHorizontal
              creation="Crée une Recommendation"
              add="Ajouter des menus"
              stepProps={step}
            />
            <Grid container spacing={1}>
              {/* Component Menu */}
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
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
                          id="name"
                          onChange={handleName}
                          value={name}
                          label="Nom"
                          autoFocus
                          validators={['required']}
                          errorMessages={['Ce champ est requis']}
                          endadornment={
                            <InputAdornment position="end">g</InputAdornment>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          className={classes.textValidator}
                          autoComplete="fname"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="name"
                          rows="4"
                          onChange={handleAvoid}
                          value={avoid}
                          label="Les aliments   a eviter"
                          validators={['required']}
                          errorMessages={['Ce champ est requis']}
                          endadornment={
                            <InputAdornment position="end">g</InputAdornment>
                          }
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      suivant
                    </Button>
                  </ValidatorForm>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  );
}
