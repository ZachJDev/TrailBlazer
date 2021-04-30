import React, {useEffect, useState} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import TrailReview from '../Reviews/TrailReview';

export default function ReviewPage({match,  history}) {
    const [review, setReview] = useState({});
    const [getReview] = useGetPayload(`/reviews/${match.params.reviewId}`);

    useEffect(() => {
        getReview().then(reviewRes => {
            console.log(reviewRes);
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
        <TrailReview {...review} handleEdit={handleReviewRedirect} useLink={false}/>
    );
}