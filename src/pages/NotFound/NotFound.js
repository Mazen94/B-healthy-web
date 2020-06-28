import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { B_HEALTHY } from '../../shared/strings/strings';
import {
  TEXT_SECONDARY,
  INHERIT_COLOR,
  VARAINT_BODY_TWO,
} from '../../shared/constants/constants';
/**
 * Component for showing Copyright at the end of each page
 */
export default function NotFound() {
  return (
    <Typography
      variant={VARAINT_BODY_TWO}
      color={TEXT_SECONDARY}
      align="center"
    >
      Not found
    </Typography>
  );
}
