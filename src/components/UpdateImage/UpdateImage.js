import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import * as constants from '../../shared/constants/constants';
import { ENDPOINT_UPLOAD_IMAGE } from '../../shared/constants/endpoint';
import { axiosService } from '../../shared/services/services';
import { useStyles } from './styles';
import { NAME, SEND } from '../../shared/strings/strings';

export default function UpdateImage({ propsImage }) {
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState('');
  const classes = useStyles();

  const _onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', image, image.name);
    console.log(formData);
    axiosService(
      ENDPOINT_UPLOAD_IMAGE,
      constants.POST,
      true,
      formData,
      (error, response) => {
        //Redirect to the page dashboard
        if (response) setNewImage(response.data.data);
        else {
        }
      }
    );
  };

  return (
    <div className={classes.container}>
      <img
        src={newImage ? `${newImage}` : `${propsImage}`}
        className={classes.img}
        alt={NAME}
      />

      <form onSubmit={_handleSubmit}>
        <div className={classes.firstDiv}>
          <div className={classes.input}>
            <input
              type="file"
              onChange={(e) => _onChangeImage(e)}
              accept={constants.TYPE_OF_IMAGES}
            />
          </div>
          <Button
            type="submit"
            variant={constants.CONTAINED}
            color={constants.PRIMARY_COLOR}
            className={classes.submit}
          >
            {SEND}
          </Button>
        </div>
      </form>
    </div>
  );
}
