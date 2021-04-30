import React, {useState} from 'react';
import NewTrailForm from '../Forms/NewTrailForm';
import FormWrapper from '../Forms/FormWrapper';

import usePostBody from '../../hooks/usePostBody';
import useSetAsArray from '../../hooks/useSetAsArray';

import {validateNewTrailForm} from '../../functions/formValidation';

export default function NewTrail({location, history}) {
    //Deconstruct url query
    const keyPairs = location.search.split('&').map((q) => q.split('='));
    // Hardcoding for now... may refactor later to be more flexible
    const params = {
        parkId: keyPairs[0][1],
        parkName: keyPairs[1][1],
    };

    // Lots of side effects here and pretty cluttered -- def in need
    // of some refactoring TLC

    const [errors, addError] = useSetAsArray();
    const [formErrors, setFormErrors] = useState([]);
    const [setBodyAndPost] = usePostBody('/trail/new?_method=POST');

    const handleFormSubmit = (form) => {
        if (validateNewTrailForm(form, addError)) {
            setBodyAndPost(form).then((payload) => {
                if (payload.status !== 200) setFormErrors(payload.errors);
                else {
                    history.push(`/trail/${payload.trailId}`);
                }
            });
        }
    };

    return (
        <div>
            <h1>New Trail for {params.parkName}</h1>
            <FormWrapper errors={errors}>
                <NewTrailForm
                    handleSubmit={handleFormSubmit}
                    missing={formErrors}
                    park={params.parkId}
                />
            </FormWrapper>
        </div>
    );
}
