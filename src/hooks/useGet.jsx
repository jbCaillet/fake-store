
import { useState, useCallback } from 'react';
import config from '../api/config';
import axios from "axios";

const baseURL = config.baseURL;

export const useGet = ({ consulta }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {

      const response = await axios.get(`${baseURL}${consulta}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [consulta]);

  return [GetData, loading, error];
};