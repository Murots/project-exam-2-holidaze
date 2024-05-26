import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import * as S from "./MyAccountPage.styles";
import { handleDetailsUpdate, handleSelectionChange } from "../../utils/account-utils/accountUtils";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "../../hooks/useApi";

const MyAccount = () => {
  const { username, token, apiKey, avatarUrl, updateAvatar, bio, updateBio, venueManager: initialVenueManager } = useAuth();
  const { fetchApi } = useApi();
  const [venueManager, setVenueManager] = useState(initialVenueManager);
  const [newAvatarUrl, setNewAvatarUrl] = useState(avatarUrl);
  const [newBio, setNewBio] = useState(bio);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setVenueManager(initialVenueManager);
  }, [initialVenueManager]);

  const handleUpdateDetails = () => {
    handleDetailsUpdate(username, token, apiKey, fetchApi, newAvatarUrl, newBio, updateAvatar, updateBio, setFeedbackMessage, setError);
  };

  const handleChangeAvatarUrl = (e) => {
    setNewAvatarUrl(e.target.value);
    clearMessages();
  };

  const handleChangeBio = (e) => {
    setNewBio(e.target.value);
    clearMessages();
  };

  const clearMessages = () => {
    setFeedbackMessage("");
    setError("");
  };

  return (
    <div>
      <Helmet>
        <title>Holidaze | My Account</title>
        <meta name="description" content="This page handles all your profile information. Feel free to update your avatar and/or bio. You can also register/unregister as a venue manager." />
      </Helmet>
      <S.PageContainer>
        <S.Heading>My Account</S.Heading>
        <S.UserBanner>
          <S.Avatar src={newAvatarUrl} alt="User Avatar" />
          <S.UserInfo>
            <S.UserName>{username}</S.UserName>
            <S.UserBio>{newBio}</S.UserBio>
          </S.UserInfo>
        </S.UserBanner>
        <S.DetailsForm>
          <S.FormRow>
            <S.Label htmlFor="avatarUrl">Avatar URL:</S.Label>
            <S.Input id="avatarUrl" type="text" value={newAvatarUrl} onChange={handleChangeAvatarUrl} placeholder="New avatar URL" />
          </S.FormRow>
          <S.FormRow>
            <S.Label htmlFor="bio">Bio:</S.Label>
            <S.TextArea id="bio" value={newBio} onChange={handleChangeBio} placeholder="Update your bio" />
          </S.FormRow>
          <S.ButtonContainer>
            {feedbackMessage && <S.FeedbackMessage>{feedbackMessage}</S.FeedbackMessage>}
            {error && <S.FeedbackMessage error>{error}</S.FeedbackMessage>}
            <S.UpdateButton onClick={handleUpdateDetails}>Update Details</S.UpdateButton>
          </S.ButtonContainer>
        </S.DetailsForm>
        <S.OptionContainer>
          <S.Description>
            Do you want to register as a venue manager?<S.RedSpan> (Change requires new Sign In)</S.RedSpan>
          </S.Description>
          <div>
            <S.RadioInput
              id="yes"
              type="radio"
              value="true"
              checked={venueManager === true}
              onChange={() => handleSelectionChange(username, token, apiKey, fetchApi, true, setVenueManager, clearMessages)}
            />
            <S.RadioLabel htmlFor="yes" className={venueManager === true ? "active" : ""}>
              Yes
            </S.RadioLabel>
            <S.RadioInput
              id="no"
              type="radio"
              value="false"
              checked={venueManager === false}
              onChange={() => handleSelectionChange(username, token, apiKey, fetchApi, false, setVenueManager, clearMessages)}
            />
            <S.RadioLabel htmlFor="no" className={venueManager === false ? "active" : ""}>
              No
            </S.RadioLabel>
          </div>
        </S.OptionContainer>
      </S.PageContainer>
    </div>
  );
};

export default MyAccount;
