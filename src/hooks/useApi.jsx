import { useCallback } from "react";

const useApi = () => {
  const get = useCallback(async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }, []);

  const post = useCallback(async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
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

  // Add other methods (PUT, PATCH) as needed
  return { get, post, del };
};

export default useApi;
