import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { MESSAGE_VALIDATORS_PASSWORD } from '../../shared/constants/validation';
import { PASSWORD } from '../../shared/strings/strings';

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
        Changer Mot de passe
      </Button>
      <Grid item xs={12}>
        {changeMdp && (
          <TextValidator
            variant="outlined"
            onChange={handlePassword}
            value={password}
            fullWidth
            label={PASSWORD}
            type="password"
            autoComplete="current-password"
            validators={['lenghPassword']}
            errorMessages={[MESSAGE_VALIDATORS_PASSWORD]}
          />
        )}
      </Grid>
    </Fragment>
  );
}
