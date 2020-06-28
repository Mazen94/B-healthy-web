import { URL_API } from '../constants/constants';
import Axios from 'axios';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { createBrowserHistory } from 'history';
import { PATH_LOGIN } from '../../routes/path';
import { UNAUTHENTICATED } from '../../shared/strings/strings';
import * as strings from '../../shared/strings/strings';
import {
  RULES_NAME_IS_INTEGER,
  RULES_NAME_VALIDATION_AGE,
  RULES_NAME_LENGHT_PASSWORD,
} from '../constants/validation';

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
    console.log(error);
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
  ValidatorForm.addValidationRule(RULES_NAME_IS_INTEGER, (value) => {
    if (isNaN(value)) {
      return false;
    }
    return true;
  });
}
export function lenghOfPassword() {
  ValidatorForm.addValidationRule(RULES_NAME_LENGHT_PASSWORD, (value) => {
    if (value.length < 8) {
      return false;
    }
    return true;
  });
}
export function validationAge() {
  ValidatorForm.addValidationRule(RULES_NAME_VALIDATION_AGE, (value) => {
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

//GET THE MOUNTH RELATED TO THE KEY
export const findTheMenuType = (key) => {
  switch (key) {
    case 0:
      return strings.SELECT_TYPE_MENU[0];
    case 1:
      return strings.SELECT_TYPE_MENU[1];
    case 2:
      return strings.SELECT_TYPE_MENU[2];
    case 3:
      return strings.SELECT_TYPE_MENU[3];
    case 4:
      return strings.SELECT_TYPE_MENU[4];
    case 5:
      return strings.SELECT_TYPE_MENU[0];
    case 6:
      return strings.SELECT_TYPE_MENU[1];
    case 7:
      return strings.SELECT_TYPE_MENU[2];
    case 8:
      return strings.SELECT_TYPE_MENU[3];
    case 9:
      return strings.SELECT_TYPE_MENU[4];
    default:
      return strings.SELECT_TYPE_MENU[0];
  }
};
