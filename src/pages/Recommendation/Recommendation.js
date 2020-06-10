import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import ListRecommendations from '../../components/ListRecommendations/ListRecommendations';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { PRIMARY_COLOR, CONTAINED } from '../../shared/constants/constants';
import { ADD, PATIENT } from '../../shared/strings/strings';
import { PATH_PATIENT, PATH_RECOMMENDATION } from '../../routes/path';
import { useStyles } from './styles';

export default function Recommendations() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const params = useParams(); //get the params from url
  /**
   * arrow function to navigate the user to the addRecommendation page
   */
  const handleClickAjouter = () => {
    history.push(`${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATION}`);
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar recommendation={CONTAINED}></NavBar>
          <Button
            className={classes.ButtonGroup}
            variant={CONTAINED}
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
