import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import ModificationRecommendation from '../../components/ModificationRecommendation/ModificationRecommendation';
import MenusRealtedRecommendation from '../../components/MenusRelatedRecommendation/MenusRealtedRecommendation';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import {
  PATIENT_MENU_BAR_TITLE,
  UPDATERECOMMENDATION_STEPPER_CREATION,
  RECOMMENDATION_STEPPER_ADD
} from '../../constants/constants';
import Axios from 'axios';
/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
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
  grid: {
    display: 'flex',
    margin: 10
  },
  submit: {
    marginTop: 'auto',
    marginLeft: '85%'
  },
  paper: {
    padding: 10,
    marginTop: 30,
    margin: 'auto',
    width: '99%'
  },
  stepperHorizontal: {
    marginTop: '2%',
    margin: 'auto',
    width: '99%'
  },
  skeleton: {
    marginRight: 10
  }
}));

export default function UpdateRecommendations() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const params = useParams(); //get params from the url
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [avoid, setAvoid] = useState(''); // to retrieve the avoid entered by the user (initial value empty string)
  const [menus, setMenus] = useState([]); //to get the menu of recommendation
  const step = 1; //const to specify in which stage we are ( in component StepperHorizontal)

  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    // Arrow function to get the recommendation by id
    const getRecommendationById = async () => {
      try {
        const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
        const response = await healthy.get(
          `/patients/${params.id}/recommendations/${params.idRecommendation}`,
          {
            headers: { Authorization: authStr }
          },
          {
            cancelToken: source.token
          }
        );
        if (mounted) {
          setName(response.data.recommendation.name);
          setAvoid(response.data.recommendation.avoid);
          setMenus(response.data.recommendation.menus);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getRecommendationById();
    return () => {
      //cancel the request
      mounted = false;
      source.cancel();
    };
  }, [params]);
  /**
   * Arrow function to render
   */
  const handleButtonOnClick = () => {
    history.push(
      `/patient/${params.id}/recommendation/${params.idRecommendation}`
    );
  };
  const renderFunction = () => {
    //Skeleton component
    if (name === '') {
      return (
        <Grid item xs={12} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            <Skeleton
              variant="rect"
              height="200px"
              className={classes.skeleton}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rect" height="300px" />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            {/* Component ModificationRecommendation */}
            <ModificationRecommendation name={name} avoid={avoid} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Component MenusRealtedRecommendation */}
            <MenusRealtedRecommendation menus={menus} />
          </Grid>
        </Grid>
      );
    }
  };

  /**
   * The render Method
   */
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT_MENU_BAR_TITLE} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* Component NavBar */}
          <NavBar recommendation="contained"></NavBar>
          <div className={classes.stepperHorizontal}>
            {/*Component StepperHorizontal */}
            <StepperHorizontal
              setp={step}
              creation={UPDATERECOMMENDATION_STEPPER_CREATION}
              add={RECOMMENDATION_STEPPER_ADD}
            />
          </div>
          {/* render Function */}
          {renderFunction()}
          <Paper className={classes.paper}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleButtonOnClick}
            >
              Suivant
            </Button>
          </Paper>
        </main>
      </div>
    </div>
  );
}
