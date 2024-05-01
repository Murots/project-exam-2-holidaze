import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import * as S from "./DetailsPage.styles"; // Import styled components

function DetailsPage() {
  const { id } = useParams();
  const { get } = useApi();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    get(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => {
        if (response.data) {
          setVenue(response.data);
        } else {
          throw new Error("Venue data is empty");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch venue details:", error);
        setVenue(null); // Ensure venue is set to null on error
      });
  }, [id, get]);

  if (!venue) return <div>Loading...</div>;

  // Safely access features only if venue.meta exists
  const hasFeatures = venue.meta && (venue.meta.wifi || venue.meta.parking || venue.meta.breakfast || venue.meta.pets);

  return (
    <S.Container>
      <S.PageHeader>
        <S.Image src={venue.media[0].url} alt={venue.name || "Venue image"} />
        <S.Name>{venue.name}</S.Name>
      </S.PageHeader>
      <S.Content>
        <S.Description>{venue.description}</S.Description>
        <p>
          <strong>Price per night:</strong> {venue.price} NOK
        </p>
        <p>
          <strong>Maximum guests:</strong> {venue.maxGuests}
        </p>
        <div>
          <strong>Features:</strong>
          {hasFeatures ? (
            <ul>
              {venue.meta.wifi && <li>Wifi</li>}
              {venue.meta.parking && <li>Parking</li>}
              {venue.meta.breakfast && <li>Breakfast Included</li>}
              {venue.meta.pets && <li>Pet Friendly</li>}
            </ul>
          ) : (
            <ul>Not specified</ul>
          )}
        </div>
        <p>
          <strong>Location:</strong> {`${venue.location.address}, ${venue.location.city}, ${venue.location.country}`}
        </p>
      </S.Content>
    </S.Container>
  );
}

export default DetailsPage;
