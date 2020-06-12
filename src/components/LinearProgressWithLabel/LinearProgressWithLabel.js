import { Box, Paper, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useState, Fragment, useEffect } from 'react';
import { useStyles } from './styles';
import * as constants from '../../shared/constants/constants';
import {
  FOLLOW_UP_RATE,
  LOADING,
  NO_RECOMMENDATION_FOUND,
} from '../../shared/strings/strings';
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
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setData(response.data.data);
            setLoading(true);
          }
        } else console.log(error);
      }
    );
    return () => {
      mounted = false;
    };
  }, [params.id]);

  const functionToRender = () => {
    if (loading) {
      if (data !== null)
        return (
          <Fragment>
            <LinearProgress
              variant={constants.VARAINT_DETERMINATE}
              value={data}
              className={classes.linearProgress}
            />
            <Box minWidth={35}>
              <Typography
                variant={constants.VARAINT_BODY_TWO}
                color={constants.PRIMARY_COLOR}
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
              color={constants.PRIMARY_COLOR}
            >
              {NO_RECOMMENDATION_FOUND}
            </Button>
          </Box>
        );
    } else
      return (
        <Fragment>
          <LinearProgress />
          <Box minWidth={35}>
            <Typography
              variant={constants.VARAINT_BODY_TWO}
              color={constants.TEXT_SECONDARY}
            >
              {LOADING}
            </Typography>
          </Box>
        </Fragment>
      );
  };

  return (
    <Grid item className={classes.gridContainer}>
      <Paper className={classes.paper}>
        <Typography
          className={classes.topography}
          variant={constants.VARAINT_SUBTITLE_ONE}
        >
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
