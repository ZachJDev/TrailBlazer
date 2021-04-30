import React from 'react';

export default function FlexWrapper({children, className, justifyContent = 'space-between', direction = 'row'}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: direction,
            justifyContent: justifyContent,
        }} className={className}>
            {children}
        </div>);
}