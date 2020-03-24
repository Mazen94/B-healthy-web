import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
/**
 * Component for showing Copyright at the end of each page
 */
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        B-healthy
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
