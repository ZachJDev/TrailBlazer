import React, {useEffect, useState} from "react";
import useGetPayload from '../../hooks/useGetPayload'
import {Link} from 'react-router-dom'

export default function Trail({match, history}) {
    const [trailReviews, setTrailReviews] = useState([])
    const [trailInfo] = useGetPayload(`/trail/${match.params.trailId}`)
    const [reviewPayload] = useGetPayload(`/reviews/trails/${match.params.trailId}`)
    //I'll need to handle any 404 errors here, I think.
    const {length, name, description, parkId} = trailInfo
    useEffect(() => {
      if(reviewPayload.reviews)  setTrailReviews(reviewPayload.reviews)
    }, [reviewPayload])
  return (
    <div>

    <div>
      <h1>{name}: {length} miles</h1>
      <p>{description}</p>
    <Link to={`/park/${parkId}`}>Go to {trailInfo.park ? trailInfo.park.name : ''}</Link>
    </div>
    <section className="reviews">
    {
      trailReviews.map((review, idx) => (
        <div key={idx}>
          <h2>{review.title}</h2>
          <h3>Review by: {review.user.username}</h3>
          <p>{review.text}</p>
        </div>
      ))
    }
    </section>
    </div>
  );
}
