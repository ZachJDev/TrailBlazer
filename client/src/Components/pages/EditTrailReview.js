import React, { useContext, useState } from "react";

import "../Forms/TrailReviewForm.css";

import NewTrailReviewForm from "../Forms/NewTrailReviewForm";
import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import { UserContext } from "../../contexts/UserContext";

import { validateTrailReviewForm } from "../../functions/formValidation";
import withHelmet from "../../HigherOrderComponents/withHelmet";
import { useMutation, useQuery } from "react-query";
import { editReview, getReviewByUserTrail } from "../../API/API";

function EditTrailReview({ match, history }) {
  const { params } = match;
  const { trailId } = params;
  const { user } = useContext(UserContext);
  const { userId } = user;

  const [errors, addError] = useSetAsArray();
  const [currentReview, setCurrentReview] = useState({});

  const { isLoading } = useQuery(
    ["trailReview", user.userId, trailId],
    getReviewByUserTrail({ userId, trailId }),
    {
      onSuccess: (res) => {
        setCurrentReview(res);
      },
    }
  );
  const submit = useMutation(["editTrailReview"], (obj) => editReview(obj)(), {
    onSuccess: (res) => {
      if (res.success) {
        history.push(`/trail/${params.trailId}`);
      } else {
        addError(res.errorMessage);
      }
    },
  });

  if (!user.isLoggedIn) {
    return <h1>Forbidden Action</h1>;
  }

  const handleSubmit = (formBody) => {
    if (validateTrailReviewForm(formBody, addError)) {
      submit.mutate({ body: formBody, trailId });
    } else {
      console.log("sajhdk");
    }
  };

  return (
    <section className="add-review">
      {!isLoading ? (
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
