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
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import healthy from '../../api/healthy';
import meal from '../../assets/meal.png';
import recommendations from '../../assets/recommendations.png';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 300,
    height: 330,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export default function TrasfertMenus() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [mealId, setMealId] = useState('');
  const params = useParams();

  useEffect(() => {
    /**
     * Arrow function to get the data (ingredients) using Async await
     */
    const loadMenus = async () => {
      const AuthStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
      const response = await healthy.get(`/mealStore?page=1`, {
        headers: { Authorization: AuthStr }
      });
      console.log(response.data.MealStore);
      setLeft(response.data.MealStore.data); //add the received data to the state data
    };
    loadMenus();
  }, []);

  const leftChecked = intersection(checked, left);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      setMealId(value.id);

      console.log(value.id);
      newChecked.push(value);
    } else {
      setMealId('');
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleCheckedRight = () => {
    console.log(params);
    PostMenuWithIngredientToRecommendation(mealId);
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  /**
   * function to get the post menu
   * @param {int} id
   */
  async function PostMenuWithIngredientToRecommendation(id) {
    const AuthStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
    //Get menu with ingredients
    const response = await healthy.get(`/mealStore/${id}`, {
      headers: { Authorization: AuthStr }
    });

    // Add this menu to recommendation
    try {
      const result = await healthy.post(
        `/patients/${params.id}/recommendations/${params.idRecommendation}/menus`,
        response.data,
        {
          headers: { Authorization: AuthStr }
        }
      );
      console.log(result.data.menuId);
    } catch (error) {
      console.log(error.result);
    }
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
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value.name}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                {flag && (
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                )}
              </ListItemIcon>
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
      <Grid item>{customList('Menus', left, meal, true)}</Grid>
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
        {customList('Recommendation', right, recommendations, false)}
      </Grid>
    </Grid>
  );
}
