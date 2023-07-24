import { axiosWithAuth } from "../utils/axiosWithAuth";

export const fetchColors = () => {
  return axiosWithAuth()
    .get(`/api/colors`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error("error fetching data from api, err: ", err.message);
      return err;
    });
};
