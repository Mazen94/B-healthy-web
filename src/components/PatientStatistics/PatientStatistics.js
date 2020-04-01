import React from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const data = {
  labels: [
    '',
    '[10,15]',
    '[16,20]',
    '[21,25]',
    '[26,30]',
    '[31,35]',
    '[36,40]',
    '[41,45]',
    '[46,50]',
    '[51,55]',
    '[56,60]',
    ''
  ],
  datasets: [
    {
      data: [0, 10, 10, 5, 10, 8, 16, 10, 9, 4, 6],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(70, 215, 132, 0.6)',
        'rgba(100, 140, 64, 0.6)',
        'rgba(50, 10, 200, 0.6)'
      ]
    }
  ]
};
const useStyles = makeStyles(theme => ({
  typography: {
    margin: 'auto'
  },
  bar: {
    padding: 'auto'
  }
}));
export default function PatientStatistics() {
  const classes = useStyles(); //add styles to variable classes
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Répartition des patients par tranche d’âge
      </Typography>

      <div className={classes.bar}>
        <Bar
          data={data}
          width={80}
          height={20}
          options={{
            legend: {
              display: false
            }
          }}
        />
      </div>
    </React.Fragment>
  );
}
