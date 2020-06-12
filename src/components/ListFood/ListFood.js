import { Divider, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as constants from '../../shared/constants/constants';
import * as endpoint from '../../shared/constants/endpoint';
import { axiosService, findTheMenuType } from '../../shared/services/services';
import * as strings from '../../shared/strings/strings';
import FoodIngredients from '../FoodIngredients/FoodIngredients';
import { useStyles } from './styles';

export default function ListFood({ handleToggle }) {
  const classes = useStyles();
  const [data, setData] = useState([]); //get all the menu posted by patient
  const [flag, setFlag] = useState(true);
  const [menu, setMenu] = useState([]); //get only one menu posted by patient
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const params = useParams();

  /**
   * Get All the menus posted by patient
   */
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    axiosService(
      `${endpoint.ENDPOINT_PATIENTS}${params.id}/${endpoint.ENDPOINT_RECOMMENDATIONS}${endpoint.ENDPOINT_MENUS}`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            let menus = response.data.data.filter((menu) =>
              constants.VALUE_TYPE_MENU_PATIENT.includes(menu.type_menu)
            );
            setData(menus);
          }
        } else console.log('error to get a menu', error);
        setFlag(false);
      }
    );
    return () => {
      mounted = false;
    };
  }, [params.id]);

  /**
   * Arrow function to Get Menu By id
   * @param {Object} menu
   */
  const handleClickButton = async (menu) => {
    handleToggle(true);
    axiosService(
      `${endpoint.ENDPOINT_PATIENTS}${params.id}/${endpoint.ENDPOINT_RECOMMENDATIONS}${endpoint.ENDPOINT_MENUS}${menu.id}`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          setIngredients(response.data.data.ingredients);
          setMenu(response.data.data);
          handleToggle(false);
          setOpen(true);
        } else console.log('error to get a menu', error);
      }
    );
  };
  /**
   * to close the dialog
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Arrow function to render
   */
  const renderFunction = () => {
    if (flag) {
      return (
        <Fragment>
          <Skeleton
            className={classes.skeleton}
            variant={constants.SKELETON_VARIANT_TEXT}
          />
          <Skeleton
            className={classes.skeletonRec}
            variant={constants.SKELETON_VARIANT_RECT}
          />
        </Fragment>
      );
    } else {
      return (
        <div className={classes.root}>
          <List>
            <ListSubheader>{strings.LIST_OF_MENU} </ListSubheader>
            {data.map((row, x) => (
              <ListItem
                button
                onClick={() => handleClickButton(row)}
                key={row.id}
              >
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText key={row.id} primary={row.created_at} />
              </ListItem>
            ))}
          </List>
          {/* Dialog */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className={classes.dialogHeader}>
              {findTheMenuType(menu.type_menu)} | {menu.created_at}
            </DialogTitle>

            <DialogContent>
              <DialogContentText component={constants.SPAN_COMPONENT}>
                <FoodIngredients ingredients={ingredients} />
              </DialogContentText>
              <Divider className={classes.dividerStyle} />
              <DialogContentText className={classes.numberCalorie}>
                {strings.NUMBER_OF_CALORIES}
                <Typography
                  component={constants.SPAN_COMPONENT}
                  className={classes.calorieStyle}
                >
                  {menu.calorie} {constants.KCL}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color={constants.PRIMARY_COLOR}
                autoFocus
              >
                {strings.OK}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  };
  return <Fragment>{renderFunction()}</Fragment>;
}
