import { Avatar, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import DialogComponent from '../DialogComponent/DialogComponent';
import { useHistory } from 'react-router-dom';
import {
  GET,
  PATH_IMAGES_PAITENTS,
  PRIMARY_COLOR,
  SKELETON_VARIANT_TEXT,
  DIALOG_PATIENT,
  DIALOG_MEETING,
  POST,
} from '../../shared/constants/constants';
import { axiosService } from '../../shared/services/services';
import {
  MEETING_NOT_FOUND,
  START_MEETING,
  WAIT,
} from '../../shared/strings/strings';
import { useStyles } from './styles';
import {
  ENDPOINT_MEETING_OF_DAY,
  ENDPOINT_DELETE_MEETING,
} from '../../shared/constants/endpoint';
import { PATH_PATIENT, PATH_CONSULTATION } from '../../routes/path';

export default function ListMeeting() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const [visitId, setVisitId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete patient

  const handleClickButton = (idVisit, idPatient) => {
    setVisitId(idVisit);
    setPatientId(idPatient);
    setOpen(true);
  };

  useEffect(() => {
    axiosService(
      ENDPOINT_MEETING_OF_DAY,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          setFlag(false);
          setData(response.data.data);
        }
      }
    );
  }, []);
  /**
   * arrow function to delete meeting
   */
  const handleButtonDelete = () => {
    axiosService(
      ENDPOINT_DELETE_MEETING,
      POST,
      true,
      { id: visitId },
      (error, response) => {
        if (response) {
          console.log(response.data.data);
        }
      }
    );

    history.push(`${PATH_PATIENT}/${patientId}${PATH_CONSULTATION}`);
  };
  const handleButtonConsulation = () => {
    history.push(`${PATH_PATIENT}/${patientId}${PATH_CONSULTATION}`);
  };
  /**
   * arrow function to close the dialogue
   */
  const handleClose = () => {
    setOpen(false);
  };
  const renderFunction = () => {
    if (flag)
      return (
        <Fragment>
          <Skeleton
            variant={SKELETON_VARIANT_TEXT}
            className={classes.skeletonText}
          />
          <Skeleton
            variant={SKELETON_VARIANT_TEXT}
            className={classes.skeletonText}
          />
          <Skeleton
            variant={SKELETON_VARIANT_TEXT}
            className={classes.skeletonText}
          />
        </Fragment>
      );
    else {
      if (data.length !== 0) {
        return (
          <Fragment>
            {data.map((row, index) => (
              <Paper className={classes.paper} elevation={3} key={index}>
                <div className={classes.divStyle}>
                  <Avatar
                    className={classes.avatar}
                    src={PATH_IMAGES_PAITENTS + row.photo}
                  />
                  {`${row.lastName} ${row.firstName}`}
                </div>
                <div className={classes.divStyle}>
                  <AccessTimeIcon className={classes.icon} />
                  {row.meetingHour.slice(0, 5)}
                </div>
                {WAIT}
                <Button
                  color={PRIMARY_COLOR}
                  onClick={() => handleClickButton(row.idVisit, row.idPatient)}
                >
                  {START_MEETING}
                </Button>
              </Paper>
            ))}
            <DialogComponent
              handleButtonDelete={handleButtonDelete}
              open={open}
              title={START_MEETING}
              handleClose={handleClose}
              displayButton={true}
              buttonMsg="Clique ici si vous voulez acceder à l'interface consultation sans supprimer le rendez-vous"
              message={DIALOG_MEETING}
              handleButton={handleButtonConsulation}
            />
          </Fragment>
        );
      } else
        return (
          <Paper className={classes.paper} elevation={3}>
            {MEETING_NOT_FOUND}
          </Paper>
        );
    }
  };

  return <Fragment>{renderFunction()}</Fragment>;
}
