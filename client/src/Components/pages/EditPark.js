import React, { useContext, useEffect, useState } from "react";
import "../Forms/TrailReviewForm.css";

import { validateNewParkForm } from "../../functions/formValidation";

import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import usePutBody from "../../hooks/usePutBody";
import useGetPayload from "../../hooks/useGetPayload";
import useBool from "../../hooks/useBool";

import { UserContext } from "../../contexts/UserContext";
import NewParkForm from "../Forms/NewParkForm";

import withHelmet from "../../HigherOrderComponents/withHelmet";

function EditPark({ match, history }) {
  const { params } = match;
  const { user } = useContext(UserContext);

  const [hasLoaded, flipHasLoaded] = useBool(false);
  const [errors, addError] = useSetAsArray();
  const [setParkFormBody] = usePutBody(`/park/${params.parkId}/edit`);
  const [currentPark, setCurrentPark] = useState({});
  const [currentParkRes] = useGetPayload(`/park/${params.parkId}`);

  let AwaitingInfoNotice = () => {
    if (hasLoaded && !user.isAdmin) {
      return "Forbidden Action Performed.";
    }
    if (!hasLoaded) {
      return "Loading Form...";
    }
  };

  useEffect(() => {
    currentParkRes().then((res) => {
      setCurrentPark(res);
      flipHasLoaded();
    });
  }, []);

  const handleSubmit = (formBody) => {
    if (validateNewParkForm(formBody, addError)) {
      setParkFormBody(formBody).then((res) => {
        if (res.success) {
          history.push(`/park/${params.parkId}`);
        } else if (res.status === 401) {
          alert("You are not authorized to perform that action.");
        } else {
          addError(res.errorMessage);
        }
      });
    }
  };

  return (
    <section className="add-review">
      {hasLoaded && user.isAdmin ? (
        <React.Fragment>
          <h1>Edit Park</h1>
          <FormWrapper errors={errors}>
            <NewParkForm
              handleSubmit={handleSubmit}
              defaultValues={currentPark}
              isEdit={true}
            />
          </FormWrapper>
        </React.Fragment>
      ) : (
        <h2>{AwaitingInfoNotice()} </h2>
      )}
    </section>
  );
}

export default withHelmet({ title: "Edit Park" })(EditPark);
