import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import * as S from "./HomePage.styles";
import useApi from "../../hooks/useApi";
import SearchCard from "../../components/search-card/SearchCard";
import { filterValidVenues } from "../../utils/venues-utils/venuesUtils";

/**
 * Represents the homepage of the Holidaze platform where users can search for venues.
 * This component handles user input to search for venues and displays the results dynamically.
 * It uses the `useApi` hook to fetch venues based on the user's query, and search results are filtered to show only valid venues using custom utility functions.
 *
 * @module HomePage
 * @returns {React.Component} The HomePage component which provides a search interface for venues and displays search results.
 * @example
 * return (
 *   <HomePage />
 * )
 */
function HomePage() {
  const { fetchApi } = useApi();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query.length > 2) {
      const fetchVenues = async () => {
        try {
          const result = await fetchApi(`https://v2.api.noroff.dev/holidaze/venues/search?q=${query}`);
          if (result.data && Array.isArray(result.data)) {
            const filteredVenues = filterValidVenues(result.data);
            setSearchResults(filteredVenues);
          }
        } catch (error) {
          console.error("Failed to fetch venues", error);
        }
      };
      fetchVenues();
    } else if (query.length === 0) {
      setSearchResults([]);
    }
  }, [query, fetchApi]);

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return null;
    }
    return (
      <S.ResultsDropdown>
        {searchResults.map((venue) => (
          <SearchCard key={venue.id} venue={venue} />
        ))}
      </S.ResultsDropdown>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Holidaze | Home</title>
        <meta
          name="description"
          content="Welcome to Holidaze, the best booking site providing venues in Norway. Please search venues to get started, or sign in and register as a manager to rent out. Dream Norway, Sleep Unique."
        />
      </Helmet>
      <S.FullScreenBackground>
        <S.HomePageHeading>
          <S.StylishWord1>Dream</S.StylishWord1>
          <S.StylishWord2>Norway,</S.StylishWord2>
          <S.StylishWord1>Sleep</S.StylishWord1>
          <S.StylishWord2>Unique</S.StylishWord2>
        </S.HomePageHeading>
        <S.SearchContainer>
          <S.SearchInput type="text" placeholder="Search venues..." value={query} onChange={handleQueryChange} />
          {renderSearchResults()}
        </S.SearchContainer>
      </S.FullScreenBackground>
    </div>
  );
}

export default HomePage;
