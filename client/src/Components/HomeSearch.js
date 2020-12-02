import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import useInputState from '../hooks/useInputState'
export default function HomeSearch({history}) {
const [searchState, setSearchState] = useInputState('')
const handleSearch = (e) => {
    e.preventDefault()
    history.push(`/search?term=${searchState}`)
}
    return (
        <div>
            <h1 style={{
            paddingTop: '7rem',
            color: 'white'
        }}>Trail Blazer</h1>
        <h3 style={{
            color: 'white'
        }}>Hike Your Way</h3>
         <Form.Control value={searchState} onChange={setSearchState}  style={{width: '70%', margin: 'auto', marginTop: '10rem'}} type="text" placeholder="Find your Trail" /> 
         <Button style={{
             marginTop: '1rem'
         }} onClick={handleSearch}>Search!</Button>
      </div>
        
    )
}
