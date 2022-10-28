import axios from "axios";

const BASE_URL = "//localhost:8001";

/**
 * “一片黑暗” api
 */
export class DarkApi {
  static test = () => {
    axios.get(`${BASE_URL}/dark`);
  };
}
