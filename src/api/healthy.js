import axios from 'axios';
/**
 * new instance of axios with a custom config
 */
export default axios.create({
  baseURL: 'http://healthy.test/api/nutritionist/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
