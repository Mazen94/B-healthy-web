import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';
import { useStyles } from './styles';
import {
  SKELETON_VARIANT_RECT,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';

export default function BarComponent(props) {
  const classes = useStyles();
  const { name, count, backgroundColor } = props;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); //clsx is a tiny utility for constructing className strings conditionally
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      labels: [name],
      datasets: [
        {
          data: [count],
          backgroundColor: [backgroundColor],
        },
      ],
    });
  }, [name, count, backgroundColor]);
  /**
   * Function to render
   */
  const renderFunction = () => {
    if (count === -1) {
      return (
        <div>
          {/* Loading when the data is empty */}
          <Skeleton
            variant={SKELETON_VARIANT_RECT}
            className={classes.skeletonStyle}
          />
        </div>
      );
    } else
      return (
        <React.Fragment>
          <Paper className={fixedHeightPaper}>
            <Typography color={PRIMARY_COLOR} gutterBottom>
              {name}
            </Typography>
            <Bar
              className={classes.bar}
              data={data}
              width={100}
              height={60}
              options={{
                legend: {
                  display: false,
                },
              }}
            />
          </Paper>
        </React.Fragment>
      );
  };
  return <React.Fragment>{renderFunction()}</React.Fragment>;
}
