import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import {
  MESSAGE_VALIDATORS_PASSWORD,
  RULES_NAME_LENGHT_PASSWORD,
} from '../../shared/constants/validation';
import { PASSWORD, UPDATE_PASSWORD } from '../../shared/strings/strings';
import { OUTLINED } from '../../shared/constants/constants';

/**
 * Component for showing profil of nutritionist
 */
export default function ChangePassword({
  handleClickChangeMdp,
  changeMdp,
  handlePassword,
  password,
}) {
  return (
    <Fragment>
      <Button size="small" onClick={handleClickChangeMdp}>
        {UPDATE_PASSWORD}
      </Button>
      <Grid item xs={12}>
        {changeMdp && (
          <TextValidator
            variant={OUTLINED}
            onChange={handlePassword}
            value={password}
            fullWidth
            label={PASSWORD}
            type="password"
            validators={[RULES_NAME_LENGHT_PASSWORD]}
            errorMessages={[MESSAGE_VALIDATORS_PASSWORD]}
          />
        )}
      </Grid>
    </Fragment>
  );
}
