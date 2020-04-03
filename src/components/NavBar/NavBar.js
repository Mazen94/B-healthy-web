import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  RECOMMENDATIONS,
  FOOD_JOURNAL,
  CONSULTATION
} from '../../shared/strings/strings';
import { PRIMARY_COLOR } from '../../shared/constants/constants';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
    paddingLeft: 30
  },
  paper: {
    height: 150,
    width: 150
  },
  control: {
    paddingRight: 50
  },
  button: {
    height: 150,
    width: 150
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const { consultation, recommendation, journalAlimentaire } = props;
  /**
   * when the user clicks on the button consultation
   */
  const handleClickConsultation = () => {
    history.push(`/patient/${params.id}/consultation`);
  };
  /**
   * when the user clicks on the button recommendation
   */
  const handleClickRecommendation = () => {
    history.push(`/patient/${params.id}/recommendations`);
  };
  /**
   * when the user clicks on the button Journal Alimentaire
   */
  const handleClickJournal = () => {
    history.push(`/patient/${params.id}/foodJournal`);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid className={classes.control}>
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            color={PRIMARY_COLOR}
            variant={consultation}
            onClick={handleClickConsultation}
          >
            {CONSULTATION}
          </Button>
        </Paper>
      </Grid>
      <Grid className={classes.control}>
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            onClick={handleClickRecommendation}
            color={PRIMARY_COLOR}
            variant={recommendation}
          >
            {RECOMMENDATIONS}
          </Button>
        </Paper>
      </Grid>
      <Grid className={classes.control}>
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            color={PRIMARY_COLOR}
            variant={journalAlimentaire}
            onClick={handleClickJournal}
          >
            {FOOD_JOURNAL}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
