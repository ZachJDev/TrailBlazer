import React from 'react';
import withHelmet from '../../HigherOrderComponents/withHelmet';

function NotFound() {
    return (
        <div>
            <p>Not Found</p>
        </div>
    );
}

export default withHelmet({title: '404 Not Found'})(NotFound)
