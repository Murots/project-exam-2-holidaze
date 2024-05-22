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

export const updateVenueList = (updatedVenue, setVenues) => {
  if (updatedVenue.deleted) {
    setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== updatedVenue.id));
  } else {
    setVenues((prevVenues) => prevVenues.map((venue) => (venue.id === updatedVenue.id ? updatedVenue : venue)));
  }
};
