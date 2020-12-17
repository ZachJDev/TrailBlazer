import React, {useState, useEffect} from "react";

import useGetPayload from '../hooks/useGetPayload'

// Not in love with the '=== "true"' stuff in the actual display. I may play around with that later.

export default function TrailAccessibility({trailId }) {
    const [ratings] = useGetPayload(`/ratings/trail/${trailId}`)
    const [averages, setAverages] = useState({loaded: false})
useEffect(() => {
    if(ratings.status === 200){
        setAverages({
            difficultyMode : getMode(ratings.difficulty),
            parkingMode : getMode(ratings.parking),
            petFriendlyMode : getMode(ratings.petFriendly),
            goodForGroupsMode : getMode(ratings.goodForGroups),
            wheelchairAccMode : getMode(ratings.wheelchairAcc),
            loaded: true
        })
        console.log(averages)
    }
}, [ratings])
console.log(averages)
  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      className="Trail-card-accessibility"
    >
    {averages.loaded ?
        <React.Fragment>
      <p>Difficulty: {averages.difficultyMode.name}</p>
      <p> Parking: {averages.parkingMode.name}</p>
      <p>{averages.goodForGroupsMode.name === 'true' ? 'Good for Groups': 'Not good for Groups'}</p>
      <p>{averages.wheelchairAccMode.name === 'true' ? "Wheelchair friendly" : 'Not wheelchair Friendly'}</p>
      <p>{averages.petFriendlyMode.name  === 'true' ? 'Good for Pets': 'Not good for Pets'}</p>
      </React.Fragment>
      : null
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

    return Object.keys(freqs)
    // Building the objects for each key is a little dubious, as I will only return one.
      .map((el) => {
        return {
          name: el,
          freq: freqs[el],
        };
      })
      .sort((a, b) => b.freq - a.freq)[0] || 0;
  }
};
