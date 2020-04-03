import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { B_HEALTHY } from '../../shared/strings/strings';
/**
 * Component for showing Copyright at the end of each page
 */
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">{B_HEALTHY}</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
