import { AxiosResponse } from '../types';
const axios = require('axios');

const getSlots = (region_id: number) => {
  return axios.get(`/api/regions/${region_id}`)
    .then((data: AxiosResponse) => {
      return data.data;
    })
    .catch((err: AxiosResponse) => {
      console.log(err);
      return err;
    })
};

export default getSlots;