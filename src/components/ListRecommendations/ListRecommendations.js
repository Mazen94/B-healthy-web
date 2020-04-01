import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import recommendations from '../../assets/recommendations.png';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles(theme => ({
  tableContainer: {
    width: '80%',
    margin: 'auto'
  },
  skeleton: {
    margin: 'auto',
    marginTop: '10%',
    width: '90%'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  ButtonGroup: {
    marginBottom: 10,
    marginLeft: '85%'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  typography: {
    fontWeight: 'bold'
  },
  link: {
    color: 'rgb(39 , 39, 39)'
  }
}));

export default function ListRecommendations() {
  const classes = useStyles(); //add styles to variable classes
  const [data, setData] = useState([]); // state to get the ingredients
  const [currentPage, setCurrentPage] = useState(1); //currentPage: to get the current page in the data
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete ingredient (initial value is false)
  const [deleteRecommendationId, setDeleteRecommendationId] = useState(''); //to retrieve the ingredient id to delete
  const [flag, setFlag] = useState(true); //to display the load progress
  const params = useParams(); //to get the params from url

  /**
   * hook useEffect there will be a get  the ingredients , the current page and the last page in the data
   * this hook executed when the value of currentPage changes
   */
  useEffect(() => {
    //Arrow function to get the data (ingredients) using Async await
    const loadRecommendation = async () => {
      const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
      const response = await healthy.get(
        `/patients/${params.id}/recommendations/`,
        {
          headers: { Authorization: authStr }
        }
      );
      console.log(response.data.recommendations);
      setData(response.data.recommendations); //add the received data to the state data
      setFlag(false);
    };
    //call function
    loadRecommendation();
  }, [params.id]);
  /**
   *  navigate to the route edit recommendation
   * @param {int} id
   */
  const handleClickIconButton = id => {
    history.push(`/patient/${params.id}/recommendations/${id}/`);
  };
  /**
   * arrow function to open the dialogue when the nutritionit want to delete a Ingredient
   * @param {int} id
   */
  const handleClickOpen = id => {
    console.log(id);
    setDeleteRecommendationId(id); // Set the id of the Ingredient inside the state
    setOpen(true); // Open the dialogue
  };
  /**
   * arrow function to close the dialogue
   */
  const handleClose = () => {
    setOpen(false);
  };
  /**
   * arrow function to delete a ingredient
   */
  const handleButtonDelete = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
    try {
      const response = await healthy.delete(
        `/patients/${params.id}/recommendations/${deleteRecommendationId}`,
        {
          headers: { Authorization: authStr }
        }
      );
      console.log(response.data);
      setCurrentPage(currentPage);
    } catch (error) {
      console.log(error.response.data);
    }

    setOpen(false); //to close the dialogue
    setData(data.filter(item => item.id !== deleteRecommendationId)); //get the new data without the Ingredient deleted
  };
  /**
   * Function to render
   */
  const renderFunction = () => {
    //Loading until the state get the data from db
    if (flag) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      );
      // when the states get the data and if the data is not empty then display
    } else {
      if (data.length !== 0) {
        return (
          <Fragment>
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        className={classes.typography}
                        variant="subtitle2"
                      >
                        Recommandations
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        className={classes.typography}
                        variant="subtitle2"
                      >
                        Date de creation
                      </Typography>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, x) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <Box display="flex" flexDirection="row">
                          <Box>
                            <Avatar
                              className={classes.avatar}
                              src={recommendations}
                            ></Avatar>
                          </Box>
                          <Box p={2}>
                            <a className={classes.link} href="# ">
                              {row.name}
                            </a>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.created_at}</TableCell>

                      <TableCell align="right">
                        <IconButton
                          value={row.id}
                          onClick={() => handleClickIconButton(row.id)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          value={row.id}
                          onClick={() => handleClickOpen(row.id)}
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/*---------------------------------------*/}
            {/* Dialog when we want to delete Ingredient */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Supprimer'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Vous voulez vraiment supprimer cette recommandation ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Non
                </Button>
                <Button color="primary" onClick={handleButtonDelete} autoFocus>
                  Oui
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        );
      } else {
        // Display an empty table
        return (
          <Fragment>
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        className={classes.typography}
                        variant="subtitle2"
                      >
                        Recommandations
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        className={classes.typography}
                        variant="subtitle2"
                      >
                        Date de creation
                      </Typography>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        );
      }
    }
  };
  /**
   * render Method
   */
  return <Fragment>{renderFunction()}</Fragment>;
}
