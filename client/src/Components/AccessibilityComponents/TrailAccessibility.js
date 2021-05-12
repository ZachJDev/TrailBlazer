import React, { useEffect, useState } from "react";
import {
  faMountain,
  faParking,
  faPaw,
  faUsers,
  faWheelchair,
} from "@fortawesome/free-solid-svg-icons";
import TrailAccessibilityIcon from "./TrailAccessibilityIcon";

import useBool from "../../hooks/useBool";

import useGetPayload from "../../hooks/useGetPayload";

// Not in love with the '=== "true"' stuff in the actual display. I may play around with that later.
const DEFAULT_STATE = { name: "NER", freq: 0, numRatings: 0 };
export default function TrailAccessibility({ trailId }) {
  const [getRatings] = useGetPayload(`/api/ratings/trail/${trailId}`);
  const [ratingsLoaded, updateLoaded] = useBool(false);
  const [difficultyMode, setDifficultyMode] = useState(DEFAULT_STATE);
  const [parkingMode, setParkingMode] = useState(DEFAULT_STATE);
  const [petFriendlyMode, setPetFriendlyMode] = useState(DEFAULT_STATE);
  const [goodForGroupsMode, setGoodForGroupsMode] = useState(DEFAULT_STATE);
  const [wheelchairAccMode, setWheelchairAccMode] = useState(DEFAULT_STATE);
  useEffect(() => {
    getRatings().then((ratings) => {
      if (ratings.status === 200) {
        setDifficultyMode(ratings.difficulty);
        setParkingMode(ratings.parking);
        setPetFriendlyMode(ratings.petFriendly);
        setGoodForGroupsMode(ratings.goodForGroups);
        setWheelchairAccMode(ratings.wheelchairAcc);
      }
      updateLoaded();
    });
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      className="Trail-card-accessibility"
    >
      {ratingsLoaded ? (
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
      ) : (
        "Ratings Loading..."
      )}
    </div>
  );
}
