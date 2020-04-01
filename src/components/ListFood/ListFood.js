import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ScheduleIcon from '@material-ui/icons/Schedule';
import healthy from '../../api/healthy';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '5%',
    margin: 'auto',
    width: '100%',
    maxWidth: '90%',
    backgroundColor: theme.palette.background.paper
  },
  numberCalorie: {
    color: 'black',
    'font-size': '14px'
  },
  ingredients: {
    marginLeft: '25%',
    'font-size': '14px'
  },
  skeleton: {
    marginTop: '5%',
    margin: 'auto'
  },
  skeletonRec: {
    margin: 'auto'
  }
}));

export default function ListFood(props) {
  const classes = useStyles();
  const [data, setData] = useState([]); //get all the menu posted by patient
  const [flag, setFlag] = useState(true);
  const [menu, setMenu] = useState([]); //get only one menu posted by patient
  const [open, setOpen] = useState(false);
  const params = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleToggle } = props;
  /**
   * Get All the menus posted by patient
   */
  useEffect(() => {
    const loadMenus = async () => {
      const AuthStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.get(
        `/patients/${params.id}/recommendations/menus`,

        {
          headers: { Authorization: AuthStr }
        }
      );

      setData(response.data.menus);
      setFlag(false);
    };
    loadMenus();
  }, [params.id]);

  /**
   * Arrow function to Get Menu By id
   * @param {Object} menu
   */
  const handleClickButton = async menu => {
    handleToggle(true);
    const AuthStr = `Bearer ${localStorage.getItem('token')}`;
    const response = await healthy.get(
      `/patients/${params.id}/recommendations/menus/${menu.id}`,

      {
        headers: { Authorization: AuthStr }
      }
    );

    console.log(response.data.menus);
    setMenu(response.data.menus);
    handleToggle(false);
    setOpen(true);
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
            variant="text"
            height="5%"
            width="90%"
          />
          <Skeleton
            className={classes.skeletonRec}
            variant="rect"
            width="90%"
            height="25%"
          />
        </Fragment>
      );
    } else {
      return (
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListSubheader>Liste des menus </ListSubheader>
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
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {menu.type_menu} | {menu.created_at}
            </DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.ingredients}>
                Ingredient 1 : 200 (Grammes)<br></br> Ingredient 2 : 200
                (Grammes)
                <br></br>
                Ingredient 3 : 200 (Grammes) <br></br>Ingredient 4 : 200
                (Grammes)
                <br></br>
              </DialogContentText>
              <DialogContentText className={classes.numberCalorie}>
                Nombre de calories pour ce menu : {menu.calorie}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  };
  return <Fragment>{renderFunction()}</Fragment>;
}
