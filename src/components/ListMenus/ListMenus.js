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
import meal from '../../assets/meal.png';
import { DIALOG_MENU } from '../../shared/constants/constants';
import DialogComponent from '../DialogComponent/DialogComponent';
import { axiosService, findTheMenuType } from '../../shared/services/services';
import HeadersTable from '../HeadersTable/HeadersTable';
import {
  ENDPOINT_LIST_MEALS,
  ENDPOINT_MEALS,
} from '../../shared/constants/endpoint';
import { TABLE_HEAD_MENUS, ZERO_MENUS } from '../../shared/strings/strings';
import * as constants from '../../shared/constants/constants';
import { PATH_MENU, PATH_MENUS } from '../../routes/path';
import { useStyles } from './styles';

export default function AddIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const [data, setData] = useState([]); // state to get the ingredients
  const [currentPage, setCurrentPage] = useState(1); //currentPage: to get the current page in the data
  const [lasPage, setLastPage] = useState(10); //to get the last page in the data
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete menu (initial value is false)
  const [deleteMenuId, setDeleteMenuId] = useState(''); //to retrieve the menu id to delete
  const [loading, setLoading] = useState(true);
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
    axiosService(
      `${ENDPOINT_LIST_MEALS}${currentPage}`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setData(response.data.data.data); //add the received data to the state data
            setCurrentPage(response.data.data.current_page); //add the received current_page to the state lastPage
            setLastPage(response.data.data.last_page); //add the received last_page to the state lastPage
            setLoading(false);
          }
        } else console.log('error to get all the list of menus', error);
      }
    );
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
  const handleButtonDelete = () => {
    axiosService(
      `${ENDPOINT_MEALS}${deleteMenuId}`,
      constants.DELETE,
      true,
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
    if (loading) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton
            variant={constants.SKELETON_VARIANT_TEXT}
            className={classes.skeletonText}
          />
          <Skeleton
            variant={constants.SKELETON_VARIANT_RECT}
            className={classes.skeletonRect}
          />
        </div>
      );
    } else {
      if (data.length !== 0)
        return (
          <Fragment>
            {/* Table */}
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                {/* HeadersTable Component */}
                <HeadersTable headerData={TABLE_HEAD_MENUS} />
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Box className={classes.boxStyle}>
                          <Box>
                            <Avatar
                              className={classes.avatar}
                              src={meal}
                            ></Avatar>
                          </Box>
                          <Box p={2}>
                            <a
                              className={classes.link}
                              href={`${PATH_MENU}/${row.id}`}
                            >
                              {row.name}
                            </a>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        {findTheMenuType(row.type_menu)}
                      </TableCell>

                      <TableCell align="left">{row.calorie} </TableCell>
                      <TableCell align="left">
                        [{row.min_age},{row.max_age}]
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          value={row.id}
                          onClick={() => handleClickIconButton(row.id)}
                          color={constants.PRIMARY_COLOR}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          value={row.id}
                          onClick={() => handleClickOpen(row.id)}
                          color={constants.SECONDARY_COLOR}
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
                color={constants.PRIMARY_COLOR}
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
      else
        return (
          <Fragment>
            <Paper className={classes.paper} elevation={3}>
              {ZERO_MENUS}
            </Paper>
          </Fragment>
        );
    }
  };
  return <Fragment>{renderFunction()}</Fragment>;
}
