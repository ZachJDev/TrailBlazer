import React, { useState, useContext, useEffect } from "react";

import "./TrailReview.css";

import NewTrailReviewForm from "../NewTrailReviewForm";
import FormWrapper from "../FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import usePutBody from "../../hooks/usePutBody";
import useGetPayload from "../../hooks/useGetPayload";

import { UserContext } from "../../contexts/UserContext";

import { validateTrailReviewForm } from "../../functions/formValidation";

export default function EditTrailReview({ match, history }) {
  const { params } = match;
  const { user } = useContext(UserContext);

  const [errors, addError] = useSetAsArray([]);
  const [setReviewBody] = usePutBody(`/reviews/edit?trailId=${params.trailId}`);
  const [currentReview, setCurrentReview] = useState({});
  const [currentReviewRes] = useGetPayload(
    `/reviews/user/${user.userId}?trailId=${params.trailId}`
  );

  useEffect(() => {
    if (user.isLoggedIn) {
      currentReviewRes().then((res) => {
        setCurrentReview(res);
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
      <h1>Add Review</h1>
      <FormWrapper errors={errors}>
        <NewTrailReviewForm submitForm={handleSubmit} defaultValues={currentReview} />
      </FormWrapper>
    </section>
  );
}
