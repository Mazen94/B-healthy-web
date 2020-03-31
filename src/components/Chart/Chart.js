import React from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const data = {
  labels: ['Femme', 'Homme'],
  datasets: [
    {
      data: [20, 10],
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']
    }
  ]
};
const useStyles = makeStyles(theme => ({
  typography: {
    textAlign: 'center'
  }
}));
export default function Chart() {
  const classes = useStyles(); //add styles to variable classes
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
