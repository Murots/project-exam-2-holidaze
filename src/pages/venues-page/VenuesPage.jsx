import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import * as S from "./VenuesPage.styles";
import VenuesCard from "../../components/venues-card/VenuesCard";
import useApi from "../../hooks/useApi";
import { shuffle, handleSortChange, sortVenues, filterValidVenues } from "../../utils/venues-utils/venuesUtils";

/**
 * Represents the component that displays a list of venues available on the Holidaze platform.
 * Users can view various venues that can be sorted by price or rating. This component fetches data using useApi, processes it to validate and shuffle the initial display, and allows dynamic sorting to enhance user experience.
 *
 * @module VenuesPage
 * @returns {React.Component} The VenuesPage component, which provides a sortable interface for users to explore various venues.
 * @example
 * return (
 *   <VenuesPage />
 * )
 */
function VenuesPage() {
  const { fetchApi, isLoading, isError } = useApi();
  const [venues, setVenues] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchAllVenues = async () => {
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

    fetchAllVenues().then((venues) => {
      const validVenues = filterValidVenues(venues);
      const shuffledVenues = shuffle(validVenues);
      setVenues(shuffledVenues);
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
    <div>
      <Helmet>
        <title>Holidaze | Venues</title>
        <meta
          name="description"
          content="Dive into our great selection of venues in Norway. The venues are displayed in different size, based on their rating. Please use the sort function for easy access."
        />
      </Helmet>
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
    </div>
  );
}

export default VenuesPage;
