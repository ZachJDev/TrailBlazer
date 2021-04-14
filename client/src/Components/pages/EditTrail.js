import React, {useContext, useEffect, useState} from 'react';
import NewTrailForm from '../Forms/NewTrailForm';
import FormWrapper from '../Forms/FormWrapper';

import useSetAsArray from '../../hooks/useSetAsArray';

import {validateNewTrailForm} from '../../functions/formValidation';
import usePutBody from '../../hooks/usePutBody';
import useGetPayload from '../../hooks/useGetPayload';
import useBool from '../../hooks/useBool';
import {UserContext} from '../../contexts/UserContext';

export default function NewTrail({location, history, match}) {

    const { user } = useContext(UserContext);
    // Lots of side effects here and pretty cluttered -- def in need
    // of some refactoring TLC
    const [hasLoaded, flipHasLoaded] = useBool(false);
    const [errors, addError, removeError] = useSetAsArray( []);
    const [formErrors, setFormErrors] = useState([]);
    const [currentTrail, setCurrentTrail] = useState({});
    const [setBodyAndPost] = usePutBody(`/trail/${currentTrail.trailId}/edit`);
    const [currentTrailRes] = useGetPayload(
        `/trail/${match.params.trailId}`,
    );

    const mounted = () => {
        currentTrailRes().then(res => {
            setCurrentTrail(res);
            flipHasLoaded();
        });
    }

    let AwaitingInfoNotice = () => {
        if(hasLoaded && !user.isAdmin) {
            return "Forbidden Action Performed."
        }
        if(!hasLoaded) {
            return "Loading Form..."
        }
    }

    useEffect(mounted, []);

    const handleFormSubmit = (form) => {
        if (validateNewTrailForm(form, addError)) {
            setBodyAndPost(form).then((payload) => {
                if(payload.status === 401) {
                    alert("You are not authorized to do that action.")
                }
                if (payload.status !== 200) setFormErrors(payload.errors);
                else {
                    history.push(`/trail/${match.params.trailId}`);
                }
            });
        }
    };

    return (
        hasLoaded && user.isAdmin ? (
            <div>
                <h1>Edit Trail for {currentTrail.park.name} </h1>
                <FormWrapper errors={errors}>
                    <NewTrailForm
                        handleSubmit={handleFormSubmit}
                        missing={formErrors}
                        park={currentTrail.park.parkId}
                        isEdit={true}
                        defaultValues={currentTrail}
                    />
                </FormWrapper>

            </div>
        ) : <h2>{AwaitingInfoNotice()}</h2>
    );
}
