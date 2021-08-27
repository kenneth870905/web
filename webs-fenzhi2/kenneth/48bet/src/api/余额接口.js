import axios from "axios";
import qs from "qs";

const api_获取用户余额 = obj => {
  return axios.post(config.api_url + "/Members/Info/Online", qs.stringify(obj));
};

const api_获取平台余额 = obj => {
  return axios.post(
    config.api_url + "/Other/Play/GetBalance",
    qs.stringify(obj)
  );
};

/**
    amount: 金额
    type: ag
*/
const api_转入金额 = obj => {
  return axios.post(
    config.api_url + "/Other/Play/TransfreIn",
    qs.stringify(obj)
  );
};
const api_转出金额 = obj => {
  return axios.post(
    config.api_url + "/Other/Play/TransfreOut",
    qs.stringify(obj)
  );
};
export { api_获取用户余额, api_获取平台余额, api_转入金额, api_转出金额 };
