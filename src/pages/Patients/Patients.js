import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Copyright from '../../components/Copyright/Copyright';
import ListPatients from '../../components/ListPatients/ListPatients';
import MenuBar from '../../components/MenuBar/MenuBar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import {
  ADD,
  PATIENT,
  PATIENT_PLACEHOLDER,
} from '../../shared/strings/strings';
import { PATH_PATIENT } from '../../routes/path';
import {
  PRIMARY_COLOR,
  OUTLINED,
  CONTAINED,
} from '../../shared/constants/constants';
import TextField from '@material-ui/core/TextField';

/**
 * Component for showing patient Page
 */
export default function Patients() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [search, Setsearch] = useState('');
  const [searchDone, SetsearchDone] = useState('');
  /**
   * arrow function to navigate the user to the addPatient page
   */
  const handleClickAjouter = () => {
    history.push(PATH_PATIENT);
  };
  const searchIconButton = (e) => {
    e.preventDefault();
    SetsearchDone(search);
  };
  const handleSearch = (e) => {
    Setsearch(e.target.value);
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        {/* Component MenuBar */}
        <MenuBar title={PATIENT} patientProps={true} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg">
            <Box pt={4}>
              {/* Search Bar */}
              <form onSubmit={searchIconButton}>
                <Grid className={classes.grid}>
                  <Paper className={classes.paperSearch}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      placeholder={PATIENT_PLACEHOLDER}
                      value={search}
                      variant={OUTLINED}
                      onChange={handleSearch}
                    />
                  </Paper>
                  <Paper className={classes.IconButton}>
                    <IconButton type="submit" className={classes.iconButton}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </form>
              {/* Button add */}
              <Button
                className={classes.ButtonGroup}
                variant={CONTAINED}
                color={PRIMARY_COLOR}
                onClick={handleClickAjouter}
              >
                {ADD}
              </Button>
            </Box>
            {/* Component ListPatients */}
            <ListPatients search={searchDone} />

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
