import React, { useState, useEffect } from "react";
import useBool from "../hooks/useBool";

import useGetPayload from "../hooks/useGetPayload";
import Difficulty from "./TrailAccessibility/Difficulty";
import GoodForGroups from "./TrailAccessibility/GoodForGroups";
import Parking from "./TrailAccessibility/Parking";
import PetFriendly from "./TrailAccessibility/PetFriendly";
import WheelCharAccessible from "./TrailAccessibility/WheelCharAccessible";

// Not in love with the '=== "true"' stuff in the actual display. I may play around with that later.
// Also thinking that doing all this work on the client side is a waste of time and effort. I should try to move 
// These calculations to the server.

export default function TrailAccessibility({ trailId }) {
  const MINIMUM_RATINGS = 1;
  const [ratings] = useGetPayload(`/ratings/trail/${trailId}`);
  const [ratingsLoaded, updateLoaded] = useBool(false);
  const [difficultyMode, setDifficultyMode] = useState({});
  const [parkingMode, setParkingMode] = useState({});
  const [petFriendlyMode, setPetFriendlyMode] = useState({});
  const [goodForGroupsMode, setGoodForGroupsMode] = useState({});
  const [wheelchairAccMode, setWheelchairAccMode] = useState({});
  useEffect(() => {
    if (ratings.status === 200) {
      const {
        difficulty,
        parking,
        petFriendly,
        goodForGroups,
        wheelchairAcc,
      } = ratings;
      setDifficultyMode({
        ...getMode(difficulty),
        length: difficulty.length,
      });
      setParkingMode({
        ...getMode(parking),
        length: parking.length,
      });
      setPetFriendlyMode({
        ...getMode(petFriendly),
        length: petFriendly.length,
      });
      setGoodForGroupsMode({
        ...getMode(goodForGroups),
        length: goodForGroups.length,
      });
      setWheelchairAccMode({
        ...getMode(wheelchairAcc),
        length: wheelchairAcc.length,
      });
      updateLoaded();
    }
    if(ratings.status === 204) {
        updateLoaded();
    }
  }, [ratings]);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      className="Trail-card-accessibility"
    >
    {
        ratingsLoaded ?
        <React.Fragment>
            <Difficulty {...difficultyMode} MINIMUM_RATINGS={MINIMUM_RATINGS}/>
            <WheelCharAccessible  {...wheelchairAccMode} MINIMUM_RATINGS={MINIMUM_RATINGS}/>
            <Parking  {...parkingMode} MINIMUM_RATINGS={MINIMUM_RATINGS} />
            <GoodForGroups  {...goodForGroupsMode} MINIMUM_RATINGS={MINIMUM_RATINGS}/>
            <PetFriendly  {...petFriendlyMode} MINIMUM_RATINGS={MINIMUM_RATINGS}/>
        </React.Fragment>
        : "Ratings Loading..."
    }
    </div>
  );
}

const getMode = (arr) => {
  if (arr && arr.length > 0) {
    const freqs = {};

    arr.forEach((el) => {
      freqs[el.toString()] = ++freqs[el.toString()] || 1;
    });

    // Building the objects for each key is a little dubious, as I will only return one.
    return (
      Object.keys(freqs)
        .map((el) => {
          return {
            name: el,
            freq: freqs[el],
          };
        })
        .sort((a, b) => b.freq - a.freq)[0] || 0
    );
  }
};
