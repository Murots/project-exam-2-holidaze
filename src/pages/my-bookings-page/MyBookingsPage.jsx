import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useApi from "../../hooks/useApi";
import * as S from "./MyBookingsPage.styles";
import MyBookingsExpandable from "../../components/my-bookings-expandable/MyBookingsExpandable";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Represents the component that displays all the bookings a user has made on the Holidaze platform.
 * Utilizes `useAuth` to retrieve the current user's authentication details and `useApi` to fetch booking data from a specified endpoint.
 * Each booking is displayed using the `MyBookingsExpandable` component, which allows users to view detailed information about their bookings.
 *
 * @module MyBookings
 * @returns {React.Component} The MyBookings component, which provides an interface for users to review all their bookings.
 * @example
 * return (
 *   <MyBookings />
 * )
 */
const MyBookings = () => {
  const { username, token, apiKey } = useAuth();
  const url = `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`;

  const { fetchApi, isLoading, isError } = useApi();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await fetchApi(url, "GET", null, token, apiKey);
        if (result.data && result.data.bookings) {
          const sortedBookings = result.data.bookings.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
          setBookings(sortedBookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [fetchApi, url, token, apiKey]);

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
        <title>Holidaze | My Bookings</title>
        <meta name="description" content="See all your bookings in this list. Please expand your booking item to see details or visit the venue." />
      </Helmet>
      <S.PageContainer>
        <S.Heading>My Bookings</S.Heading>
        {bookings.length > 0 ? bookings.map((booking) => <MyBookingsExpandable key={booking.id} booking={booking} />) : <S.FeedbackMessage error>No bookings found.</S.FeedbackMessage>}
      </S.PageContainer>
    </div>
  );
};

export default MyBookings;
