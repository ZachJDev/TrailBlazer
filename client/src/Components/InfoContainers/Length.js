import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';

export default function Length({miles}) {
    const {user} = useContext(UserContext);
    return (
        <p>
            {user.lengthMeasurement === 'Kilometers'
                ? `${(miles * 1.609344).toFixed(2)} Km`
                : `${miles} miles`}
        </p>
    );
}
