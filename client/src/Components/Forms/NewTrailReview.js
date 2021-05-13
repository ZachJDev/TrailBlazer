import React from "react";

import "./TrailReviewForm.css";

import NewTrailReviewForm from "./NewTrailReviewForm";
import FormWrapper from "./FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import { validateTrailReviewForm } from "../../functions/formValidation";
import { useMutation } from "react-query";
import { postNewReview } from "../../API/API";

export default function NewTrailReview({ match, history }) {
  const { params } = match;
  const [errors, addError] = useSetAsArray();
  const submit = useMutation((options) => postNewReview(options)());

  const handleSubmit = (formBody) => {
    if (validateTrailReviewForm(formBody, addError)) {
      submit.mutate(
        { body: formBody, trailId: params.trailId },
        {
          onSuccess: (res) => {
            if (res.success) {
              history.push(`/trail/${params.trailId}`);
            } else {
              addError(res.errorMessage);
            }
          },
        }
      );
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
