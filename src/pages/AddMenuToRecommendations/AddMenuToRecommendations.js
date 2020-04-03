import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import TrasfertMenus from '../../components/TransfertMenus/TrasfertMenus';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import {
  RECOMMENDATION_STEPPER_ADD,
  PRIMARY_COLOR
} from '../../shared/constants/constants';
import { VALIDATE, PATIENT } from '../../shared/strings/strings';

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
    marginLeft: '82%'
  },
  paperButton: {
    marginTop: '2%',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  }
}));

export default function AddMenuToRecommendations() {
  const classes = useStyles();

  const step = 1;
  const history = useHistory();
  const params = useParams();
  const onClickButtomValider = () => {
    history.push(`/patient/${params.id}/recommendations`);
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar recommendation="contained"></NavBar>

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
                variant="contained"
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
