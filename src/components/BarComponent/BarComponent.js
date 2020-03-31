import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function BarComponent(props) {
  const classes = useStyles();
  const { name, count, backgroundColor } = props;
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(count);
    setData({
      labels: [name],
      datasets: [
        {
          data: [count],
          backgroundColor: [backgroundColor]
        }
      ]
    });
  }, [name, count, backgroundColor]);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {name}
      </Typography>
      <Bar
        className={classes.bar}
        data={data}
        width={100}
        height={60}
        options={{
          legend: {
            display: false
          }
        }}
      />

      <div></div>
    </React.Fragment>
  );
}
