import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LineProgressPatient from '../../components/LineProgressPatient/LineProgressPatient';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import * as constants from '../../shared/constants/constants';
import * as endpoints from '../../shared/constants/endpoint';
import { axiosService } from '../../shared/services/services';
import * as strings from '../../shared/strings/strings';
import { useStyles } from './styles';
import { PATH_PATIENT, PATH_CONSULTATION } from '../../routes/path';
import { Typography, Paper, Button } from '@material-ui/core';

const StatiscalsPatient = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const params = useParams(); //to get the params from url
  const history = useHistory();

  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    axiosService(
      `${endpoints.ENDPOINT_PATIENTS}${params.id}/${endpoints.ENDPOINT_STATISCAL}`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setData(response.data.data); //add the received data to the state data
            setFlag(true);
          }
        } else console.log('error to get all the list of statiscals', error);
      }
    );
    return () => {
      mounted = false;
    };
  }, [params.id]);

  const functionToRender = () => {
    if (flag) {
      const { weights, chest, legs, belly } = data;
      if (
        weights.length !== 0 &&
        chest.length !== 0 &&
        legs.length !== 0 &&
        belly.length !== 0
      )
        return <LineProgressPatient data={data} />;
      else
        return (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography
                className={classes.typogh}
                align="center"
                color="textPrimary"
                variant="subtitle1"
              >
                {`${strings.STATISCALS_EMPTY}`.toUpperCase()}
              </Typography>
              <Button
                onClick={() =>
                  history.push(
                    `${PATH_PATIENT}/${params.id}${PATH_CONSULTATION}`
                  )
                }
                color={constants.PRIMARY_COLOR}
              >
                {strings.GET_MEASURE}
              </Button>
            </Paper>
          </Grid>
        );
    } else {
      return <LineProgressPatient data={[]} />;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar title={strings.PATIENT} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <NavBar statiscal="contained"></NavBar>
        <Grid spacing={5} container className={classes.gridContainer}>
          {functionToRender()}
        </Grid>
      </main>
    </div>
  );
};

export default StatiscalsPatient;
