import React, { useEffect, useState } from "react";
import * as S from "./VenuesPage.styles";
import VenuesCard from "../../components/venues-card/VenuesCard";
import useApi from "../../hooks/useApi";
import { shuffle, handleSortChange, sortVenues } from "../../utils/venues-utils/venuesUtils";

const fetchAllVenues = async (fetchApi) => {
  let allVenues = [];
  let page = 1;
  const limit = 100;
  let totalFetched = 0;

  do {
    try {
      const result = await fetchApi(`https://v2.api.noroff.dev/holidaze/venues?limit=${limit}&page=${page}`, "GET");
      if (result.data && Array.isArray(result.data)) {
        totalFetched = result.data.length;
        allVenues = [...allVenues, ...result.data];
        page++;
      } else {
        totalFetched = 0;
      }
    } catch (error) {
      console.error("Fetching venues failed:", error);
      break;
    }
  } while (totalFetched > 0);

  return allVenues;
};

const VenuesPage = () => {
  const { fetchApi, isLoading, isError } = useApi();
  const [venues, setVenues] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchAllVenues(fetchApi)
      .then((venues) => {
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

        const shuffledVenues = shuffle(uniqueVenues);
        setVenues(shuffledVenues);
      })
      .catch((error) => {
        console.error("Fetching all venues failed:", error);
      });
  }, [fetchApi]);

  const sortedVenues = venues.length > 0 ? sortVenues(venues, sort) : [];

  if (isLoading) {
    return <S.Loader />;
  }

  if (isError) {
    return (
      <S.PageContainer>
        <S.FeedbackMessage error>Network error. Please try again later.</S.FeedbackMessage>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.Heading>Venues</S.Heading>
      <S.SortContainer>
        <S.SortLabel>Sort by:</S.SortLabel>
        <S.SortSelect value={sort} onChange={handleSortChange(setSort, sortVenues.bind(null, venues))}>
          <option value="">Select</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
          <option value="ratingAsc">Rating (Low to High)</option>
          <option value="ratingDesc">Rating (High to Low)</option>
        </S.SortSelect>
      </S.SortContainer>
      <S.VenuesGrid>
        {sortedVenues.map((venue) => (
          <VenuesCard key={venue.id} venue={venue} rating={venue.rating} />
        ))}
      </S.VenuesGrid>
    </S.PageContainer>
  );
};

export default VenuesPage;
