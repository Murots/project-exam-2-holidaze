import React, { useEffect, useState } from "react";
import * as S from "./VenuesPage.styles";
import VenuesCard from "../../components/venues-card/VenuesCard";
import useApi from "../../hooks/useApi";

const VenuesPage = () => {
  const { get } = useApi();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    get("https://v2.api.noroff.dev/holidaze/venues")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          console.error("Received data is not an array:", response);
        }
      })
      .catch((error) => {
        console.error("Fetching venues failed:", error);
      });
  }, [get]);

  return (
    <S.PageContainer>
      <S.Header>Venues</S.Header>
      <S.VenuesGrid>
        {venues.map((venue) => (
          <VenuesCard key={venue.id} venue={venue} rating={venue.rating} />
        ))}
      </S.VenuesGrid>
    </S.PageContainer>
  );
};

export default VenuesPage;
