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
