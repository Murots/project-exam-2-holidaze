import React from "react";
import * as S from "./BookingsModal.styles";

/**
 * Represents a modal component that displays a list of bookings for a specific venue.
 * The modal shows essential booking details such as the date range, number of guests, and customer name.
 * If no bookings are available, it displays a message indicating that no bookings were found.
 * This modal is part of the my-venues system where venue managers can view details of all bookings for their venues.
 *
 * @module BookingsModal
 * @param {Object} props
 * @param {string} props.venueName - The name of the venue for which bookings are displayed.
 * @param {Array} props.bookings - An array of bookings to be displayed.
 * @param {Function} props.onClose - Function to close the modal.
 * @returns {React.Component} A modal component that provides detailed views of bookings for a given venue.
 * @example
 * return (
 *   <BookingsModal venueName="Sunset Resort" bookings={bookingsList} onClose={handleClose} />
 * )
 */
const BookingsModal = ({ venueName, bookings, onClose }) => {
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.Heading>{venueName} Bookings</S.Heading>
        {bookings.length > 0 ? (
          <S.Table>
            <thead>
              <tr>
                <S.TableHeader>Date From</S.TableHeader>
                <S.TableHeader>Date To</S.TableHeader>
                <S.TableHeader>Guests</S.TableHeader>
                <S.TableHeader>Customer Name</S.TableHeader>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <S.TableRow key={booking.id}>
                  <S.TableCell>{booking.dateFrom.substring(0, 10)}</S.TableCell>
                  <S.TableCell>{booking.dateTo.substring(0, 10)}</S.TableCell>
                  <S.TableCell>{booking.guests}</S.TableCell>
                  <S.TableCell>{booking.customer.name}</S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        ) : (
          <S.NoDataMessage>No bookings found for this venue.</S.NoDataMessage>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default BookingsModal;
