import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

function MyComponent({lat, lng, show = false}) {
    const center = {
        lat,
        lng,
    };
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBCJA0RJNGUSvq8Rmwm7FxF_yu1POmKH1I"
        >
            <GoogleMap
                mapContainerClassName={`map ${show ? 'show-map' : null}`}
                center={center}
                zoom={10}
            >
                <Marker position={{lat, lng}}/>
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    );
}

export default React.memo(MyComponent);