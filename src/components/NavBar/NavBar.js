import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  RECOMMENDATIONS,
  FOOD_JOURNAL,
  CONSULTATION,
} from '../../shared/strings/strings';
import { PRIMARY_COLOR } from '../../shared/constants/constants';
import {
  PATH_PATIENT,
  PATH_CONSULTATION,
  PATH_RECOMMENDATIONS,
  PATH_JOURNAL,
} from '../../routes/path';
import { useStyles } from './styles';

export default function NavBar(props) {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const { consultation, recommendation, journalAlimentaire } = props;
  /**
   * when the user clicks on the button consultation
   */
  const handleClickConsultation = () => {
    history.push(`${PATH_PATIENT}/${params.id}${PATH_CONSULTATION}`);
  };
  /**
   * when the user clicks on the button recommendation
   */
  const handleClickRecommendation = () => {
    history.push(`${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATIONS}`);
  };
  /**
   * when the user clicks on the button Journal Alimentaire
   */
  const handleClickJournal = () => {
    history.push(`${PATH_PATIENT}/${params.id}${PATH_JOURNAL}`);
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
