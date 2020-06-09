import React, { Fragment, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItems from '../../components/ListItems/ListItems';
import { PATH_LOGIN } from '../../routes/path';
import { useStyles } from './styles';
import { AppBarContext } from '../../shared/context/AppBarContext';

export default function MenuBar(props) {
  const {
    title,
    dashboardProps,
    patientProps,
    ingredientsProps,
    menusProps,
    profilProps,
  } = props;
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const classes = useStyles(); //add styles to variable classes
  const { open, setOpen } = useContext(AppBarContext);
  /**
   * Arrow function to disconnect the user when he clicks on the icon <ExitToAppIcon/>
   */
  const handleExitToAppIcon = () => {
    localStorage.removeItem('token');
    history.push(PATH_LOGIN);
  };
  /**
   * Arrow function to open the AppBar
   */
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  /**
   * Arrow function to close the AppBar
   */
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          {/* Page title */}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
              <ExitToAppIcon onClick={handleExitToAppIcon} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <Divider />
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* Component listItems */}
          <ListItems
            dashboardProps={dashboardProps}
            patientProps={patientProps}
            ingredientsProps={ingredientsProps}
            menusProps={menusProps}
            profilProps={profilProps}
          />
        </List>
        <Divider />
      </Drawer>
    </Fragment>
  );
}
