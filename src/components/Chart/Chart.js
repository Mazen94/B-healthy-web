import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import healthy from '../../api/healthy';
import {
  CHART_LABEL_MALE,
  CHART_LABEL_FEMALE,
  CHART_BACKGROUNDCOLOR
} from '../../shared/constants/constants'; // Get constants from  constants  file
import Axios from 'axios';
import { DISTRIBUTION_BY_GENDER } from '../../shared/strings/strings';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles(theme => ({
  typography: {
    textAlign: 'center'
  }
}));
export default function Chart() {
  const classes = useStyles(); //add styles to variable classes
  const [countMale, setCountMale] = useState(0); //state to recover the number of male
  const [countFemale, setCountFemale] = useState(0); //state to recover the number of female

  //Bring in data
  const data = {
    labels: [CHART_LABEL_FEMALE, CHART_LABEL_MALE],
    datasets: [
      {
        data: [countFemale, countMale],
        backgroundColor: CHART_BACKGROUNDCOLOR
      }
    ]
  };
  /**
   * Hook to get the patient by gender
   */
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    const patientByGender = async () => {
      try {
        const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
        // API : get number of patient by gender
        const response = await healthy.get(
          `/statistics/gender`,
          {
            headers: { Authorization: authStr }
          },
          {
            cancelToken: source.token
          }
        );
        if (mounted) {
          setCountFemale(response.data.countGender.female);
          setCountMale(response.data.countGender.male);
        }
      } catch (error) {
        console.log(error.reponse);
      }
    };
    //Call the method
    patientByGender();
    return () => {
      //cancel the request
      mounted = false;
      source.cancel();
    };
  }, []);

  return (
    <React.Fragment>
      {/* Title of  Pie */}
      <Typography
        className={classes.typography}
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
      >
        {DISTRIBUTION_BY_GENDER}
      </Typography>
      {/* Chart Pie */}
      <Pie className={classes.pie} data={data} width={60} height={20} />
    </React.Fragment>
  );
}
