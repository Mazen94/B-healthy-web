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
import * as endPoints from '../../shared/constants/endpoint';
import { GET, POST, OUTLINED } from '../../shared/constants/constants';
import { MENUS, RECOMMENDATIONS } from '../../shared/strings/strings';
import { useStyles } from './styles';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TrasfertMenus() {
  const classes = useStyles(); //add styles to variable classes
  const [checked, setChecked] = useState([]); //the radio bottom checked
  const [left, setLeft] = useState([]); //the data that is on the left
  const [right, setRight] = useState([]); //the data that is on the right
  const [mealId, setMealId] = useState(''); //the id of meal checked
  const [error, setError] = useState(''); //the id of meal checked
  const [currentPage, setCurrentPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [lastPage, setLastPage] = useState(1);
  const params = useParams();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  useEffect(() => {
    let mounted = true;
    axiosService(
      `${endPoints.ENDPOINT_LIST_MEALS}${currentPage}`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setLeft((left) => left.concat(response.data.data.data));
            setLastPage(response.data.data.last_page);
          }
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, [currentPage]);

  const leftChecked = intersection(checked, left);

  //when the use check a radio
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [checked];
    if (currentIndex === -1) {
      setMealId(value.id);
      newChecked.push(value);
      setChecked(newChecked);
    } else {
      setMealId('');
      setChecked(newChecked.splice(currentIndex, 1));
    }
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleCheckedRight = () => {
    PostMenuWithIngredientToRecommendation(mealId);
  };
  /**
   * function to get the post menu
   * @param {int} id
   */
  function PostMenuWithIngredientToRecommendation(id) {
    axiosService(
      `${endPoints.ENDPOINT_PATIENTS}${params.id}/${endPoints.ENDPOINT_RECOMMENDATIONS}${params.idRecommendation}/menus`,
      POST,
      true,
      { id: id },
      (err, result) => {
        if (result) {
          if (result.status === 201) {
            setRight(right.concat(leftChecked));
            setLeft(not(left, leftChecked));
          } else {
            setError(result.data.data);
            setOpenSnackbar(true);
          }
        } else {
          console.log('error to add menu to recommendation', err);
        }
      }
    );
  }
  //event handleScroll
  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop <
      event.target.clientHeight; //detect scroll to bottom

    if (bottom && currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const customList = (title, items, iconAvatar, flag) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Avatar className={classes.avatar} src={iconAvatar} />}
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense onScroll={handleScroll}>
        {items.map((value) => {
          return (
            <ListItem key={value.id} button onClick={handleToggle(value)}>
              {flag && (
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
              )}
              <ListItemText primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} className={classes.root}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Grid item>{customList(MENUS, left, meal, true)}</Grid>
      <Grid item>
        <Grid container className={classes.gridContainer}>
          <Button
            variant={OUTLINED}
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
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
