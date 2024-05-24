// Shuffle an array in a random order
export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Handle changes to the sorting criteria
export const handleSortChange = (setSort, sortVenues) => (event) => {
  const newSort = event.target.value;
  setSort(newSort);
  sortVenues(newSort);
};

// Sort venues based on a specified criteria
export const sortVenues = (venues, criteria) => {
  const sortedVenues = [...venues];
  if (criteria === "priceAsc") {
    sortedVenues.sort((a, b) => a.price - b.price);
  } else if (criteria === "priceDesc") {
    sortedVenues.sort((a, b) => b.price - a.price);
  } else if (criteria === "ratingAsc") {
    sortedVenues.sort((a, b) => a.rating - b.rating);
  } else if (criteria === "ratingDesc") {
    sortedVenues.sort((a, b) => b.rating - a.rating);
  }
  return sortedVenues;
};

// Filter venues based on a specified criteria
export const filterValidVenues = (venues) => {
  const validVenues = venues.filter((venue) => {
    const hasValidMedia = venue.media && venue.media.length > 0 && !venue.media[0].url.includes("string");
    const hasValidPrice = venue.price != null && !venue.price.toString().includes("string");
    const hasValidName = venue.name && !venue.name.includes("string");
    const hasValidLocation = venue.location && venue.location.city && !venue.location.city.includes("string");
    const hasValidCountry = venue.location && (venue.location.country === "Norway" || venue.location.country === "Norge");

    return hasValidMedia && hasValidPrice && hasValidName && hasValidLocation && hasValidCountry;
  });

  const uniqueImageUrls = new Set();
  const uniqueVenues = validVenues.filter((venue) => {
    const imageUrl = venue.media[0].url;
    if (!uniqueImageUrls.has(imageUrl) && !imageUrl.includes("string")) {
      uniqueImageUrls.add(imageUrl);
      return true;
    }
    return false;
  });

  return uniqueVenues;
};
