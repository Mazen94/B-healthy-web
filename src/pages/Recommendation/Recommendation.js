import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import ListRecommendations from '../../components/ListRecommendations/ListRecommendations';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: '110vh',
    paddingBottom: '5%',
    height: '100%',
    overflow: 'none'
  },
  gridContainer: {
    marginTop: '2%'
  },
  ButtonGroup: {
    marginTop: '2%',
    marginLeft: '70%'
  }
}));

export default function Recommendations() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const handleClickAjouter = () => {
    history.push(`/patient/${params.id}/recommendation`);
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title="Patient" />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar recommendation="contained"></NavBar>
          <Button
            className={classes.ButtonGroup}
            variant="contained"
            color="primary"
            onClick={handleClickAjouter}
          >
            Ajouter
          </Button>
          <Grid container spacing={4} className={classes.gridContainer}>
            {/* Component ListRecommendation */}
            <ListRecommendations />
          </Grid>
        </main>
      </div>
    </div>
  );
}
