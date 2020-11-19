import axios from 'axios';
import { URL } from './url';

export const axiosService = async () => {
  return await axios(URL);
};
