import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; //new instance of axios with a custom config
import { axiosService } from '../../shared/services/services';
import {
  ENDPOINT_LIST_PATIENTS,
  ENDPOINT_PATIENTS,
} from '../../shared/constants/endpoint';
import DialogComponent from '../DialogComponent/DialogComponent';
import * as constants from '../../shared/constants/constants';
import { TABLE_HEAD_PATIENTS } from '../../shared/strings/strings';
import HeadersTable from '../HeadersTable/HeadersTable';
import {
  PATH_PATIENTS,
  PATH_PATIENT,
  PATH_CONSULTATION,
} from '../../routes/path';
import { useStyles } from './styles';

export default function ListPatients(props) {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete patient
  const [currentPage, setCurrentPage] = useState(1); //to get the current page in the data
  const [lasPage, setLastPage] = useState(10); //to get the last page in the data
  const [data, setData] = useState([]); //to get the list of patients
  const [deletePatientId, setDeletePatientId] = useState(''); // to retrieve the patient id to delete
  const [flag, setFlag] = useState(true);

  /**
   *  Arrow function to go to the next page
   * @param {event} e
   * @param {string} newPage
   */
  const handleChange = (e, newPage) => {
    setCurrentPage(newPage);
    setData([]);
    history.push(`${PATH_PATIENTS}/${newPage}`);
  };
  /**
   * Hook useEffect in this case he plays the role of componentDidMount and componentDidUpdate
   * in this hook there will be a get  the patients , the current page and the last page in the data
   * this hook executed when the value of currentPage changes
   */
  useEffect(() => {
    let mounted = true;
    let url = '';
    if (props.search !== '')
      url = `${ENDPOINT_LIST_PATIENTS}${currentPage}&search=${props.search}`;
    else url = `${ENDPOINT_LIST_PATIENTS}${currentPage}`;
    setFlag(true);
    //axiosService to get list of patients
    axiosService(url, constants.GET, true, null, (error, response) => {
      if (response) {
        if (mounted) {
          setData(response.data.data.data); //add the received data to the state data
          setCurrentPage(response.data.data.current_page); //add the received current_page  to the state currentPage
          setLastPage(response.data.data.last_page); //add the received last_page to the state lastPage
          setFlag(false);
        }
      } else console.log(error);
    });

    return () => {
      mounted = false;
    };
  }, [currentPage, props.search]);
  /**
   * arrow function to delete a patient
   */
  const handleButtonDelete = () => {
    axiosService(
      `${ENDPOINT_PATIENTS}${deletePatientId}`,
      constants.DELETE,
      true,
      null,
      (error, response) => {
        if (response) {
          setCurrentPage(currentPage);
          setOpen(false); //to close the dialogue
          setData(data.filter((item) => item.id !== deletePatientId)); //get the new data without the patient deleted
        } else console.log(error);
      }
    );
  };
  /**
   * arrow function to open the dialogue when the nutritionit want to delete a patient
   * @param {int} id
   */
  const handleClickOpen = (id) => {
    setDeletePatientId(id); // Set the id of the patient inside the state
    setOpen(true); // Open the dialogue
  };
  /**
   * arrow function navigate to consultation component
   * @param {int} id
   */
  const handleClickArrowForwardIcon = (id) => {
    history.push(`${PATH_PATIENT}/${id}${PATH_CONSULTATION}`);
  };
  /**
   * arrow function to close the dialogue
   */
  const handleClose = () => {
    setOpen(false);
  };
  /**
   * function to render
   */
  const renderFunction = () => {
    if (flag) {
      return (
        <div className={classes.skeleton}>
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
    } else
      return (
        <Fragment>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              {/* HeadersTable Component */}
              <HeadersTable headerData={TABLE_HEAD_PATIENTS} />
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box className={classes.boxStyle}>
                        <Box>
                          <Avatar
                            className={classes.avatar}
                            src={constants.PATH_IMAGES_PAITENTS + row.photo}
                          ></Avatar>
                        </Box>
                        <Box p={2}>
                          <a
                            className={classes.link}
                            href={`${PATH_PATIENT}/${row.id}${PATH_CONSULTATION}`}
                          >
                            {row.firstName} {row.lastName}
                          </a>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.numberPhone}</TableCell>
                    <TableCell align="left">{row.profession}</TableCell>
                    <TableCell align="left">
                      {/* icon to consult */}
                      <IconButton
                        value={row.id}
                        onClick={() => handleClickArrowForwardIcon(row.id)}
                        color={constants.PRIMARY_COLOR}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                      {/* icon to delete */}
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
            {/* Pagination */}
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
            message={constants.DIALOG_PATIENT}
          />
        </Fragment>
      );
  };
  /**
   * render
   */
  return <Fragment>{renderFunction()}</Fragment>;
}
