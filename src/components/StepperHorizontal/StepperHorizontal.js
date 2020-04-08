import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';
import { useStyles } from './styles';

export default function StepperHorizontal(props) {
  const { stepProps, creation, add } = props;
  const classes = useStyles(); //add styles to variable classes
  const activeStep = stepProps;

  function getSteps() {
    return [creation, add];
  }
  const steps = getSteps();
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
