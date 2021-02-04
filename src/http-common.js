import axios from 'axios';
import timeoutWithPromise from '@/helpers/timeoutWithPromise';

const http = axios.create({
  baseURL: 'https://vue-study.dev.creonit.ru',
});

export default ({
  method,
  url,
  params,
  data,
}) => timeoutWithPromise(0)
  .then(() => http({
    method,
    url,
    params,
    data,
  }));
