import { useCallback, useState } from "react";

/**
 * Custom hook to perform API calls with error handling and loading state management.
 * It provides a reusable and centralized way to manage API requests across the application.
 *
 * @module useApi
 * @returns {Object} An object containing:
 *                    - fetchApi: A function to execute HTTP requests.
 *                    - isLoading: A boolean indicating if the request is currently loading.
 *                    - isError: A boolean indicating if the request encountered an error.
 * @example
 * const { fetchApi, isLoading, isError } = useApi();
 * useEffect(() => {
 *   fetchApi('https://api.example.com/data')
 *     .then(data => console.log(data))
 *     .catch(error => console.error(error));
 * }, []);
 */
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
