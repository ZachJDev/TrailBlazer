import React, {useEffect, useState} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import TrailReview from '../Reviews/TrailReview';

export default function ReviewPage({match,  history}) {
    const [review, setReview] = useState(null);
    const [getReview] = useGetPayload(`/reviews/${match.params.reviewId}`);

    useEffect(() => {
        getReview().then(reviewRes => {
            if (reviewRes.success) {
                setReview(reviewRes.review);
            } else {
                console.log(reviewRes.error);
            }
        });
    }, []);

    const handleReviewRedirect = () => {
        history.push(`/trail/${review.trailId}/reviews/edit`);
    };

    return (
    review ?
    <TrailReview {...review} reviewId={review.reviewId} handleEdit={handleReviewRedirect} showPark={true} showTrail={true} trail={review.trail} useLink={false} park={review.trail.park}/>
        : null
    );
}