/**
 * Updates a venue's details on the server.
 * @param {Object} data - The updated venue data.
 * @param {string} venueId - The ID of the venue to update.
 * @param {function} fetchApi - API call function.
 * @param {string} token - Authorization token.
 * @param {string} apiKey - API key for the request.
 * @param {function} onUpdate - Callback to update the local venue state.
 * @param {function} setEditMode - Function to toggle edit mode off after update.
 */
export const handleUpdate = async (data, venueId, fetchApi, token, apiKey, onUpdate, setEditMode) => {
  data.location.country = "Norway";
  try {
    const updatedVenue = await fetchApi(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, "PUT", data, token, apiKey);
    setEditMode(false);
    onUpdate(updatedVenue.data);
  } catch (error) {
    console.error("Failed to update venue:", error);
  }
};

/**
 * Deletes a venue by its ID after confirming with the user.
 * @param {string} venueId - The ID of the venue to delete.
 * @param {function} fetchApi - API call function.
 * @param {string} token - Authorization token.
 * @param {string} apiKey - API key for the request.
 * @param {function} onUpdate - Callback to update the venue list upon deletion.
 */
export const handleDelete = async (venueId, fetchApi, token, apiKey, onUpdate) => {
  if (window.confirm("Are you sure you want to delete this venue?")) {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(apiKey && { "X-Noroff-API-Key": apiKey }),
      };

      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Failed to delete venue. Server responded with status: " + response.status);
      }

      onUpdate({ id: venueId, deleted: true });
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  }
};

/**
 * Updates the list of venues based on modifications or deletions.
 * @param {Object} updatedVenue - The updated venue data, or a deletion marker.
 * @param {function} setVenues - State setter function for updating the list of venues.
 */
export const updateVenueList = (updatedVenue, setVenues) => {
  if (updatedVenue.deleted) {
    setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== updatedVenue.id));
  } else {
    setVenues((prevVenues) => prevVenues.map((venue) => (venue.id === updatedVenue.id ? updatedVenue : venue)));
  }
};

/**
 * Fetches all bookings for a specific venue.
 * @param {string} venueId - The ID of the venue.
 * @param {function} fetchApi - API call function.
 * @param {string} token - Authorization token.
 * @param {string} apiKey - API key for the request.
 * @returns {Array} An array of bookings for the venue.
 */
export const fetchBookingsForVenue = async (venueId, fetchApi, token, apiKey) => {
  try {
    const result = await fetchApi(`https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`, "GET", null, token, apiKey);
    return result.data.bookings || [];
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
};
