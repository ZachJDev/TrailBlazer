import React from "react";

import "./TrailReviewForm.css";

import NewTrailReviewForm from "./NewTrailReviewForm";
import FormWrapper from "./FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import usePostBody from "../../hooks/usePostBody";

import { validateTrailReviewForm } from "../../functions/formValidation";

export default function NewTrailReview({ match, history }) {
  const { params } = match;

  const [errors, addError] = useSetAsArray();
  const [setReviewBody] = usePostBody(
    `/api/review/new?trailId=${params.trailId}`
  );

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
        <NewTrailReviewForm submitForm={handleSubmit} />
      </FormWrapper>
    </section>
  );
}
