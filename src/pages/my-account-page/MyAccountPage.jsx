// import React, { useEffect, useState } from "react";
// import useApi from "../../hooks/useApi";
// import * as S from "./MyAccountPage.styles";

// const MyAccount = () => {
//   const username = sessionStorage.getItem("username");
//   const token = sessionStorage.getItem("token");
//   const apiKey = sessionStorage.getItem("apiKey");
//   const { fetchApi, isLoading, isError } = useApi();

//   const [venueManager, setVenueManager] = useState(false);
//   const [userData, setUserData] = useState({ name: "", email: "", bio: "", avatarUrl: "", avatarAlt: "" });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, "GET", null, token, apiKey);
//         setUserData({
//           name: result.data.name,
//           email: result.data.email,
//           bio: result.data.bio || "No bio available.",
//           avatarUrl: result.data.avatar.url,
//           avatarAlt: result.data.avatar.alt,
//         });
//         setVenueManager(result.data.venueManager);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     fetchData();
//   }, [fetchApi, username, token, apiKey]);

//   const handleSelectionChange = async (event) => {
//     const newValue = event.target.value === "true";
//     setVenueManager(newValue);
//     try {
//       await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, "PUT", { venueManager: newValue }, token, apiKey);
//     } catch (error) {
//       console.error("Error updating venue manager status", error);
//     }
//   };

//   if (isLoading) {
//     return <S.Loader />;
//   }

//   if (isError) {
//     return (
//       <S.PageContainer>
//         <S.FeedbackMessage error>Network error. Please try again later.</S.FeedbackMessage>
//       </S.PageContainer>
//     );
//   }

//   return (
//     <S.PageContainer>
//       <S.Heading>My Account</S.Heading>
//       <S.UserBanner>
//         <S.Avatar src={userData.avatarUrl} alt={userData.avatarAlt || "User Avatar"} />
//         <S.UserInfo>
//           <S.UserName>{userData.name}</S.UserName>
//           <S.UserBio>{userData.bio}</S.UserBio>
//         </S.UserInfo>
//       </S.UserBanner>
//       <S.OptionContainer>
//         <S.Description>Do you want to be a venue manager?</S.Description>
//         <div>
//           <S.RadioInput id="yes" type="radio" value="true" checked={venueManager === true} onChange={handleSelectionChange} />
//           <S.RadioLabel htmlFor="yes" className={venueManager === true ? "active" : ""}>
//             Yes
//           </S.RadioLabel>
//           <S.RadioInput id="no" type="radio" value="false" checked={venueManager === false} onChange={handleSelectionChange} />
//           <S.RadioLabel htmlFor="no" className={venueManager === false ? "active" : ""}>
//             No
//           </S.RadioLabel>
//         </div>
//       </S.OptionContainer>
//     </S.PageContainer>
//   );
// };

// export default MyAccount;
import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import * as S from "./MyAccountPage.styles";
import { handleDetailsUpdate, handleSelectionChange } from "../../utils/account-utils/accountUtils";

const MyAccount = () => {
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");
  const apiKey = sessionStorage.getItem("apiKey");
  const { fetchApi, isLoading, isError } = useApi();

  const [venueManager, setVenueManager] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
  });
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, "GET", null, token, apiKey);
        setUserData({
          name: result.data.name,
          email: result.data.email,
          bio: result.data.bio || "No bio available.",
          avatarUrl: result.data.avatar.url,
          avatarAlt: result.data.avatar.alt,
        });
        setVenueManager(result.data.venueManager);
        setNewBio(result.data.bio || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, [fetchApi, username, token, apiKey]);

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
    <S.PageContainer>
      <S.Heading>My Account</S.Heading>
      <S.UserBanner>
        <S.Avatar src={userData.avatarUrl} alt={userData.avatarAlt || "User Avatar"} />
        <S.UserInfo>
          <S.UserName>{userData.name}</S.UserName>
          <S.UserBio>{userData.bio}</S.UserBio>
        </S.UserInfo>
      </S.UserBanner>
      <S.DetailsForm>
        <S.FormRow>
          <S.Label htmlFor="avatarUrl">Avatar URL:</S.Label>
          <S.Input id="avatarUrl" type="text" value={newAvatarUrl} placeholder="New avatar URL" onChange={(e) => setNewAvatarUrl(e.target.value)} />
        </S.FormRow>
        <S.FormRow>
          <S.Label htmlFor="bio">Bio:</S.Label>
          <S.TextArea id="bio" value={newBio} placeholder="Update your bio" onChange={(e) => setNewBio(e.target.value)} />
        </S.FormRow>
        <S.ButtonContainer>
          <S.UpdateButton onClick={() => handleDetailsUpdate(username, token, apiKey, fetchApi, newAvatarUrl, userData, newBio, setUserData)}>Update Details</S.UpdateButton>
        </S.ButtonContainer>
      </S.DetailsForm>
      <S.OptionContainer>
        <S.Description>Do you want to register as a venue manager?</S.Description>
        <div>
          <S.RadioInput id="yes" type="radio" value="true" checked={venueManager === true} onChange={(e) => handleSelectionChange(username, token, apiKey, fetchApi, true, setVenueManager)} />
          <S.RadioLabel htmlFor="yes" className={venueManager === true ? "active" : ""}>
            Yes
          </S.RadioLabel>
          <S.RadioInput id="no" type="radio" value="false" checked={venueManager === false} onChange={(e) => handleSelectionChange(username, token, apiKey, fetchApi, false, setVenueManager)} />
          <S.RadioLabel htmlFor="no" className={venueManager === false ? "active" : ""}>
            No
          </S.RadioLabel>
        </div>
      </S.OptionContainer>
    </S.PageContainer>
  );
};

export default MyAccount;
