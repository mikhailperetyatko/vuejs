import axios from 'axios';
import { BASE_API_URL } from '@/config';
import timeoutWithPromise from '@/helpers/timeoutWithPromise';

const http = axios.create({
  baseURL: BASE_API_URL,
});

export default ({
  method,
  url,
  params,
  data,
}) => timeoutWithPromise()
  .then(() => http({
    method,
    url,
    params,
    data,
  }));
