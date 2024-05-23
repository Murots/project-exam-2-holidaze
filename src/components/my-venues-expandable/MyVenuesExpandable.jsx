import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as S from "./MyVenuesExpandable.styles";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { handleUpdate, handleDelete, fetchBookingsForVenue } from "../../utils/my-venues-utils/myVenuesUtils";
import BookingsModal from "../../components/bookings-modal/BookingsModal";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().min(20, "Description must be at least 20 characters").max(1000, "Description cannot be more than 1000 characters").required("Description is required"),
  price: yup.number().min(0, "Price must be at least 0").max(10000, "Price cannot exceed 10000").required("Price is required"),
  maxGuests: yup.number().min(1, "Max guests must be at least 1").max(50, "Max guests cannot exceed 50").required("Max guests is required"),
  rating: yup.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  media: yup.array().of(
    yup.object().shape({
      url: yup.string().url("Must be a valid URL").required("Image URL is required"),
    })
  ),
  location: yup.object().shape({
    city: yup.string().required("City is required"),
  }),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
});

const MyVenuesExpandable = ({ venue, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { token, apiKey } = useAuth();
  const { fetchApi, isLoading, isError } = useApi();
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...venue,
      location: { city: venue.location.city, country: "Norway" },
    },
    resolver: yupResolver(validationSchema),
  });

  const toggleDetails = () => setIsOpen(!isOpen);
  const toggleEditMode = () => setEditMode(!editMode);

  const onSubmit = (data) => handleUpdate(data, venue.id, fetchApi, token, apiKey, onUpdate, setEditMode);
  const onDelete = () => handleDelete(venue.id, fetchApi, token, apiKey, onUpdate);

  const openModal = async () => {
    const bookingsData = await fetchBookingsForVenue(venue.id, fetchApi, token, apiKey);
    setBookings(bookingsData);
    setShowModal(true);
  };

  if (editMode) {
    return (
      <S.VenueDetailsContainer>
        <S.VenueDetailsHeader onClick={toggleDetails}>
          <span>{venue.name}</span>
          <S.ChevronIcon isOpen={isOpen} />
        </S.VenueDetailsHeader>
        <S.VenueDetailsContent className={isOpen ? "open" : ""}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="media[0].url" control={control} render={({ field }) => <S.Input {...field} placeholder="Image URL" />} />
            <S.ErrorMessage>{errors.media?.[0]?.url && <p>{errors.media[0].url.message}</p>}</S.ErrorMessage>

            <Controller name="description" control={control} render={({ field }) => <S.TextArea {...field} placeholder="Description" />} />
            <S.ErrorMessage>{errors.description && <p>{errors.description.message}</p>}</S.ErrorMessage>

            <Controller name="price" control={control} render={({ field }) => <S.Input type="number" {...field} placeholder="Price" />} />
            <S.ErrorMessage>{errors.price && <p>{errors.price.message}</p>}</S.ErrorMessage>

            <Controller name="maxGuests" control={control} render={({ field }) => <S.Input type="number" {...field} placeholder="Max Guests" />} />
            <S.ErrorMessage>{errors.maxGuests && <p>{errors.maxGuests.message}</p>}</S.ErrorMessage>

            <Controller name="rating" control={control} render={({ field }) => <S.Input type="number" {...field} placeholder="Rating" />} />
            <S.ErrorMessage>{errors.rating && <p>{errors.rating.message}</p>}</S.ErrorMessage>

            <Controller name="location.city" control={control} render={({ field }) => <S.Input {...field} placeholder="City" />} />
            <S.ErrorMessage>{errors.location?.city && <p>{errors.location.city.message}</p>}</S.ErrorMessage>

            <S.CheckboxLabel>
              <Controller name="meta.wifi" control={control} render={({ field }) => <input type="checkbox" {...field} checked={field.value} />} />
              Wifi
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <Controller name="meta.parking" control={control} render={({ field }) => <input type="checkbox" {...field} checked={field.value} />} />
              Parking
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <Controller name="meta.breakfast" control={control} render={({ field }) => <input type="checkbox" {...field} checked={field.value} />} />
              Breakfast
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <Controller name="meta.pets" control={control} render={({ field }) => <input type="checkbox" {...field} checked={field.value} />} />
              Pets
            </S.CheckboxLabel>

            <S.Button type="submit" disabled={isLoading}>
              Update
            </S.Button>
          </form>
          {isError && <S.FeedbackMessage error>Failed to update venue. Please try again later.</S.FeedbackMessage>}
        </S.VenueDetailsContent>
      </S.VenueDetailsContainer>
    );
  }

  return (
    <S.VenueDetailsContainer>
      <S.VenueDetailsHeader onClick={toggleDetails}>
        <span>{venue.name}</span>
        <S.ChevronIcon isOpen={isOpen} />
      </S.VenueDetailsHeader>
      <S.VenueDetailsContent className={isOpen ? "open" : ""}>
        <S.VenueImage src={venue.media[0]?.url} alt={venue.media[0]?.alt || "Venue image"} />
        <S.VenueInfoText>
          <strong>Description:</strong> {venue.description}
        </S.VenueInfoText>
        <S.VenueInfoText>
          <strong>Price:</strong> {venue.price} NOK
        </S.VenueInfoText>
        <S.VenueInfoText>
          <strong>Max Guests:</strong> {venue.maxGuests}
        </S.VenueInfoText>
        <S.VenueInfoText>
          <strong>Rating:</strong> {venue.rating}
        </S.VenueInfoText>
        <S.VenueInfoText>
          <strong>Location:</strong> {venue.location.city}, Norway
        </S.VenueInfoText>
        <S.VenueInfoText>
          <strong>Facilities:</strong> Wifi: {venue.meta.wifi ? "Yes" : "No"}, Parking: {venue.meta.parking ? "Yes" : "No"}, Breakfast: {venue.meta.breakfast ? "Yes" : "No"}, Pets:{" "}
          {venue.meta.pets ? "Yes" : "No"}
        </S.VenueInfoText>
        <S.ButtonsContainer>
          <S.LinkButton onClick={openModal}>View Bookings</S.LinkButton>
          <div>
            <S.Button onClick={toggleEditMode}>Edit</S.Button>
            <S.DelButton onClick={onDelete} disabled={isLoading}>
              Delete
            </S.DelButton>
          </div>
        </S.ButtonsContainer>
        {showModal && <BookingsModal bookings={bookings} onClose={() => setShowModal(false)} />}
      </S.VenueDetailsContent>
    </S.VenueDetailsContainer>
  );
};

export default MyVenuesExpandable;
