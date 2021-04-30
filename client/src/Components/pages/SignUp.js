import React from 'react';
import usePostBody from '../../hooks/usePostBody';
import SignUpForm from '../Forms/SignUpForm';
import FormWrapper from '../Forms/FormWrapper';
import useSetAsArray from '../../hooks/useSetAsArray';

import {validateSignUpForm} from '../../functions/formValidation';

export default function SignUp({history}) {

    const [errors, addError] = useSetAsArray();
    const [setBodyAndPost] = usePostBody('/auth/signup');

    // unneeded async
    const handleSubmit = async function (obj) {
        if (validateSignUpForm(obj, addError)) {
            setBodyAndPost(obj).then(postResponse => {
                if (postResponse.status === 200) history.push('/Login');
                else if (postResponse.errorMessage) {
                    addError(postResponse.errorMessage);
                }
            });

        }
    };

    /* THE ACTUAL MARKUP */
    return (
        <div
            style={{
                maxWidth: '20vw',
                margin: 'auto',
            }}
        >
            <h1>Sign Up</h1>
            <FormWrapper errors={errors}>
                <SignUpForm handleSubmit={handleSubmit}/>
            </FormWrapper>
        </div>
    );
}
