import { useCallback } from "react";

const useApi = () => {
  const get = useCallback(async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }
    return response.json();
  }, []);

  // const post = useCallback(async (url, data) => {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // }, []);

  const post = useCallback(async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json(); // Ensure you handle JSON parsing
    if (!response.ok) {
      // Handle the first error specifically
      throw new Error(result.errors ? result.errors[0].message : "Network response failed");
    }
    return result;
  }, []);

  const del = useCallback(async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }, []);

  return { get, post, del };
};

export default useApi;
