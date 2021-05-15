import React, { useState } from "react";

import InfoContainer from "../InfoContainers/InfoContainer";
import MainInfoTrail from "../InfoContainers/MainInfoTrail";
import ButtonActionRow from "../InfoContainers/ButtonActionRow";
import Description from "../InfoContainers/Description";
import TrailReview from "../Reviews/TrailReview";
import TrailAccessibility from "../AccessibilityComponents/TrailAccessibility";
import { Helmet } from "react-helmet";
import { useMutation, useQuery, useQueryClient } from "react-query";
import getTrail from "../../API/Trails/getTrail";
import getReviewsForTrail from "../../API/Reviews/getReviewsForTrail";
import deleteTrail from "../../API/Trails/deleteTrail";

export default function Trail({ match, history }) {
  const queryClient = useQueryClient();
  const { trailId } = match.params;
  const [trailReviews, setTrailReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(true);
  const mutation = useMutation((trailId) => deleteTrail(trailId)());

  const { isLoading: trailIsLoading, data: trailInfo } = useQuery(
    [{ id: trailId }],
    getTrail(trailId)
  );
  const { isLoading: reviewsIsLoading } = useQuery(
    ["reviews"],
    getReviewsForTrail(trailId),
    {
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      staleTime: 0,
      onSuccess: (info) => {
        setTrailReviews(info.reviews);
        setHasReviewed(info.userHasReviewed);
      },
    }
  );

  const refreshReviews = async () => {
    await queryClient.refetchQueries(["reviews"]);
  };

  const handleDelete = async () => {
    const check = window.confirm(
      "Warning: Deleting this trail is a permanent action! Continue?"
    );
    if (check) {
      await mutation.mutate(trailId, {
        onSuccess: (info) => {
          console.log(info);
          history.push("/");
        },
      });
    }
  };

  const handleReviewRedirect = () => {
    history.push(`/trail/${trailId}/reviews/${hasReviewed ? "edit" : "new"}`);
  };

  const AdminEdit = () => {
    history.push(`/trail/${match.params.trailId}/edit`);
  };

  const alertComingSoon = () => alert("Functionality Coming Soon!");

  if (trailIsLoading || reviewsIsLoading) return <h1>Loading</h1>;
  if (trailInfo.status === 404) return <h1>Oops! we can't find that trail</h1>;
  const { length, name, description } = trailInfo;

  return (
    <React.Fragment>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div>
        {trailInfo.park ? (
          <InfoContainer>
            <MainInfoTrail
              name={name}
              length={length}
              parkId={trailInfo.park.parkId}
              parkName={trailInfo.park.name}
            >
              <TrailAccessibility trailId={trailId} />
              <ButtonActionRow
                handleReview={handleReviewRedirect}
                handleMap={alertComingSoon}
                handleEdit={AdminEdit}
                handleDelete={handleDelete}
                hasReviewed={hasReviewed}
              />
            </MainInfoTrail>
            <Description name={name} description={description} />
            <section>
              {!reviewsIsLoading && (
                <section className="reviews">
                  {trailReviews.map((review) => (
                    <React.Fragment key={review.reviewId}>
                      <TrailReview
                        {...review}
                        refreshReviews={refreshReviews}
                        handleEdit={handleReviewRedirect}
                      />
                    </React.Fragment>
                  ))}
                </section>
              )}
            </section>
          </InfoContainer>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </React.Fragment>
  );
}
