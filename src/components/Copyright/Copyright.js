import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { B_HEALTHY } from '../../shared/strings/strings';
import { TEXT_SECONDARY } from '../../shared/constants/constants';
/**
 * Component for showing Copyright at the end of each page
 */
export default function Copyright() {
  return (
    <Typography variant="body2" color={TEXT_SECONDARY} align="center">
      {'Copyright © '}
      <Link color="inherit">{B_HEALTHY}</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
