import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useApi from "../../hooks/useApi";
import * as S from "./MyBookingsPage.styles";
import MyBookingsExpandable from "../../components/my-bookings-expandable/MyBookingsExpandable";

const MyBookings = () => {
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");
  const apiKey = sessionStorage.getItem("apiKey");
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
