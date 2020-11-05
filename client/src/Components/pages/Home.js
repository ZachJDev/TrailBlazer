import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place : ''
        }
    }
    
 componentDidMount() {
     fetch('/store')
     .then(res => res.json())
     .then(data => {
         this.setState({place: data.place})
     })
 }
    render() {
        return (
            <h1>{this.state.place}</h1>
        )
    }
}


export default Home