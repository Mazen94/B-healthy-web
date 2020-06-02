import { URL_API } from '../constants/constants';
import Axios from 'axios';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { createBrowserHistory } from 'history';
import { PATH_LOGIN } from '../../routes/path';
import { UNAUTHENTICATED } from '../../shared/strings/strings';
import * as strings from '../../shared/strings/strings';

export async function axiosService(endPoint, method, headers, data, callback) {
  const config = {
    method: method,
    url: `${URL_API}${endPoint}`,
    timeout: 20000,
  };
  if (data) config.data = data;
  if (headers)
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  try {
    const response = await Axios(config);
    callback(undefined, response);
  } catch (error) {
    if (error.response.data.message === UNAUTHENTICATED) {
      localStorage.removeItem('token');
      const customHistory = createBrowserHistory();
      customHistory.go(PATH_LOGIN);
    }
    callback(error.response);
  }
}
/**
 * Validation : add custom rules (must be number).
 */
export function isInteger() {
  ValidatorForm.addValidationRule('isInteger', (value) => {
    if (isNaN(value)) {
      return false;
    }
    return true;
  });
}
export function lenghOfPassword() {
  ValidatorForm.addValidationRule('lenghPassword', (value) => {
    if (value.length < 8) {
      return false;
    }
    return true;
  });
}
export function validationAge() {
  ValidatorForm.addValidationRule('validationAge', (value) => {
    if (value > 90 || value < 5) {
      return false;
    }
    return true;
  });
}

//GET THE MOUNTH RELATED TO THE KEY
export const findTheMonth = (key) => {
  switch (key) {
    case '01':
      return strings.THE_MONTHS[0];
    case '02':
      return strings.THE_MONTHS[1];
    case '03':
      return strings.THE_MONTHS[2];
    case '04':
      return strings.THE_MONTHS[3];
    case '05':
      return strings.THE_MONTHS[4];
    case '06':
      return strings.THE_MONTHS[5];
    case '07':
      return strings.THE_MONTHS[6];
    case '08':
      return strings.THE_MONTHS[7];
    case '09':
      return strings.THE_MONTHS[8];
    case '10':
      return strings.THE_MONTHS[9];
    case '11':
      return strings.THE_MONTHS[10];
    case '12':
      return strings.THE_MONTHS[11];

    default:
      return strings.THE_MONTHS[0];
  }
};
