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
import ListItemsAdmin from '../../components/ListItemsAdmin/ListItemsAdmin';
import { PATH_ADMIN } from '../../routes/path';
import { useStyles } from './styles';
import { AppBarContext } from '../../shared/context/AppBarContext';
import {
  INHERIT_COLOR,
  SECONDARY_COLOR,
} from '../../shared/constants/constants';

export default function MenuBarAdmin(props) {
  const { title, dashboardProps, nutritonistProps } = props;
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const classes = useStyles(); //add styles to variable classes
  const { open, setOpen } = useContext(AppBarContext);
  /**
   * Arrow function to disconnect the user when he clicks on the icon <ExitToAppIcon/>
   */
  const handleExitToAppIcon = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('status');
    localStorage.removeItem('admin');
    history.push(PATH_ADMIN);
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
      <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color={INHERIT_COLOR}
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          {/* Page title */}
          <Typography noWrap className={classes.title}>
            {title}
          </Typography>
          <IconButton color={INHERIT_COLOR}>
            <Badge color={SECONDARY_COLOR}>
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
          <ListItemsAdmin
            dashboardProps={dashboardProps}
            nutritonistProps={nutritonistProps}
          />
        </List>
        <Divider />
      </Drawer>
    </Fragment>
  );
}
