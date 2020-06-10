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
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel/LinearProgressWithLabel';
import { CONTAINED } from '../../shared/constants/constants';

export default function Consulation() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <NavBar consultation={CONTAINED}></NavBar>
          <LinearProgressWithLabel />

          <Grid container spacing={4} className={classes.gridContainer}>
            {/* Component NewMeasures */}
            <NewMeasures />

            <Grid item sm={6}>
              {/* Component CardPatient */}
              <CardPatient />
            </Grid>
            {/* Component HistoricalMeasures */}
            <HistoricalMeasures />
          </Grid>
        </main>
      </div>
    </div>
  );
}
