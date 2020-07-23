import { AxiosResponse, FullInfo } from '../types';
const axios = require('axios');

const confirmReservation = (info: Partial<FullInfo>) => {
  return axios.post('/api/reservations', info)
    .then((data: AxiosResponse) => {
      return data.data;
    })
    .catch((err: AxiosResponse) => {
      console.log(err);
      return err;
    });
};

export default confirmReservation;