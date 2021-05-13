import React, { useContext, useReducer } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { UserContext } from "../../contexts/UserContext";

import FormInputText from "../FormInputs/FormInputText";
import FormInputTextArea from "../FormInputs/FormInputTextArea";
import FormInputSelect from "../FormInputs/FormInputSelect";

export default function NewTrailReviewForm({ submitForm, defaultValues = {} }) {
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    {
      reviewTitle: defaultValues.title || "",
      reviewText: defaultValues.text || "",
      parking: defaultValues.parking || "On Trailhead",
      petFriendly: defaultValues.petFriendly ? "Yes" : "No",
      goodForGroups: defaultValues.goodForGroups ? "Yes" : "No",
      wheelchairAcc: defaultValues.wheelchairAcc ? "Yes" : "No",
      difficulty: defaultValues.difficulty || "Easy",
    }
  );

  const {
    reviewTitle,
    reviewText,
    parking,
    petFriendly,
    goodForGroups,
    wheelchairAcc,
    difficulty,
  } = formValues;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const { user } = useContext(UserContext);
  const username = user.username;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm({ username, ...formValues });
  };

  return (
    <section className="review-form">
      <Form
        onSubmit={handleSubmit}
        style={{
          margin: "3rem 20%",
        }}
      >
        <FormInputText
          name="reviewTitle"
          value={reviewTitle}
          handleChange={handleFormChange}
          label="Title..."
        />
        <InputGroup className="select-group">
          <FormInputSelect
            name={"parking"}
            handleChange={handleFormChange}
            value={parking}
            options={["On Trailhead", "Close", "Far", "No Marked Parking"]}
            label="Where is the Parking?"
          />
          <FormInputSelect
            handleChange={handleFormChange}
            name={"petFriendly"}
            value={petFriendly}
            options={["Yes", "No"]}
            label="Is This Trail Pet Friendly?"
          />
          <FormInputSelect
            handleChange={handleFormChange}
            value={goodForGroups}
            name={"goodForGroups"}
            options={["Yes", "No"]}
            label="Is This Trail Good for Group Hikes?"
          />
          <FormInputSelect
            handleChange={handleFormChange}
            name={"difficulty"}
            value={difficulty}
            options={["Easy", "Medium", "Difficult", "Strenuous"]}
            label="How Difficult was This Trail to Hike?"
          />
          <FormInputSelect
            handleChange={handleFormChange}
            name={"wheelchairAcc"}
            value={wheelchairAcc}
            options={["Yes", "No"]}
            label="Is This Trail Wheelchair Accessible?"
          />
        </InputGroup>
        <FormInputTextArea
          name="reviewText"
          value={reviewText}
          handleChange={handleFormChange}
          label="add your review..."
        />
        <Button type="submit"> Submit</Button>
      </Form>
    </section>
  );
}
