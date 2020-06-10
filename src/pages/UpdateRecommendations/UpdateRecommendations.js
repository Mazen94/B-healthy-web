import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import RecommendationForm from '../../components/RecommendationForm/RecommendationForm';
import MenusRealtedRecommendation from '../../components/MenusRelatedRecommendation/MenusRealtedRecommendation';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { axiosService } from '../../shared/services/services';
import * as constants from '../../shared/constants/constants';
import {
  ENDPOINT_PATIENTS,
  ENDPOINT_RECOMMENDATIONS,
} from '../../shared/constants/endpoint';
import * as strings from '../../shared/strings/strings';
import { PATH_PATIENT, PATH_RECOMMENDATION } from '../../routes/path';
import { useStyles } from './styles';
import { MODIFICATION_MADE } from '../../shared/strings/strings';

export default function UpdateRecommendations() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const params = useParams(); //get params from the url
  const [data, setData] = useState([]);
  const [menus, setMenus] = useState([]); //to get the menu of recommendation
  const step = 1; //const to specify in which stage we are ( in component StepperHorizontal)
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    // Arrow function to get the recommendation by id
    axiosService(
      `${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}${params.idRecommendation}`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setData(response.data.data);
            setFlag(false);
            setMenus(response.data.data.menus);
          }
        } else console.log('error to get a recommendation', error);
      }
    );
    return () => {
      mounted = false;
    };
  }, [params]);
  /**
   * Arrow function to render
   */
  const handleButtonOnClick = () => {
    history.push(
      `${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATION}/${params.idRecommendation}`
    );
  };
  const renderFunction = () => {
    //Skeleton component
    if (flag) {
      return (
        <Grid item xs={12} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            <Skeleton
              variant={constants.SKELETON_VARIANT_RECT}
              className={classes.skeletonRectOne}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton
              variant={constants.SKELETON_VARIANT_RECT}
              className={classes.skeletonRectTwo}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            {/* Component RecommendationForm */}
            <Paper className={classes.recommendationForm}>
              <RecommendationForm
                data={data}
                endPoint={`${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}${params.idRecommendation}`}
                method={constants.PUT}
                message={MODIFICATION_MADE}
              />
            </Paper>
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
        <MenuBar title={strings.PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* Component NavBar */}
          <NavBar recommendation={constants.CONTAINED}></NavBar>
          <div className={classes.stepperHorizontal}>
            {/*Component StepperHorizontal */}
            <StepperHorizontal
              setp={step}
              creation={strings.UPDATERECOMMENDATION_STEPPER_CREATION}
              add={strings.RECOMMENDATION_STEPPER_ADD}
            />
          </div>
          {/* render Function */}
          {renderFunction()}
          <Paper className={classes.paper}>
            <Button
              type="submit"
              variant={constants.CONTAINED}
              color={constants.PRIMARY_COLOR}
              className={classes.submit}
              onClick={handleButtonOnClick}
            >
              {strings.FOLLOWING}
            </Button>
          </Paper>
        </main>
      </div>
    </div>
  );
}
