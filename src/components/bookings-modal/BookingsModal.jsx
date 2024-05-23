import React from "react";
import * as S from "./BookingsModal.styles";

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
