import { AxiosResponse, DaySlots, TimeDaySlot, TimeSlot } from '../types';
const axios = require('axios');

const getSlots = (region_id: number) => {
  return axios.get(`/api/regions/${region_id}`)
    .then((data: AxiosResponse) => {
      const fullData: Array<TimeDaySlot> = data.data;
      const processedData: DaySlots = {};
      fullData.forEach((slot) => {
        const date = slot.date.substring(0,10);
        const time = slot.time_string;
        const taken = slot.taken;
        if (!processedData[date]) processedData[date] = [];
        processedData[date].push({time: time, taken: taken, selected: false});
      });
      return processedData;
    })
    .catch((err: AxiosResponse) => {
      console.log(err);
      return err;
    });
};

export default getSlots;