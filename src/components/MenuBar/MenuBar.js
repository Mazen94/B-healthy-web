import React, { Fragment, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItems from '../../components/ListItems/ListItems';
import Avatar from '@material-ui/core/Avatar';
import doctor from '../../assets/doctor.png';
import Box from '@material-ui/core/Box';
import { axiosService } from '../../shared/services/services';
import { headers } from '../../shared/constants/env';
import { GET } from '../../shared/constants/constants';
import { PATH_LOGIN, PATH_PROFIL } from '../../routes/path';
import { ENDPOINT_PROFIL } from '../../shared/constants/endpoint';
/**
 * Hook API to generate and apply styles (its JSS object)
 */
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  h5: {
    color: 'rgb(117, 117, 117)',
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  link: {
    textDecoration: 'none',
  },
}));
/**
 * Component for showing the Menu
 * @param {string} props
 */
export default function MenuBar(props) {
  const { title } = props; //take the title of page
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const classes = useStyles(); //add styles to variable classes
  const [open, setOpen] = useState(true); //to open and close the AppBar (initial value is True)
  const [data, setData] = useState(''); //to get the nutritionist connected (intial value is empty string)

  /**
   * Hook useEffect in this case he plays the role of componentDidMount
   * in this hook there will be a call for the function fetchData
   */
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    axiosService(ENDPOINT_PROFIL, GET, headers, null, (error, response) => {
      if (response) {
        if (mounted) setData(response.data.nutritionist);
      } else console.log(error);
    });
    return () => {
      mounted = false;
    };
  }, [data]);
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
        <div className={classes.toolbarIcon}>
          {/* Avatar and name of the user  */}
          {data && (
            <Fragment>
              <Box
                component="span"
                display="block"
                p={1}
                m={1}
                bgcolor="background.paper"
              >
                <a href={PATH_PROFIL}>
                  <Avatar className={classes.large} src={doctor} />
                </a>
              </Box>
              <a href={PATH_PROFIL} className={classes.link}>
                <h5 className={classes.h5}>
                  {`Dr.${data.firstName} ${data.lastName}`}
                </h5>
              </a>
            </Fragment>
          )}

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* Component listItems */}
          <ListItems />
        </List>
        <Divider />
      </Drawer>
    </Fragment>
  );
}
