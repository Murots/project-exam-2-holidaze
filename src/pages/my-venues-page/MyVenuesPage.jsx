import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "../../hooks/useApi";
import * as S from "./MyVenuesPage.styles";
import MyVenuesExpandable from "../../components/my-venues-expandable/MyVenuesExpandable";
import { updateVenueList } from "../../utils/my-venues-utils/myVenuesUtils";

const MyVenuesPage = () => {
  const { username, token, apiKey } = useAuth();
  const { fetchApi, isLoading, isError } = useApi();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const result = await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}?_venues=true`, "GET", null, token, apiKey);
        setVenues(result.data.venues || []);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };
    fetchVenues();
  }, [username, token, apiKey, fetchApi]);

  const onUpdate = (updatedVenue) => updateVenueList(updatedVenue, setVenues);

  return (
    <S.Container>
      <S.Heading>My Venues</S.Heading>
      {isLoading && <S.Loader />}
      {isError && <S.FeedbackMessage error>Failed to load venues. Please try again later.</S.FeedbackMessage>}
      {venues.length === 0 && !isLoading && <S.FeedbackMessage error>No venues found.</S.FeedbackMessage>}
      {venues.map((venue) => (
        <MyVenuesExpandable key={venue.id} venue={venue} onUpdate={onUpdate} />
      ))}
    </S.Container>
  );
};

export default MyVenuesPage;
