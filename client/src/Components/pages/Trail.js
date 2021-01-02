import React, { useEffect, useState, useContext } from "react";
import useGetPayload from "../../hooks/useGetPayload";
import useBool from "../../hooks/useBool";
import { UserContext } from "../../contexts/UserContext";
import usePostBody from "../../hooks/usePostBody";
import NewTrailReviewForm from "../NewTrailReviewForm";
import InfoContainer from "../InfoContainer";
import MainInfoTrail from "../MainInfoTrail";
import ButtonActionRow from "../InfoContainers/ButtonActionRow";
import Description from "../InfoContainers/Description";

export default function Trail({ match, history }) {

  const { trailId } = match.params;
  const { user } = useContext(UserContext);
  const [trailReviews, setTrailReviews] = useState([]);
  const [trailInfo, setTrailInfo] = useState({})
  const [isSubmitted, flipSubmitted] = useBool(false)
  const [hasReviewed, setHasReviewed] = useState(true)
  const [getTrailInfo] = useGetPayload(`/trail/${trailId}`);
  const [getReviewPayload] = useGetPayload(
    `/reviews/trails/${trailId}`
  );
  

  useEffect(()=> {
   getTrailInfo().then(trail => {
     setTrailInfo(trail)
   })
   getReviewPayload().then(reviewsRes => {
     setHasReviewed(reviewsRes.userHasReviewed)
     setTrailReviews(reviewsRes.reviews)
   })
  }, [])

  const handleReviewRedirect = () => {
    history.push(`/trail/${trailId}/reviews/new`)
  }

  const alertComingSoon = () => alert("Functionality Coming Soon!");
  const { length, name, description } = trailInfo;
  //I'll need to handle any 404 errors here, I think.
  return (
    <div>
      {trailInfo.park ? (
        <InfoContainer>
        <MainInfoTrail name={name} length={length} parkId={trailInfo.park.parkId} parkName={trailInfo.park.name}> 
        <ButtonActionRow
          handleReview={handleReviewRedirect}
          handleMap={alertComingSoon}
          handleShare={alertComingSoon}
        />
        </MainInfoTrail>
        <Description name={name} description={description}/>
        <section>
          <section className="reviews">
            {trailReviews.map((review, idx) => (
              <div key={idx}>
                <h2>{review.title}</h2>
                <h3>Review by: {review.username}</h3>
                <p>{review.text}</p>
              </div>
            ))}
          </section>
        </section>
        </InfoContainer>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
