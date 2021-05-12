import React, { useContext, useEffect, useState } from "react";

import "../Forms/TrailReviewForm.css";

import NewTrailReviewForm from "../Forms/NewTrailReviewForm";
import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import usePutBody from "../../hooks/usePutBody";
import useGetPayload from "../../hooks/useGetPayload";
import useBool from "../../hooks/useBool";

import { UserContext } from "../../contexts/UserContext";

import { validateTrailReviewForm } from "../../functions/formValidation";
import withHelmet from "../../HigherOrderComponents/withHelmet";

function EditTrailReview({ match, history }) {
  const { params } = match;
  const { user } = useContext(UserContext);

  const [hasLoaded, flipHasLoaded] = useBool(false);
  const [errors, addError] = useSetAsArray();
  const [setReviewBody] = usePutBody(
    `/api/reviews/edit?trailId=${params.trailId}`
  );
  const [currentReview, setCurrentReview] = useState({});
  const [currentReviewRes] = useGetPayload(
    `/api/reviews/user/${user.userId}?trailId=${params.trailId}`
  );

  useEffect(() => {
    if (user.isLoggedIn) {
      currentReviewRes().then((res) => {
        setCurrentReview(res);
        flipHasLoaded();
      });
    }
  }, [user]);

  const handleSubmit = (formBody) => {
    if (validateTrailReviewForm(formBody, addError)) {
      setReviewBody(formBody).then((res) => {
        if (res.success) {
          history.push(`/trail/${params.trailId}`);
        } else {
          addError(res.errorMessage);
        }
      });
    }
  };

  return (
    <section className="add-review">
      {hasLoaded ? (
        <React.Fragment>
          <h1>Edit Review</h1>
          <FormWrapper errors={errors}>
            <NewTrailReviewForm
              submitForm={handleSubmit}
              defaultValues={currentReview}
              isEdit={true}
            />
          </FormWrapper>
        </React.Fragment>
      ) : (
        <h2>Loading Form...</h2>
      )}
    </section>
  );
}

export default withHelmet({ title: "Edit Review" })(EditTrailReview);
