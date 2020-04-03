import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import ListRecommendations from '../../components/ListRecommendations/ListRecommendations';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import {
  PATIENT_MENU_BAR_TITLE,
  PRIMARY_COLOR
} from '../../shared/constants/constants';
import { ADD } from '../../shared/strings/strings';

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
    minHeight: '110vh',
    paddingBottom: '5%',
    height: '100%',
    overflow: 'none'
  },
  gridContainer: {
    marginTop: '2%'
  },
  ButtonGroup: {
    marginTop: '2%',
    marginLeft: '70%'
  }
}));

export default function Recommendations() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const params = useParams(); //get the params from url
  /**
   * arrow function to navigate the user to the addRecommendation page
   */
  const handleClickAjouter = () => {
    history.push(`/patient/${params.id}/recommendation`);
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT_MENU_BAR_TITLE} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar recommendation="contained"></NavBar>
          <Button
            className={classes.ButtonGroup}
            variant="contained"
            color={PRIMARY_COLOR}
            onClick={handleClickAjouter}
          >
            {ADD}
          </Button>
          <Grid container spacing={4} className={classes.gridContainer}>
            {/* Component ListRecommendation */}
            <ListRecommendations />
          </Grid>
        </main>
      </div>
    </div>
  );
}
