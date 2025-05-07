import { useState } from "react";
import config from '../api/config';
import axios from "axios";

const baseURL = config.baseURL;

export const usePut = ({ consulta }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const maxRetries = 3;
  
    const PutData = async (DATA) => {
      let attempts = 0;
      setLoading(true);
      setError(null);
  
      while (attempts < maxRetries) {
        try {
          const response = await axios.put(`${baseURL}${consulta}`, DATA, {
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          return response.data;
        } catch (error) {

          if (error.response && error.response.status === 500) {


            if (attempts >= maxRetries) {
              setError(error);

              throw error;
            }
  
            await new Promise((resolve) => setTimeout(resolve, 500));
          } else {

            setError(error);

            console.error("Error:", error.response ? error.response.data : error.message);
            throw error;
          }
        } finally {
          setLoading(false);
        }
      }
    };
  
    return [PutData, loading, error];
  };