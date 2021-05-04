import React, {useEffect, useState} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import ProfileReviewContainer from './ProfileReviewContainer';

export default function ProfileReviews({userId}) {
    const [reviews, setReviews] = useState(null);
    const [reviewsRes] = useGetPayload(`/reviews/search/userId=${userId}`);

    useEffect(() => {
        reviewsRes().then(res => {
            setReviews(res.reviews);
        });
    }, []);

    console.log(reviews);

    return (
        reviews?.length > 0 ?
            reviews.map(review => (
                <ProfileReviewContainer {...review}/>
            ))
            : <p>Do Not Have Reviews</p>
    );
}