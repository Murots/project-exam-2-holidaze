import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import * as S from "./MyBookingsPage.styles";
import MyBookingsExpandable from "../../components/my-bookings-expandable/MyBookingsExpandable";

const MyBookings = () => {
  const { fetchApi } = useApi();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const username = sessionStorage.getItem("username");
        const token = sessionStorage.getItem("token");
        const apiKey = sessionStorage.getItem("apiKey");
        const result = await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`, "GET", null, token, apiKey);
        if (result.data && result.data.bookings) {
          const sortedBookings = result.data.bookings.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
          setBookings(sortedBookings);
        } else {
          setBookings([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [fetchApi]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <S.PageContainer>
      <S.Heading>My Bookings</S.Heading>
      {bookings.map((booking) => (
        <MyBookingsExpandable key={booking.id} booking={booking} />
      ))}
    </S.PageContainer>
  );
};

export default MyBookings;
