export const handleDetailsUpdate = async (username, token, apiKey, fetchApi, newAvatarUrl, newBio, updateAvatar, updateBio, setFeedbackMessage, setError) => {
  try {
    const updatedData = {
      avatar: { url: newAvatarUrl, alt: "User Avatar" },
      bio: newBio,
    };

    const response = await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, "PUT", updatedData, token, apiKey);

    if (response && response.data) {
      updateAvatar(newAvatarUrl);
      updateBio(newBio);
      setFeedbackMessage("Details Saved!");
      setError("");
    } else {
      throw new Error("Server failed to update user details");
    }
  } catch (error) {
    console.error("Error updating user details:", error.message);
    setError("Network error. Try again later.");
    setFeedbackMessage("");
  }
};

export const handleSelectionChange = async (username, token, apiKey, fetchApi, newValue, setVenueManager, clearMessages) => {
  try {
    const response = await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, "PUT", { venueManager: newValue }, token, apiKey);

    if (response && response.data) {
      setVenueManager(newValue);
      clearMessages();

      const event = new Event("requestSignOut");
      window.dispatchEvent(event);
    } else {
      throw new Error("Failed to update venue manager status on the server.");
    }
  } catch (error) {
    console.error("Error updating venue manager status:", error.message);
  }
};
