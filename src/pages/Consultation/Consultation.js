import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CardPatient from '../../components/CardPatient/CardPatient';
import HistoricalMeasures from '../../components/HistoricalMeasures/HistoricalMeasures';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import NewMeasures from '../../components/NewMeasures/NewMeasures';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '120vh',
    overflow: 'auto'
  },
  gridContainer: {
    marginTop: 30
  },
  paperNewMeasure: {
    width: '100%',
    height: 500,
    marginLeft: 10
  },

  typography: {
    paddingTop: 12,
    color: 'rgb(63, 81, 181)',

    'font-size': '16px'
  },
  small: {
    width: 35,
    height: 35
  }
}));

export default function Consulation() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title="Patient" />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar consultation="contained"></NavBar>
          <Grid container spacing={5} className={classes.gridContainer}>
            <Grid item sm={6}>
              <Paper className={classes.paperNewMeasure}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className={classes.typography}
                >
                  Les nouvelles mesures
                </Typography>

                <NewMeasures />
              </Paper>
            </Grid>
            <Grid item sm={6}>
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
          </Grid>

          <HistoricalMeasures />
        </main>
      </div>
    </div>
  );
}
