import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Copyright from '../../components/Copyright/Copyright';
import ListPatients from '../../components/ListPatients/ListPatients';
import MenuBar from '../../components/MenuBar/MenuBar';
import {
  ADD,
  PATIENT,
  PATIENT_PLACEHOLDER
} from '../../shared/strings/strings';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  paperSearch: {
    width: 350,
    marginLeft: '30%'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },

  fixedHeight: {
    height: 240
  },
  ButtonGroup: {
    marginBottom: 10,
    marginLeft: '85%'
  }
}));

/**
 * Component for showing patient Page
 */
export default function Patients() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * arrow function to navigate the user to the addPatient page
   */
  const handleClickAjouter = () => {
    history.push('/patient');
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        {/* Component MenuBar */}
        <MenuBar title={PATIENT} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg">
            <Box pt={4}>
              {/* Search Bar */}
              <Paper component="form" className={classes.paperSearch}>
                <InputBase
                  className={classes.input}
                  placeholder={PATIENT_PLACEHOLDER}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              {/* Button add */}
              <Button
                className={classes.ButtonGroup}
                variant="contained"
                color="primary"
                onClick={handleClickAjouter}
              >
                {ADD}
              </Button>
            </Box>
            {/* Component ListPatients */}
            <ListPatients />

            <Box pt={4}>
              {/* Component Copyright */}
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Fragment>
  );
}
