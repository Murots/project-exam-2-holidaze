import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
        setVenues([]);
      }
    };
    fetchVenues();
  }, [username, token, apiKey, fetchApi]);

  const onUpdate = (updatedVenue) => updateVenueList(updatedVenue, setVenues);

  if (isLoading) {
    return <S.Loader />;
  }

  if (isError) {
    return (
      <S.Container>
        <S.FeedbackMessage error>Network error. Please try again later.</S.FeedbackMessage>
      </S.Container>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Holidaze | My Venues</title>
        <meta
          name="description"
          content="See all your venues in this list. Please expand your venue item to see all details, as well as all bookings on this venue. All details can easily be edited, and the venue can also be deleted."
        />
      </Helmet>
      <S.Container>
        <S.Heading>My Venues</S.Heading>
        {!isLoading && !isError && venues.length === 0 && <S.FeedbackMessage error>No venues found.</S.FeedbackMessage>}
        {venues.map((venue) => (
          <MyVenuesExpandable key={venue.id} venue={venue} onUpdate={onUpdate} />
        ))}
      </S.Container>
    </div>
  );
};

export default MyVenuesPage;
