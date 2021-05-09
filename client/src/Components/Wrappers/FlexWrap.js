import React from 'react';

export default function FlexWrapper({children, className, justifyContent = 'space-between', direction = 'row', alignItems}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: direction,
            justifyContent: justifyContent,
            alignItems: alignItems,
        }} className={className}>
            {children}
        </div>);
}