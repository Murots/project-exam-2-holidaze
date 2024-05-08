// import React, { useEffect, useState } from "react";
// import * as S from "./VenuesPage.styles";
// import VenuesCard from "../../components/venues-card/VenuesCard";
// import useApi from "../../hooks/useApi";

// const shuffle = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// const VenuesPage = () => {
//   const { get } = useApi();
//   const [venues, setVenues] = useState([]);

//   useEffect(() => {
//     get("https://v2.api.noroff.dev/holidaze/venues")
//       .then((response) => {
//         if (response.data && Array.isArray(response.data)) {
//           const validVenues = response.data.filter((venue) => {
//             const hasValidMedia = venue.media && venue.media.length > 0 && !venue.media[0].url.includes("string");
//             const hasValidPrice = venue.price != null && !venue.price.toString().includes("string");
//             const hasValidName = venue.name && !venue.name.includes("string");
//             const hasValidLocation = venue.location && venue.location.city && !venue.location.city.includes("string");

//             return hasValidMedia && hasValidPrice && hasValidName && hasValidLocation;
//           });

//           const uniqueImageUrls = new Set();
//           const uniqueVenues = validVenues.filter((venue) => {
//             const imageUrl = venue.media[0].url;
//             if (!uniqueImageUrls.has(imageUrl) && !imageUrl.includes("string")) {
//               uniqueImageUrls.add(imageUrl);
//               return true;
//             }
//             return false;
//           });

//           const shuffledVenues = shuffle(uniqueVenues);
//           setVenues(shuffledVenues);
//         } else {
//           console.error("Received data is not an array:", response);
//         }
//       })
//       .catch((error) => {
//         console.error("Fetching venues failed:", error);
//       });
//   }, [get]);

//   return (
//     <S.PageContainer>
//       <S.Heading>Venues</S.Heading>
//       <S.VenuesGrid>
//         {venues.map((venue) => (
//           <VenuesCard key={venue.id} venue={venue} rating={venue.rating} />
//         ))}
//       </S.VenuesGrid>
//     </S.PageContainer>
//   );
// };

// export default VenuesPage;

import React, { useEffect, useState } from "react";
import * as S from "./VenuesPage.styles";
import VenuesCard from "../../components/venues-card/VenuesCard";
import useApi from "../../hooks/useApi";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const VenuesPage = () => {
  const { fetchApi } = useApi();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetchApi("https://v2.api.noroff.dev/holidaze/venues", "GET")
      .then((result) => {
        if (result.data && Array.isArray(result.data)) {
          const validVenues = result.data.filter((venue) => {
            const hasValidMedia = venue.media && venue.media.length > 0 && !venue.media[0].url.includes("string");
            const hasValidPrice = venue.price != null && !venue.price.toString().includes("string");
            const hasValidName = venue.name && !venue.name.includes("string");
            const hasValidLocation = venue.location && venue.location.city && !venue.location.city.includes("string");

            return hasValidMedia && hasValidPrice && hasValidName && hasValidLocation;
          });

          const uniqueImageUrls = new Set();
          const uniqueVenues = validVenues.filter((venue) => {
            const imageUrl = venue.media[0].url;
            if (!uniqueImageUrls.has(imageUrl) && !imageUrl.includes("string")) {
              uniqueImageUrls.add(imageUrl);
              return true;
            }
            return false;
          });

          const shuffledVenues = shuffle(uniqueVenues);
          setVenues(shuffledVenues);
        } else {
          console.error("Received data is not an array:", result);
        }
      })
      .catch((error) => {
        console.error("Fetching venues failed:", error);
      });
  }, [fetchApi]);

  return (
    <S.PageContainer>
      <S.Heading>Venues</S.Heading>
      <S.VenuesGrid>
        {venues.map((venue) => (
          <VenuesCard key={venue.id} venue={venue} rating={venue.rating} />
        ))}
      </S.VenuesGrid>
    </S.PageContainer>
  );
};

export default VenuesPage;
