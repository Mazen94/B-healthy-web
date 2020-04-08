import { URL_API } from '../constants/constants';
import Axios from 'axios';
import { ValidatorForm } from 'react-material-ui-form-validator';

export async function axiosService(endPoint, method, headers, data, callback) {
  const config = {
    method: method,
    url: `${URL_API}${endPoint}`,
    timeout: 20000,
  };
  if (data) config.data = data;
  if (headers) config.headers = { Authorization: headers };
  try {
    const response = await Axios(config);
    callback(undefined, response);
  } catch (error) {
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
