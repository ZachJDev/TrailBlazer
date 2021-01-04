import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { UserContext } from "../contexts/UserContext";
import useInputState from "../hooks/useInputState";

import FormInputText from "./FormInputs/FormInputText";
import FormInputTextArea from "./FormInputs/FormInputTextArea";
import FormInputSelect from "./FormInputs/FormInputSelect";

export default function NewTrailReviewForm({ isSubmitted, submitForm }) {
  const [reviewText, setReviewText, clearText] = useInputState("");
  const [reviewTitle, setReviewTitle, clearTitle] = useInputState("");

  const [parking, setParking] = useInputState("On Trailhead");
  const [petFriendly, setPets] = useInputState("Yes");
  const [goodForGroups, setGroups] = useInputState("Yes");
  const [difficulty, setDifficulty] = useInputState("Easy");
  const [wheelchairAcc, setWCAcc] = useInputState("Yes");

  const { user } = useContext(UserContext);
  const username = user.username;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm({
      reviewTitle,
      reviewText,
      parking,
      username,
      petFriendly,
      goodForGroups,
      difficulty,
      wheelchairAcc,
    });
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
          handleChange={setReviewTitle}
          label="Title..."
        />
        <InputGroup className="select-group">
          <FormInputSelect
            handleChange={setParking}
            value={parking}
            options={["On Trailhead", "Close", "Far", "No Marked Parking"]}
            label="Where is the Parking?"
          />
          <FormInputSelect
            handleChange={setPets}
            value={petFriendly}
            options={["Yes", "No"]}
            label="Is This Trail Pet Friendly?"
          />
          <FormInputSelect
            handleChange={setGroups}
            value={goodForGroups}
            options={["Yes", "No"]}
            label="Is This Trail Good for Group Hikes?"
          />
          <FormInputSelect
            handleChange={setDifficulty}
            value={difficulty}
            options={["Easy", "Medium", "Difficult", "Strenuous"]}
            label="How Difficult was This Trail to Hike?"
          />
          <FormInputSelect
            handleChange={setWCAcc}
            value={wheelchairAcc}
            options={["Yes", "No"]}
            label="Is This Trail Wheelchair Accessible?"
          />
        </InputGroup>
        <FormInputTextArea
          name="reviewText"
          value={reviewText}
          handleChange={setReviewText}
          label="add your review..."
        />
        <Button type="submit"> Submit</Button>
      </Form>
    </section>
  );
}