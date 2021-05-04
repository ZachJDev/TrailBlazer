import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {faEdit, faMountain, faParking, faPaw, faUsers, faWheelchair} from '@fortawesome/free-solid-svg-icons';
import TrailAccessibilityIcon from '../AccessibilityComponents/TrailAccessibilityIcon';
import './TrailReview.css';
import ReviewComments from '../ReviewComments/ReviewComments';
import withHeader from '../../HigherOrderComponents/withHeader';
import {ReviewProvider} from '../../contexts/ReviewContext';

let ratingIcons = {
    difficulty: faMountain,
    goodForGroups: faUsers,
    parking: faParking,
    petFriendly: faPaw,
    wheelchairAcc: faWheelchair,
};

export default function TrailReview({
                                        text,
                                        title,
                                        username,
                                        isEditable,
                                        ratings = {},
                                        handleEdit,
                                        reviewId,
                                        useLink = true,
                                        useComments = true
                                    }) {
console.log(reviewId)
    return (
        <ReviewProvider id={reviewId}>
            <div className="review">
                <div className="review-header">
                    {
                        useLink ?
                            <Link to={`/review/${reviewId}`}>
                                <h2 className="review-title">{title} </h2>
                            </Link>
                            :
                            <h2 className="review-title">{title} </h2>
                    }
                    <h3 className="review-user">
                        Review by: {username}{' '}
                        {isEditable && (
                            <span className="review_edit-icon">
              <FontAwesomeIcon icon={faEdit} onClick={handleEdit}/>
            </span>
                        )}
                    </h3>
                </div>
                <div className="review-ratings">
                    {Object.keys(ratings).map((rating) => {
                        if (ratings[rating] !== null) {
                            return <TrailAccessibilityIcon key={rating} icon={ratingIcons[rating]} name={rating}
                                                           rating={ratings[rating]}/>;
                        } else return null
                    })}
                </div>
                <p className="review-text">{text}</p>
                {useComments ? withHeader(<ReviewComments reviewId={reviewId}/>, 'Comments:', 'comments') : null}
            </div>
        </ReviewProvider>
    );
}
