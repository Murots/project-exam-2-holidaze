// import { useCallback } from "react";

// const useApi = () => {
//   const get = useCallback(async (url) => {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Could not fetch data");
//     }
//     return response.json();
//   }, []);

//   // const post = useCallback(async (url, data) => {
//   //   const response = await fetch(url, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(data),
//   //   });
//   //   if (!response.ok) {
//   //     throw new Error("Network response was not ok");
//   //   }
//   //   return response.json();
//   // }, []);

//   const post = useCallback(async (url, data) => {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(result.errors ? result.errors[0].message : "Network response failed");
//     }
//     return result;
//   }, []);

//   const del = useCallback(async (url) => {
//     const response = await fetch(url, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   }, []);

//   return { get, post, del };
// };

// export default useApi;

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
