import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import meal from '../../assets/meal.png';
import { axiosService } from '../../shared/services/services';
import recommendations from '../../assets/recommendations.png';
import {
  ENDPOINT_LIST_MEALS,
  ENDPOINT_PATIENTS,
  ENDPOINT_RECOMMENDATIONS,
  ENDPOINT_MENUS,
} from '../../shared/constants/endpoint';
import { GET, POST } from '../../shared/constants/constants';
import { MENUS, RECOMMENDATIONS } from '../../shared/strings/strings';
import { useStyles } from './styles';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TrasfertMenus() {
  const classes = useStyles(); //add styles to variable classes
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [mealId, setMealId] = useState('');
  const params = useParams();

  useEffect(() => {
    let mounted = true;
    axiosService(
      `${ENDPOINT_LIST_MEALS}1`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) setLeft(response.data.MealStore.data); //add the received data to the state d
        } else
          console.log('error to get all the list of recommendations', error);
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const leftChecked = intersection(checked, left);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [checked];

    if (currentIndex === -1) {
      setMealId(value.id);
      console.log('value.id==', value.id);
      newChecked.push(value);
    } else {
      setMealId('');
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleCheckedRight = () => {
    PostMenuWithIngredientToRecommendation(mealId);
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  /**
   * function to get the post menu
   * @param {int} id
   */
  function PostMenuWithIngredientToRecommendation(id) {
    console.log(id);
    axiosService(
      `${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}${params.idRecommendation}/${ENDPOINT_MENUS}`,
      POST,
      true,
      { id: id },
      (err, result) => {
        if (result) console.log('aded menu  ==', result.data);
        else console.log('error to add this menu', err);
      }
    );
  }

  const customList = (title, items, iconAvatar, flag) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={iconAvatar}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.name}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              {flag && (
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              )}
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList(MENUS, left, meal, true)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {customList(RECOMMENDATIONS, right, recommendations, false)}
      </Grid>
    </Grid>
  );
}
