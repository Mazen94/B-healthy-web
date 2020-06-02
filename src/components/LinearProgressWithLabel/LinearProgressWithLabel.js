import { Box, Paper, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useState, Fragment, useEffect } from 'react';
import { useStyles } from './styles';
import {
  TEXT_SECONDARY,
  GET,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import { FOLLOW_UP_RATE, LOADING } from '../../shared/strings/strings';
import { axiosService } from '../../shared/services/services';
import { useParams, useHistory } from 'react-router-dom';
import * as endpoints from '../../shared/constants/endpoint';
import { PATH_PATIENT, PATH_RECOMMENDATIONS } from '../../routes/path';
export default function LinearProgressWithLabel() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const params = useParams(); //to get the params from url
  const history = useHistory(); //to get the params from url
  const [data, setData] = useState([]);

  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    axiosService(
      `${endpoints.ENDPOINT_PATIENTS}${params.id}/${endpoints.ENDPOINT_STATISCAL}${endpoints.ENDPOINT_FOLLOW_UP}`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            console.log(response.data.data);
            setData(response.data.data);
            setLoading(true);
          }
        } else console.log(error);
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const functionToRender = () => {
    if (loading) {
      if (data !== null)
        return (
          <Fragment>
            <LinearProgress
              variant="determinate"
              value={data}
              className={classes.linearProgress}
            />
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color={PRIMARY_COLOR}
                className={classes.poucentage}
              >{`${data}%`}</Typography>
            </Box>
          </Fragment>
        );
      else
        return (
          <Box minWidth={35}>
            <Button
              onClick={() =>
                history.push(
                  `${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATIONS}`
                )
              }
              color={PRIMARY_COLOR}
            >
              Aucune recommendation trouvé pour ce patient
            </Button>
          </Box>
        );
    } else
      return (
        <Fragment>
          <LinearProgress />
          <Box minWidth={35}>
            <Typography variant="body2" color={TEXT_SECONDARY}>
              {LOADING}
            </Typography>
          </Box>
        </Fragment>
      );
  };

  return (
    <Grid item className={classes.gridContainer}>
      <Paper className={classes.paper}>
        <Typography className={classes.topography} variant={'subtitle1'}>
          {FOLLOW_UP_RATE}
        </Typography>
        <Box className={classes.boxStyle}>
          <Box width="85%" mr={1}>
            {functionToRender()}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
