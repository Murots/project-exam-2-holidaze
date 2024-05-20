import { useCallback, useState } from "react";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchApi = useCallback(async (url, method = "GET", data = null, token = null, apiKey = null) => {
    setIsLoading(true);
    setIsError(false);

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(apiKey && { "X-Noroff-API-Key": apiKey }),
    };

    const fetchOptions = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    try {
      const response = await fetch(url, fetchOptions);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.errors ? result.errors[0].message : "Network response was not OK.");
      }
      return result;
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchApi, isLoading, isError };
};

export default useApi;
