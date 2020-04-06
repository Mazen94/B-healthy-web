import { URL_API } from '../constants/constants';
import Axios from 'axios';

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
