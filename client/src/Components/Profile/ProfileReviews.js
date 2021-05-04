import React, {useEffect, useState} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import TrailReview from '../Reviews/TrailReview';

import './ProfileReviews.css'

export default function ProfileReviews({userId, username = ''}) {
    const [reviews, setReviews] = useState(null);
    const [reviewsRes] = useGetPayload(`/reviews/search/userId=${userId}`);

    useEffect(() => {
        reviewsRes().then(res => {
            setReviews(res.reviews);
        });
    }, []);

    return (
        <div className={'profile-reviews'}>
            {reviews?.length > 0 ?
                reviews.map(review => {
                    return (
                        <TrailReview {...review} reviewId={review.ReviewId} username={username} useComments={false}/>
                    );
                })
                : <p>Do Not Have Reviews</p>}
        </div>
    );
}