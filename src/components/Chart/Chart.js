import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { headers } from '../../shared/constants/env';
import { CHART_BACKGROUNDCOLOR } from '../../shared/constants/constants'; // Get constants from  constants  file
import {
  DISTRIBUTION_BY_GENDER,
  CHART_LABEL_MALE,
  CHART_LABEL_FEMALE,
} from '../../shared/strings/strings';
import { STATISTICS_GENDER } from '../../shared/constants/endpoint';
import { axiosService } from '../../shared/services/services';
import { GET } from '../../shared/constants/constants';
/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: 'center',
  },
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
        backgroundColor: CHART_BACKGROUNDCOLOR,
      },
    ],
  };
  /**
   * Hook to get the patient by gender
   */
  useEffect(() => {
    let mounted = true;
    const patientByGender = async () => {
      axiosService(STATISTICS_GENDER, GET, headers, null, (error, response) => {
        if (response) {
          if (mounted) {
            setCountFemale(response.data.countGender.female);
            setCountMale(response.data.countGender.male);
          }
        } else console.log(error);
      });
    };
    //Call the method
    patientByGender();
    return () => {
      mounted = false;
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
