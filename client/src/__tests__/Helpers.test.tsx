import getSlots from '../helpers/getSlots';
import matchRegions from '../helpers/matchRegions';
import axios from 'axios';

const options = {
  APILocation: "http://localhost:3000"
};

describe("getSlots Helper", () => {
  test("getSlots helper should be able to run with data from regionSelection and return slots", async () => {
    const region_id = 1;
    await axios.interceptors.request.use((config) => {
      // Do something before request is sent
      config.url = options.APILocation + config.url;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
    const data = await getSlots(region_id);
    expect(Object.keys(data).length > 0).toBe(true); 
  });
});

describe("matchRegions Helper", () => {
  test("matchRegions Helper should make an API call with given data to match to eligible dining regions", async () => {
    const partySize = 4;
    const smokers = true;
    const children = false;
    const data = await matchRegions(partySize, smokers, children);
    console.log(data);
    expect(data[0].region_name).toBe("Riverside (smoking allowed)"); 
  });
});