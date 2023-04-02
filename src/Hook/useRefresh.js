import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../Store/Slices/AuthSlice";

const base_url = "http://localhost:8000";
export const useRefresh = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${base_url}/user/refresh`, {
          withCredentials: true,
        });
        dispatch(setAuth(data));
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    })();
  }, []);
  return { loading };
};
