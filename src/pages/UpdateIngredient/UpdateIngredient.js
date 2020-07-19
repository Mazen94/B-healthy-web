import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IngredientForm from '../../components/IngredientForm/IngredientForm';
import MenuBar from '../../components/MenuBar/MenuBar';
import { PATH_INGREDIENTS } from '../../routes/path';
import { GET, PUT, PRIMARY_COLOR } from '../../shared/constants/constants';
import { ENDPOINT_INGREDIENTS } from '../../shared/constants/endpoint';
import { axiosService, isInteger } from '../../shared/services/services';
import { EDIT, UPDATE_INDREDIENT } from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function UpdateIngredient(props) {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields
  const [openSkeleton, setOpenSkeleton] = useState(true); //to open and close the Skeleton
  const [data, setData] = useState([]);
  const params = useParams();
  /**
   * arrow function to navigate the user to the addIngredient Component page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_INGREDIENTS}/1`);
  };
  const changeFlag = (change) => {
    setFlag(change);
  };
  /**
   * Validation : add custom rules (amout and calorie must be number)
   */
  useEffect(() => {
    isInteger();
  }, []);
  /**
   * UseEffect to get the Ingredient by id
   */
  useEffect(() => {
    let mounted = true;

    axiosService(
      `${ENDPOINT_INGREDIENTS}${params.id}`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setData(response.data.data);
            setOpenSkeleton(false);
          }
        } else console.log('error to get only one ingredient', error);
      }
    );

    return () => {
      mounted = false;
    };
  }, [params.id]);

  /**
   * Function to render
   */
  const renderFunction = () => {
    //Loading when the data is empty
    if (openSkeleton) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    } else
      return (
        //Form
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <IngredientForm
                changeFlag={changeFlag}
                data={data}
                method={PUT}
                endPoint={`${ENDPOINT_INGREDIENTS}${params.id}`}
                message={UPDATE_INDREDIENT}
              />
              {/* Spinner (Loading) when the user clicks on the validate button */}
              {flag && <CircularProgress className={classes.spinner} />}
            </Paper>
          </Grid>
        </Grid>
      );
  };
  /**
   * render method
   */
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={EDIT} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* Icon to go back */}
        <IconButton
          className={classes.iconButton}
          onClick={handleArrowBack}
          color={PRIMARY_COLOR}
        >
          <ArrowBackIcon />
        </IconButton>
        <Container maxWidth="lg" className={classes.container}>
          {/* Function to render */}
          {renderFunction()}
        </Container>
      </main>
    </div>
  );
}
