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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; //new instance of axios with a custom config
import healthy from '../../api/healthy';
import people from '../../assets/people.png';

/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
const useStyles = makeStyles({
  skeleton: {
    width: '100%'
  },
  table: {
    minWidth: 650
  },
  avatar: {
    height: 50,
    width: 50
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  link: {
    color: 'rgb(39 , 39, 39)'
  },
  button: {
    marginRight: 5
  }
});
/**
 * Component for showing the list of patient.
 */
export default function ListPatients() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete patient
  const [currentPage, setCurrentPage] = useState(1); //to get the current page in the data
  const [lasPage, setLastPage] = useState(10); //to get the last page in the data
  const [data, setData] = useState([]); //to get the list of patients
  const [deletePatientId, setDeletePatientId] = useState(''); // to retrieve the patient id to delete
  /**
   *  Arrow function to go to the next page
   * @param {event} e
   * @param {string} newPage
   */
  const handleChange = (e, newPage) => {
    setCurrentPage(newPage);
    setData([]);
    history.push(`/patients/${newPage}`);
  };
  /**
   * Hook useEffect in this case he plays the role of componentDidMount and componentDidUpdate
   * in this hook there will be a get  the patients , the current page and the last page in the data
   * this hook executed when the value of currentPage changes
   */
  useEffect(() => {
    /**
     * Arrow function to get the data (patients) using Async await
     */
    const loadPatient = async () => {
      const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
      const response = await healthy.get(`patients?page=` + currentPage, {
        headers: { Authorization: authStr }
      });
      setData(response.data.patients.data); //add the received data to the state data
      setCurrentPage(response.data.patients.current_page); //add the received current_page  to the state currentPage
      setLastPage(response.data.patients.last_page); //add the received last_page to the state lastPage
    };
    //call function
    loadPatient();
  }, [currentPage]);
  /**
   * arrow function to delete a patient
   */
  const handleButtonDelete = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
    try {
      const response = await healthy.delete(`patients/${deletePatientId}`, {
        headers: { Authorization: authStr }
      });
      console.log(response.data);
      setCurrentPage(currentPage);
    } catch (error) {
      console.log(error.response.data);
    }

    setOpen(false); //to close the dialogue
    setData(data.filter(item => item.id !== deletePatientId)); //get the new data without the patient deleted
  };
  /**
   * arrow function to open the dialogue when the nutritionit want to delete a patient
   * @param {int} id
   */
  const handleClickOpen = id => {
    setDeletePatientId(id); // Set the id of the patient inside the state
    setOpen(true); // Open the dialogue
  };
  /**
   * arrow function navigate to consultation component
   * @param {int} id
   */
  const handleClickArrowForwardIcon = id => {
    history.push(`/patient/${id}/consultation`);
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
    if (data.length === 0) {
      return (
        <div className={classes.skeleton}>
          <Skeleton variant="text" height="70px" width="100%" />

          <Skeleton variant="rect" width="100%" height="55vh" />
        </div>
      );
    } else
      return (
        <Fragment>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom Prenom</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Telephone</TableCell>
                  <TableCell align="left">Profession</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Box display="flex" flexDirection="row">
                        <Box>
                          <Avatar
                            className={classes.avatar}
                            src={people}
                          ></Avatar>
                        </Box>
                        <Box p={2}>
                          <a className={classes.link} href="!#">
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
                        color="primary"
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                      {/* icon to delete */}
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
            {/* Pagination */}
            <Pagination
              className={classes.pagination}
              count={lasPage}
              page={currentPage}
              onChange={handleChange}
              color="primary"
            />
          </TableContainer>
          {/*---------------------------------------*/}
          {/* Dialog when we want to delete patient */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Supprimer'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Vous voulez vraiment supprimer ce patient ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Non
              </Button>
              <Button onClick={handleButtonDelete} color="primary" autoFocus>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
  };
  /**
   * render
   */
  return <Fragment>{renderFunction()}</Fragment>;
}
