import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useStyles } from './styles';
import { Avatar, Button } from '@material-ui/core';
import bHealthy from '../../assets/B-healthy.png';
import { PATH_LOGIN } from '../../routes/path';
import { useHistory } from 'react-router-dom';
/**
 * Component for showing Copyright at the end of each page
 */
export default function NotActivate() {
  const history = useHistory();
  const classes = useStyles(); //add styles to variable classes
  /**
   * Arrow function to disconnect the user when he clicks on the icon <ExitToAppIcon/>
   */
  const handleExitToAppIcon = () => {
    history.goBack();
  };
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={bHealthy}></Avatar>
      <Typography className={classes.typoghraphy} align="center">
        Page Not Found
      </Typography>
      <Button style={{ color: 'white' }} onClick={handleExitToAppIcon}>
        Retour
      </Button>
    </div>
  );
}
