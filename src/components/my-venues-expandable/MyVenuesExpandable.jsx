import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as S from "./MyVenuesExpandable.styles";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { handleUpdate, handleDelete } from "../../utils/my-venues-utils/myVenuesUtils";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive().integer(),
  maxGuests: yup.number().required("Max Guests is required").positive().integer(),
  rating: yup.number().required("Rating is required").min(1).max(5),
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
            {errors.media?.[0]?.url && <p>{errors.media[0].url.message}</p>}

            <Controller name="description" control={control} render={({ field }) => <S.TextArea {...field} placeholder="Description" />} />
            {errors.description && <p>{errors.description.message}</p>}

            <Controller name="price" control={control} render={({ field }) => <S.Input type="number" {...field} placeholder="Price" />} />
            {errors.price && <p>{errors.price.message}</p>}

            <Controller name="maxGuests" control={control} render={({ field }) => <S.Input type="number" {...field} placeholder="Max Guests" />} />
            {errors.maxGuests && <p>{errors.maxGuests.message}</p>}

            <Controller name="rating" control={control} render={({ field }) => <S.Input type="number" {...field} placeholder="Rating" />} />
            {errors.rating && <p>{errors.rating.message}</p>}

            <Controller name="location.city" control={control} render={({ field }) => <S.Input {...field} placeholder="City" />} />
            {errors.location?.city && <p>{errors.location.city.message}</p>}

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
        <S.Button onClick={toggleEditMode}>Edit</S.Button>
        <S.DelButton onClick={onDelete} disabled={isLoading}>
          Delete
        </S.DelButton>
        {isError && <S.FeedbackMessage error>Failed to update venue. Please try again later.</S.FeedbackMessage>}
      </S.VenueDetailsContent>
    </S.VenueDetailsContainer>
  );
};

export default MyVenuesExpandable;