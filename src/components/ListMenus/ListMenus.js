import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import meal from '../../assets/meal.png';
import { DIALOG_MENU } from '../../shared/constants/constants';
import DialogComponent from '../DialogComponent/DialogComponent';
import { axiosService } from '../../shared/services/services';
import { headers } from '../../shared/constants/env';
import {
  ENDPOINT_LIST_MEALS,
  ENDPOINT_MEALS,
} from '../../shared/constants/endpoint';
import {
  MENUS,
  MENU_TYPE,
  CALORIES,
  AGE_RANGE,
} from '../../shared/strings/strings';
import {
  GET,
  DELETE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../shared/constants/constants';
import { PATH_MENU, PATH_MENUS } from '../../routes/path';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: 'auto',

    width: '100%',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  ButtonGroup: {
    marginBottom: 10,
    marginLeft: '85%',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  link: {
    color: 'rgb(39 , 39, 39)',
  },
}));

export default function AddIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const [data, setData] = useState([]); // state to get the ingredients
  const [currentPage, setCurrentPage] = useState(1); //currentPage: to get the current page in the data
  const [lasPage, setLastPage] = useState(10); //to get the last page in the data
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete menu (initial value is false)
  const [deleteMenuId, setDeleteMenuId] = useState(''); //to retrieve the menu id to delete

  /**
   *  Arrow function to go to the next page
   * @param {event} e
   * @param {string} newPage
   */
  const handleChange = (e, newPage) => {
    setCurrentPage(newPage);
    setData([]);
    history.push(`${PATH_MENUS}/${newPage}`);
  };
  /**
   * hook useEffect there will be a get  the menu , the current page and the last page in the data
   * this hook executed when the value of currentPage changes
   */
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    // Arrow function to get the data (menu) using Async await
    const loadIngredient = async () => {
      axiosService(
        `${ENDPOINT_LIST_MEALS}${currentPage}`,
        GET,
        headers,
        null,
        (error, response) => {
          if (response) {
            if (mounted) {
              setData(response.data.MealStore.data); //add the received data to the state data
              setCurrentPage(response.data.MealStore.current_page); //add the received current_page to the state lastPage
              setLastPage(response.data.MealStore.last_page); //add the received last_page to the state lastPage
            }
          } else console.log('error to get all the list of menus', error);
        }
      );
    };
    //call function
    loadIngredient();
    return () => {
      mounted = false;
    };
  }, [currentPage]);

  const handleClickIconButton = (id) => {
    history.push(`${PATH_MENU}/${id}`);
  };
  /**
   * arrow function to open the dialogue when the nutritionit want to delete a Ingredient
   * @param {int} id
   */
  const handleClickOpen = (id) => {
    setDeleteMenuId(id); // Set the id of the Ingredient inside the state
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
    axiosService(
      `${ENDPOINT_MEALS}${deleteMenuId}`,
      DELETE,
      headers,
      null,
      (error, response) => {
        if (response) {
          setCurrentPage(currentPage);
          setOpen(false); //to close the dialogue
          setData(data.filter((item) => item.id !== deleteMenuId)); //get the new data without the menu deleted*/
        } else console.log('error to delete a menus', error);
      }
    );
  };
  /**
   * Function to render
   */
  const renderFunction = () => {
    if (data.length === 0) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton variant="text" height="70px" width="100%" />
          <Skeleton variant="rect" width="100%" height="55vh" />
        </div>
      );
    } else
      return (
        <Fragment>
          {/* Table */}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{MENUS}</TableCell>
                  <TableCell align="left">{MENU_TYPE}</TableCell>
                  <TableCell align="left">{CALORIES}</TableCell>
                  <TableCell align="left">{AGE_RANGE}</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Box display="flex" flexDirection="row">
                        <Box>
                          <Avatar
                            className={classes.avatar}
                            src={meal}
                          ></Avatar>
                        </Box>
                        <Box p={2}>
                          <a className={classes.link} href="# ">
                            {row.name}
                          </a>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.type_menu}</TableCell>

                    <TableCell align="left">{row.calorie} </TableCell>
                    <TableCell align="left">
                      [{row.min_age},{row.max_age}]
                    </TableCell>

                    <TableCell align="left">
                      <IconButton
                        value={row.id}
                        onClick={() => handleClickIconButton(row.id)}
                        color={PRIMARY_COLOR}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        value={row.id}
                        onClick={() => handleClickOpen(row.id)}
                        color={SECONDARY_COLOR}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              className={classes.pagination}
              count={lasPage}
              page={currentPage}
              onChange={handleChange}
              color={PRIMARY_COLOR}
            />
          </TableContainer>
          <DialogComponent
            handleButtonDelete={handleButtonDelete}
            open={open}
            handleClose={handleClose}
            message={DIALOG_MENU}
          />
        </Fragment>
      );
  };
  return <Fragment>{renderFunction()}</Fragment>;
}
