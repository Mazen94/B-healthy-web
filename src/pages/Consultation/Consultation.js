import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import CardPatient from '../../components/CardPatient/CardPatient';
import HistoricalMeasures from '../../components/HistoricalMeasures/HistoricalMeasures';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import NewMeasures from '../../components/NewMeasures/NewMeasures';
import { PATIENT } from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function Consulation() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar consultation="contained"></NavBar>
          <Grid container spacing={4} className={classes.gridContainer}>
            {/* Component NewMeasures */}
            <NewMeasures />

            <Grid item sm={6}>
              {/* Component CardPatient */}
              <CardPatient />
              {/*<Paper className={classes.prochainRendezVous}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className={classes.typography}
                >
                  Prochain Rendez-vous
                </Typography>
  </Paper>*/}
            </Grid>
            {/* Component HistoricalMeasures */}
            <HistoricalMeasures />
          </Grid>
        </main>
      </div>
    </div>
  );
}
