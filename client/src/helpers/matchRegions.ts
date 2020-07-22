import { AxiosResponse } from '../types';
const axios = require('axios');

const matchRegions = (partySize: number, smoking: boolean, children: boolean) => {
  return axios.post('/api/regions', {
    partySize,
    smoking,
    children
  })
    .then((data: AxiosResponse) => {
      return data.data;
    })
    .catch((err: AxiosResponse) => {
      console.log(err);
      return err;
    })
};

export default matchRegions;