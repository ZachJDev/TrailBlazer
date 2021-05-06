import React, {useContext, useEffect, useState} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import {UserContext} from '../../contexts/UserContext';
import InfoContainer from '../InfoContainers/InfoContainer';
import MainInfoTrail from '../InfoContainers/MainInfoTrail';
import ButtonActionRow from '../InfoContainers/ButtonActionRow';
import Description from '../InfoContainers/Description';
import TrailReview from '../Reviews/TrailReview';
import TrailAccessibility from '../AccessibilityComponents/TrailAccessibility';
import {Helmet} from 'react-helmet';

export default function Trail({match, history}) {

    const {trailId} = match.params;
    const {user} = useContext(UserContext);
    const [trailReviews, setTrailReviews] = useState([]);
    const [title, setTitle] = useState('TrailBlazer | Hike Your Way');
    const [trailInfo, setTrailInfo] = useState({});
    const [hasReviewed, setHasReviewed] = useState(true);
    const [getTrailInfo] = useGetPayload(`/trail/${trailId}`);
    const [getReviewPayload] = useGetPayload(
        `/reviews/trails/${trailId}`,
    );

    useEffect(() => {
        getTrailInfo().then(trail => {
            setTrailInfo(trail);
            setTitle(trail.name)
        });
        getReviewPayload().then(reviewsRes => {
            setHasReviewed(reviewsRes.userHasReviewed);
            setTrailReviews(reviewsRes.reviews);
        });
    }, []);

    const handleReviewRedirect = () => {
        history.push(`/trail/${trailId}/reviews/${hasReviewed ? 'edit' : 'new'}`);
    };
    const AdminEdit = () => {
        history.push(`/trail/${match.params.trailId}/edit`);
    };

    const alertComingSoon = () => alert('Functionality Coming Soon!');
    const {length, name, description} = trailInfo;
    //I'll need to handle any 404 errors here, I think.
    return (
        <React.Fragment>
    <Helmet>
        <title>{title}</title>
    </Helmet>
        <div>
            {trailInfo.park ? (
                <InfoContainer>
                    <MainInfoTrail name={name} length={length} parkId={trailInfo.park.parkId}
                                   parkName={trailInfo.park.name}>
                        <TrailAccessibility trailId={trailId}/>
                        <ButtonActionRow
                            handleReview={handleReviewRedirect}
                            handleMap={alertComingSoon}
                            handleShare={alertComingSoon}
                            handleEdit={AdminEdit}
                            hasReviewed={hasReviewed}
                            user={user}
                        />
                    </MainInfoTrail>
                    <Description name={name} description={description}/>
                    <section>
                        <section className="reviews">
                            {trailReviews.map((review, idx) => (
                                <React.Fragment key={idx}>
                                    <TrailReview {...review} handleEdit={handleReviewRedirect}/>
                                </React.Fragment>
                            ))}
                        </section>
                    </section>
                </InfoContainer>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
        </React.Fragment>
    );
}
