import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import healthy from '../../api/healthy';

const useStyles = makeStyles(theme => ({
  typography: {
    textAlign: 'center'
  }
}));
export default function Chart() {
  const classes = useStyles(); //add styles to variable classes
  const [countMale, setCountMale] = useState(0);
  const [countFemale, setCountFemale] = useState(0);
  const data = {
    labels: ['Femme', 'Homme'],
    datasets: [
      {
        data: [countFemale, countMale],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']
      }
    ]
  };
  useEffect(() => {
    const patientByGender = async () => {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.get(`/statistics/gender`, {
        headers: { Authorization: authStr }
      });
      console.log(response.data.countGender);
      setCountFemale(response.data.countGender.female);
      setCountMale(response.data.countGender.male);
    };
    patientByGender();
  }, []);
  return (
    <React.Fragment>
      <Typography
        className={classes.typography}
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
      >
        Répartition des patients par sexe
      </Typography>
      <Pie className={classes.pie} data={data} width={60} height={20} />
    </React.Fragment>
  );
}
