import { useState, useEffect } from "react";
import axios from "lib/axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = () => {
    setLoading(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${endpoint}`);
        console.log("fetch", response);
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, [endpoint, loading]);

  return { data, error, loading, refetch };
};

export default useFetch;
