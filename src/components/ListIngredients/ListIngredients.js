import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ingredient from '../../assets/ingredient.png';
import { axiosService } from '../../shared/services/services';
import { headers } from '../../shared/constants/env';
import {
  ENDPOINT_LIST_INGREDIENTS,
  ENDPOINT_INGREDIENTS,
} from '../../shared/constants/endpoint';
import DialogComponent from '../DialogComponent/DialogComponent';
import {
  DELETE,
  GET,
  DIALOG_RECOMMENDATION,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../shared/constants/constants';
import { TABLE_HEAD_INGREDIENTS } from '../../shared/strings/strings';
import { PATH_INGREDIENT, PATH_INGREDIENTS } from '../../routes/path';
import { useStyles } from './styles';
import HeadersTable from '../HeadersTable/HeadersTable';

export default function AddIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const [data, setData] = useState([]); // state to get the ingredients
  const [currentPage, setCurrentPage] = useState(1); //currentPage: to get the current page in the data
  const [lasPage, setLastPage] = useState(10); //to get the last page in the data
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete ingredient (initial value is false)
  const [deleteIngredientId, setDeleteIngredientId] = useState(''); //to retrieve the ingredient id to delete

  /**
   *  Arrow function to go to the next page
   * @param {event} e
   * @param {string} newPage
   */
  const handleChange = (e, newPage) => {
    setCurrentPage(newPage);
    setData([]);
    history.push(`${PATH_INGREDIENTS}/${newPage}`);
  };
  /**
   * hook useEffect there will be a get  the ingredients , the current page and the last page in the data
   * this hook executed when the value of currentPage changes
   */
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    //Arrow function to get the data (ingredients) using Async await
    const loadIngredient = async () => {
      axiosService(
        `${ENDPOINT_LIST_INGREDIENTS}${currentPage}`,
        GET,
        headers,
        null,
        (error, response) => {
          if (response) {
            if (mounted) {
              setData(response.data.ingredients.data); //add the received data to the state data
              setCurrentPage(response.data.ingredients.current_page); //add the received current_page to the state lastPage
              setLastPage(response.data.ingredients.last_page); //add the received last_page to the state lastPage
            }
          } else console.log('error to get the list of ingredients', error);
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
    history.push(`${PATH_INGREDIENT}/${id}`);
  };
  /**
   * arrow function to open the dialogue when the nutritionit want to delete a Ingredient
   * @param {int} id
   */
  const handleClickOpen = (id) => {
    setDeleteIngredientId(id); // Set the id of the Ingredient inside the state
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
    await axiosService(
      `${ENDPOINT_INGREDIENTS}${deleteIngredientId}`,
      DELETE,
      headers,
      null,
      (error, response) => {
        if (response) {
          setCurrentPage(currentPage);
          setOpen(false); //to close the dialogue
          setData(data.filter((item) => item.id !== deleteIngredientId)); //get the new data without the Ingredient deleted
        } else console.log('error to delete ingredients', error);
      }
    );
  };
  /**
   *  function to render
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              {/* HeadersTable Component */}
              <HeadersTable headerData={TABLE_HEAD_INGREDIENTS} />
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Box display="flex" flexDirection="row">
                        <Box>
                          <Avatar
                            className={classes.avatar}
                            src={ingredient}
                          ></Avatar>
                        </Box>
                        <Box p={2}>
                          <a className={classes.link} href="# ">
                            {row.name}
                          </a>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.calorie}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="right">
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
            message={DIALOG_RECOMMENDATION}
          />
        </Fragment>
      );
  };

  /**
   * render method
   */
  return <div>{renderFunction()}</div>;
}
