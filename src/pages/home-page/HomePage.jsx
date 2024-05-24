import React, { useState, useEffect } from "react";
import * as S from "./HomePage.styles";
import useApi from "../../hooks/useApi";
import SearchCard from "../../components/search-card/SearchCard";

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
            const filteredVenues = filterVenues(result.data);
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

  const filterVenues = (venues) => {
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
  );
}

export default HomePage;
