import React from 'react'
 // I Don't think this is quite a higher-order component...
export default function withHeader(component, title, className) {
    return (
        <div className={className}>
        <h2 className={"header"}>{title}</h2>
            {component}
        </div>
    )
}