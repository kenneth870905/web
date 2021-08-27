import axios from "axios";
import qs from "qs";

const api_转入金额 = obj => {
  return axios.post(config.api_url + "/Members/Info/Online", qs.stringify(obj));
  // return axios.post('/apis'+'/Members/Info/Online',qs.stringify(obj))
};

export { api_转入金额 };
