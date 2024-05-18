export const handleDetailsUpdate = async (username, token, apiKey, fetchApi, newAvatarUrl, userData, newBio, setUserData) => {
  try {
    const updatedData = {
      avatar: { url: newAvatarUrl || userData.avatarUrl, alt: "User Avatar" },
      bio: newBio,
    };
    await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, "PUT", updatedData, token, apiKey);
    setUserData({ ...userData, avatarUrl: newAvatarUrl || userData.avatarUrl, bio: newBio });
  } catch (error) {
    console.error("Error updating user details", error);
  }
};

export const handleSelectionChange = async (username, token, apiKey, fetchApi, newValue, setVenueManager) => {
  setVenueManager(newValue);
  try {
    await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, "PUT", { venueManager: newValue }, token, apiKey);
  } catch (error) {
    console.error("Error updating venue manager status", error);
  }
};
