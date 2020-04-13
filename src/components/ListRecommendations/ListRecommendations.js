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
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import recommendations from '../../assets/recommendations.png';
import { axiosService } from '../../shared/services/services';
import DialogComponent from '../DialogComponent/DialogComponent';
import { DIALOG_RECOMMENDATION } from '../../shared/constants/constants';
import { TABLE_HEAD_RECOMMENDATION } from '../../shared/strings/strings';
import {
  DELETE,
  GET,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../shared/constants/constants';
import { PATH_PATIENT, PATH_RECOMMENDATIONS } from '../../routes/path';
import {
  ENDPOINT_PATIENTS,
  ENDPOINT_RECOMMENDATIONS,
} from '../../shared/constants/endpoint';
import { useStyles } from './styles';
import HeadersTable from '../HeadersTable/HeadersTable';

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
    //Prepare cancel request
    let mounted = true;
    axiosService(
      `${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setData(response.data.data); //add the received data to the state data
            setFlag(false);
          }
        } else
          console.log('error to get all the list of recommendations', error);
      }
    );

    return () => {
      mounted = false;
    };
  }, [params.id]);
  /**
   *  navigate to the route edit recommendation
   * @param {int} id
   */
  const handleClickIconButton = (id) => {
    history.push(`${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATIONS}/${id}/`);
  };
  /**
   * arrow function to open the dialogue when the nutritionit want to delete a Ingredient
   * @param {int} id
   */
  const handleClickOpen = (id) => {
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
  const handleButtonDelete = () => {
    axiosService(
      `${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}${deleteRecommendationId}`,
      DELETE,
      true,
      null,
      (error, response) => {
        if (response) setCurrentPage(currentPage);
        else console.log('error to delete a recommendations', error);
      }
    );
    setOpen(false); //to close the dialogue
    setData(data.filter((item) => item.id !== deleteRecommendationId)); //get the new data without the Ingredient deleted
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
      return (
        <Fragment>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <HeadersTable headerData={TABLE_HEAD_RECOMMENDATION} />
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
          </TableContainer>
          {/* DialogComponent*/}
          <DialogComponent
            handleButtonDelete={handleButtonDelete}
            open={open}
            handleClose={handleClose}
            message={DIALOG_RECOMMENDATION}
          />
        </Fragment>
      );
    }
  };
  /**
   * render Method
   */
  return <Fragment>{renderFunction()}</Fragment>;
}
