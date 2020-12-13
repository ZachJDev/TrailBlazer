import React from 'react'
import {Link} from 'react-router-dom'

export default function ParkTrails({trails, parkId, name}) {
    return (
        <div>
{trails ?
       trails.map((trail, idx) => (
         <div key={idx}>
           <Link to={`/trail/${trail.trailId}`}>{trail.name}</Link>
         </div>
       ))
       : null
     }
     <div>
       <Link to={`/trail/new?parkId=${parkId}&park=${name}`}>Add New Trail</Link>
     </div>
        </div>
    )
}
