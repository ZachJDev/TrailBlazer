import React from 'react'
import {Link} from 'react-router-dom'

import TrailCard from './TrailCard'
import useGetPayload from '../hooks/useGetPayload'

export default function ParkTrails({trails, parkId, name}) {
  
    return (
        <div>
{trails ?
       trails.map((trail, idx) => (
         <TrailCard key={idx} {...trail}/>
       ))
       : null
     }
     <div>
       <Link to={`/trail/new?parkId=${parkId}&park=${name}`}>Add New Trail</Link>
     </div>
        </div>
    )
}
