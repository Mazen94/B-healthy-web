import { URL_API } from '../constants/constants';

export async function axiosService(endPoint, method, data) {
  const authStr = `Bearer ${localStorage.getItem('token')}`;
  const config = {
    method: method,
    url: `${URL_API}${endPoint}`,
    data: data,
    headers: { Authorization: authStr },
  };
  try {
    const response = await Axios(config);
    return response;
  } catch (error) {
    return error.response;
  }
}
