import { URL_API } from '../constants/constants';
import Axios from 'axios';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { createBrowserHistory } from 'history';
import { LOGIN } from '../strings/strings';

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
    if (error.response.status === 401) {
      const customHistory = createBrowserHistory();
      localStorage.removeItem('token');
      customHistory.push(LOGIN);
    } else {
      callback(error.response);
    }
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
