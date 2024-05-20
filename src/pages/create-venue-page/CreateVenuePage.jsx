import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as S from "./CreateVenuePage.styles";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().min(20, "Description must be at least 20 characters").max(1000, "Description cannot be more than 1000 characters").required("Description is required"),
    media: yup
      .array()
      .of(
        yup.object({
          url: yup.string().url("Must be a valid URL").required("Image URL is required"),
          alt: yup.string().default("Venue image"),
        })
      )
      .optional(),
    price: yup.number().min(0, "Price must be at least 0").max(10000, "Price cannot exceed 10000").required("Price is required"),
    maxGuests: yup.number().min(1, "Max guests must be at least 1").max(50, "Max guests cannot exceed 50").required("Max guests is required"),
    rating: yup.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5").optional(),
    meta: yup.object({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
    location: yup.object({
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
    }),
  })
  .required();

const CreateVenue = () => {
  const { fetchApi, isLoading } = useApi();
  const { token, apiKey } = useAuth();
  const [mediaPreview, setMediaPreview] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const url = "https://v2.api.noroff.dev/hoolidaze/venues";
      await fetchApi(url, "POST", data, token, apiKey);
      setFeedbackMessage("Venue created successfully!");
      setIsError(false);
    } catch (error) {
      console.error("Error creating venue:", error);
      setFeedbackMessage("Error creating venue. Please try again later.");
      setIsError(true);
    }
  };

  const handleMediaChange = (e) => {
    const value = e.target.value;
    setValue("media.0.url", value, { shouldValidate: true });
    setMediaPreview(value);
  };

  return (
    <S.Container>
      <S.Heading>Create a New Venue</S.Heading>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <S.Label>
            Name:
            <S.Input {...register("name")} />
            <S.ErrorMessage>{errors.name?.message}</S.ErrorMessage>
          </S.Label>
        </div>
        <div>
          <S.Label>
            Description:
            <S.Textarea {...register("description")} />
            <S.ErrorMessage>{errors.description?.message}</S.ErrorMessage>
          </S.Label>
        </div>
        <S.InlineGroup>
          <S.InlineLabel>
            Price:
            <S.Input type="number" {...register("price")} />
            <S.ErrorMessage>{errors.price?.message}</S.ErrorMessage>
          </S.InlineLabel>
          <S.InlineLabel>
            Max Guests:
            <S.Input type="number" step="1" {...register("maxGuests")} />
            <S.ErrorMessage>{errors.maxGuests?.message}</S.ErrorMessage>
          </S.InlineLabel>
          <S.InlineLabel>
            Rating:
            <S.Input type="number" step="1" {...register("rating")} />
            <S.ErrorMessage>{errors.rating?.message}</S.ErrorMessage>
          </S.InlineLabel>
        </S.InlineGroup>
        <S.InlineGroup>
          <S.InlineLabel>
            City:
            <S.Input {...register("location.city")} />
            <S.ErrorMessage>{errors.location?.city?.message}</S.ErrorMessage>
          </S.InlineLabel>
          <S.InlineLabel>
            Country:
            <S.Input {...register("location.country")} />
            <S.ErrorMessage>{errors.location?.country?.message}</S.ErrorMessage>
          </S.InlineLabel>
        </S.InlineGroup>
        <div>
          <S.Label>
            Image URL:
            <S.Input {...register("media.0.url")} onChange={handleMediaChange} />
            <S.ErrorMessage>{errors.media?.[0]?.url?.message}</S.ErrorMessage>
          </S.Label>
          {mediaPreview && <S.ImagePreview src={mediaPreview} alt="Media preview" />}
        </div>
        <S.CheckboxGroup>
          <S.Label>Facilities:</S.Label>
          <S.CheckboxLabel>
            <input type="checkbox" {...register("meta.wifi")} />
            Wifi
          </S.CheckboxLabel>
          <S.CheckboxLabel>
            <input type="checkbox" {...register("meta.parking")} />
            Parking
          </S.CheckboxLabel>
          <S.CheckboxLabel>
            <input type="checkbox" {...register("meta.breakfast")} />
            Breakfast
          </S.CheckboxLabel>
          <S.CheckboxLabel>
            <input type="checkbox" {...register("meta.pets")} />
            Pets
          </S.CheckboxLabel>
        </S.CheckboxGroup>
        {feedbackMessage && <S.FeedbackMessage error={isError}>{feedbackMessage}</S.FeedbackMessage>}
        <S.SubmitButton type="submit" disabled={isLoading}>
          Create Venue
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default CreateVenue;
