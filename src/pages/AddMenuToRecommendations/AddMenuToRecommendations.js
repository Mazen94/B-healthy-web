import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import TrasfertMenus from '../../components/TransfertMenus/TrasfertMenus';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { PRIMARY_COLOR, CONTAINED } from '../../shared/constants/constants';
import {
  VALIDATE,
  PATIENT,
  RECOMMENDATION_STEPPER_ADD,
} from '../../shared/strings/strings';
import { PATH_PATIENT, PATH_RECOMMENDATIONS } from '../../routes/path';
import { useStyles } from './styles';

export default function AddMenuToRecommendations() {
  const classes = useStyles();

  const step = 1;
  const history = useHistory();
  const params = useParams();
  const onClickButtomValider = () => {
    history.push(`${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATIONS}`);
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar recommendation={CONTAINED}></NavBar>

          <Grid container spacing={4} className={classes.gridContainer}>
            {/* Component StepperHorizontal */}
            <StepperHorizontal
              add={RECOMMENDATION_STEPPER_ADD}
              stepProps={step}
            />
            {/* Component TrasfertMenus */}
            <TrasfertMenus />
            <Paper className={classes.paperButton}>
              <Button
                type="submit"
                variant={CONTAINED}
                color={PRIMARY_COLOR}
                className={classes.submit}
                onClick={onClickButtomValider}
              >
                {VALIDATE}
              </Button>
            </Paper>
          </Grid>
        </main>
      </div>
    </div>
  );
}
