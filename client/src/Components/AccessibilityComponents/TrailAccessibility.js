import React, { useReducer } from "react";
import {
  faMountain,
  faParking,
  faPaw,
  faUsers,
  faWheelchair,
} from "@fortawesome/free-solid-svg-icons";
import TrailAccessibilityIcon from "./TrailAccessibilityIcon";

import { useQuery } from "react-query";

import getRatings from "../../API/Ratings/getRatings";

// Not in love with the '=== "true"' stuff in the actual display. I may play around with that later.
const DEFAULT_STATE = { name: "NER", freq: 0, numRatings: 0 };
export default function TrailAccessibility({ trailId }) {
  const intialState = {
    difficultyMode: DEFAULT_STATE,
    parkingMode: DEFAULT_STATE,
    petFriendlyMode: DEFAULT_STATE,
    goodForGroupsMode: DEFAULT_STATE,
    wheelchairAccMode: DEFAULT_STATE,
  };
  const [state, setState] = useReducer(
    // I'm not sure if this is the best way to use useReducer, but I like it.
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    intialState
  );
  const { isLoading } = useQuery(["ratings", trailId], getRatings(trailId), {
    refetchOnWindowFocus: false,
    onSuccess: (ratings) => {
      if (ratings.success) {
        setState({
          difficultyMode: ratings.difficulty,
          parkingMode: ratings.parking,
          petFriendlyMode: ratings.petFriendly,
          goodForGroupsMode: ratings.goodForGroups,
          wheelchairAccMode: ratings.wheelchairAcc,
        });
      }
    },
  });

  if (isLoading) {
    return <h5>Loading...</h5>;
  }
  const {
    difficultyMode,
    parkingMode,
    petFriendlyMode,
    goodForGroupsMode,
    wheelchairAccMode,
  } = state;

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      className="Trail-card-accessibility"
    >
      <React.Fragment>
        <TrailAccessibilityIcon
          icon={faMountain}
          name="Difficulty"
          rating={difficultyMode.name}
          freq={difficultyMode.freq}
          numRatings={difficultyMode.numRatings}
        />
        <TrailAccessibilityIcon
          icon={faUsers}
          name="Groups"
          rating={`${
            goodForGroupsMode.name === "true" ? "" : "Not"
          } Good For Groups`}
          freq={goodForGroupsMode.freq}
          numRatings={goodForGroupsMode.numRatings}
        />
        <TrailAccessibilityIcon
          icon={faParking}
          name="Parking"
          rating={parkingMode.name}
          freq={parkingMode.freq}
          numRatings={parkingMode.numRatings}
        />
        <TrailAccessibilityIcon
          icon={faPaw}
          name="Pet Friendly"
          rating={`${
            petFriendlyMode.name === "true" ? "" : "Not"
          } Pet Friendly`}
          freq={petFriendlyMode.freq}
          numRatings={petFriendlyMode.numRatings}
        />
        <TrailAccessibilityIcon
          icon={faWheelchair}
          name="Wheelchair Accessible"
          rating={`${
            wheelchairAccMode.name === "true" ? "" : "Not"
          } Wheelchair Accessible`}
          freq={wheelchairAccMode.freq}
          numRatings={wheelchairAccMode.numRatings}
        />
      </React.Fragment>
    </div>
  );
}
