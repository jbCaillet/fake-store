import { useState } from "react";
import config from '../api/config';
import axios from "axios";

const baseURL = config.baseURL;
export const useAuth = ({ consulta }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const PostData = async (DATA) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseURL}${consulta}`, DATA, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      setError(error);
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [PostData, loading, error];
};