import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("hell", error);
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
