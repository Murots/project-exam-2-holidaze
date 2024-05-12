import { useCallback } from "react";

const useApi = () => {
  const fetchApi = useCallback(async (url, method = "GET", data = null, token = null, apiKey = null) => {
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
        throw new Error(result.errors ? result.errors[0].message : "Network response failed");
      }
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  return { fetchApi };
};

export default useApi;
