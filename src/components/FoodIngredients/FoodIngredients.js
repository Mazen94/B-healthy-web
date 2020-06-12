import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import React, { Fragment } from 'react';
import Ingredient from '../../assets/ingredient.png';
import { useStyles } from './styles';
import { SPAN_COMPONENT } from '../../shared/constants/constants';
import { GRAM } from '../../shared/strings/strings';

export default function FoodIngredients({ ingredients }) {
  const classes = useStyles();

  return (
    <Fragment>
      {ingredients.map((row, x) => (
        <div className={classes.ingredietStyle} key={x}>
          <Avatar
            className={classes.avatarStyle}
            alt={row.name}
            src={Ingredient}
          />
          <Typography
            component={SPAN_COMPONENT}
            className={classes.ingredients}
          >
            {row.name} :
            <Typography
              component={SPAN_COMPONENT}
              className={classes.amountStyle}
            >
              {row.pivot.amount} {GRAM}
            </Typography>
          </Typography>
        </div>
      ))}
    </Fragment>
  );
}
