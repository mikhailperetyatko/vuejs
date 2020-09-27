import axios from 'axios';
import timeoutWithPromise from '@/helpers/timeoutWithPromise';

const http = axios.create({
  baseURL: 'http://vue-study.dev.creonit.ru',
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
