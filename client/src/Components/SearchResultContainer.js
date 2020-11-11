import React, { Component } from 'react'

export default class SearchResultContainer extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        let picUrl = this.props.pictureUrl || "https://source.unsplash.com/random/?hike"
        return (
            <div>
                <h2>{this.props.name}</h2>
                <img width={"250px"} src={picUrl}></img>
                <div><p>{this.props.city} {this.props.state}</p></div>
            </div>
        )
    }
}
