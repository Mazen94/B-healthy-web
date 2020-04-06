import { URL_API } from '../constants/constants';
import Axios from 'axios';

export async function axiosService(endPoint, method, headers, data) {
  const config = {
    method: method,
    url: `${URL_API}${endPoint}`,
    data: data,
  };
  if (data) config.data = data;
  if (headers) config.headers = { Authorization: headers };
  try {
    const response = await Axios(config);
    return response;
  } catch (error) {
    return error.response;
  }
}
